import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);

// Google Auth Provider setup with Workspace scopes
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/forms.body');
provider.addScope('https://www.googleapis.com/auth/forms.responses.readonly');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://mail.google.com/');
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/calendar');
provider.addScope('https://www.googleapis.com/auth/meetings.space.created');
provider.addScope('https://www.googleapis.com/auth/classroom.courses');
provider.addScope('https://www.googleapis.com/auth/classroom.announcements');
provider.addScope('https://www.googleapis.com/auth/classroom.rosters');

// In-memory token caching (MANDATORY: do not use localStorage for credentials)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// 1. Initialize Auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Clear cached token if not signing in explicitly
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// 2. Google sign in with popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve Google Workspace access token from Firebase login.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Workspace login failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// 3. Google sign out
export const googleSignOut = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// 4. Retrieve access token
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

// 5. Firestore secure error wrapper
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Hardened Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 6. Firestore Booking Form Submissions
export interface BookingLead {
  id?: string;
  name: string;
  email: string;
  company: string;
  objective: string;
  notes?: string;
  createdAt?: any;
}

export const submitBookingToFirestore = async (lead: BookingLead): Promise<string> => {
  const collectionName = 'bookings';
  // Generate random safe ID matching alphanumeric rules
  const bookingId = 'bk_' + Math.random().toString(36).substring(2, 15);
  try {
    const docRef = doc(db, collectionName, bookingId);
    const cleanPayload = {
      name: lead.name,
      email: lead.email,
      company: lead.company,
      objective: lead.objective,
      ...(lead.notes ? { notes: lead.notes } : {}),
      createdAt: serverTimestamp(),
    };
    await setDoc(docRef, cleanPayload);
    return bookingId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${collectionName}/${bookingId}`);
    throw error;
  }
};

export const fetchBookingsFromFirestore = async (): Promise<BookingLead[]> => {
  const collectionName = 'bookings';
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const list: BookingLead[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push({
        id: docSnap.id,
        ...docSnap.data()
      } as BookingLead);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionName);
    throw error;
  }
};

export const deleteBookingFromFirestore = async (id: string): Promise<void> => {
  const collectionName = 'bookings';
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    throw error;
  }
};


// 7. Google Workspace Integration API Services

// (a) Google Forms APIs
export interface GoogleFormInfo {
  formId: string;
  info: {
    title: string;
    documentTitle?: string;
    description?: string;
  };
  responderUri: string;
}

export const createGoogleForm = async (title: string, description: string): Promise<GoogleFormInfo> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to create Google Forms.');

  const res = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: title,
        documentTitle: title
      }
    })
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Google Forms API Error: ${errorDetails}`);
  }

  const form: GoogleFormInfo = await res.json();

  // Now, let's add questions to the Form! We add fields like Name, Email, Company, Objective
  const formId = form.formId;
  const updateRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        {
          createItem: {
            item: {
              title: "What is your full name?",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 0 }
          }
        },
        {
          createItem: {
            item: {
              title: "What is your business email address?",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 1 }
          }
        },
        {
          createItem: {
            item: {
              title: "What is your company/brand name?",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 2 }
          }
        },
        {
          createItem: {
            item: {
              title: "What is your primary business growth objective?",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 3 }
          }
        }
      ]
    })
  });

  if (!updateRes.ok) {
    console.error('Failed to pre-populate Google Form fields, but form container was created.');
  }

  return form;
};


// (b) Google Sheets APIs
export interface GoogleSpreadsheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  properties: {
    title: string;
  };
}

export const createGoogleSheet = async (title: string): Promise<GoogleSpreadsheetInfo> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to create Google Sheets.');

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: { title: title }
    })
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Google Sheets API Error: ${errorDetails}`);
  }

  const sheet: GoogleSpreadsheetInfo = await res.json();

  // Add the header row!
  await appendRowToGoogleSheet(sheet.spreadsheetId, 'Sheet1', [
    ['Submission Time', 'Prospect Name', 'Email', 'Company', 'Objective', 'Notes', 'Firestore Sync ID']
  ]);

  return sheet;
};

export const appendRowToGoogleSheet = async (
  spreadsheetId: string, 
  range: string, 
  rows: any[][]
): Promise<any> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to write to Google Sheets.');

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, 
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: rows
      })
    }
  );

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Google Sheets Write Error: ${errorDetails}`);
  }

  return res.json();
};


// (c) Google Drive APIs
export interface GoogleDriveFileInfo {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
}

export const listWorkspaceFilesFromDrive = async (): Promise<GoogleDriveFileInfo[]> => {
  const token = await getAccessToken();
  if (!token) return [];

  // Fetch only spreadsheets and forms related to ET Digital
  const q = encodeURIComponent("mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.form' or name contains 'ET Digital'");
  const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,mimeType,webViewLink)&pageSize=15`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.files || [];
};

export const uploadBriefToGoogleDrive = async (
  name: string, 
  content: string
): Promise<GoogleDriveFileInfo> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to write to Google Drive.');

  const metadata = {
    name: name,
    mimeType: 'text/plain'
  };

  const boundary = 'foo_bar_baz_boundary';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const body = 
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain\r\n\r\n' +
    content +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: body
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Google Drive Upload Error: ${errorDetails}`);
  }

  return res.json();
};


// (d) Gmail APIs
export const sendGmailMessage = async (to: string, subject: string, bodyText: string): Promise<any> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to send email via Gmail.');

  // Construct standard MIME email
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines = [
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    bodyText
  ];
  const email = emailLines.join('\r\n');
  const base64SafeEmail = btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: base64SafeEmail
    })
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Gmail API Send Error: ${errorDetails}`);
  }

  return res.json();
};

// ============================================================================
// Google Calendar, Google Meet, and Google Classroom Integrations
// ============================================================================

// Calendar interfaces
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink?: string;
  hangoutLink?: string;
}

// Meet interfaces
export interface GoogleMeetSpace {
  name: string; // "spaces/abc-defg-hij"
  meetingUri: string; // "https://meet.google.com/abc-defg-hij"
  meetingCode: string; // "abc-defg-hij"
}

// Classroom interfaces
export interface GoogleClassroomCourse {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  alternateLink?: string;
}

// 1. Google Calendar: List Events
export const listGoogleCalendarEvents = async (): Promise<GoogleCalendarEvent[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to list calendar events.');

  const timeMin = new Date().toISOString();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=15&orderBy=startTime&singleEvents=true&timeMin=${encodeURIComponent(timeMin)}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Calendar Fetch Error: ${errText}`);
  }

  const data = await res.json();
  return data.items || [];
};

// 2. Google Calendar & Meet: Create Event with Optional Google Meet Space
export const createGoogleCalendarEvent = async (
  summary: string,
  description: string,
  startTime: string,
  endTime: string,
  addMeetLink: boolean = false
): Promise<GoogleCalendarEvent> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to create calendar events.');

  const body: any = {
    summary,
    description,
    start: {
      dateTime: startTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
    },
    end: {
      dateTime: endTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
    }
  };

  if (addMeetLink) {
    body.conferenceData = {
      createRequest: {
        requestId: `et-digital-meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    };
  }

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Calendar Create Error: ${errText}`);
  }

  return res.json();
};

// 3. Google Meet API: Create Standalone Space Direct
export const createGoogleMeetSpaceDirect = async (): Promise<GoogleMeetSpace> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to create direct Google Meet spaces.');

  const res = await fetch('https://meet.googleapis.com/v1/spaces', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Meet API Space Error: ${errText}`);
  }

  return res.json();
};

// 4. Google Classroom: List Courses
export const listGoogleClassroomCourses = async (): Promise<GoogleClassroomCourse[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to list Google Classroom courses.');

  const res = await fetch('https://classroom.googleapis.com/v1/courses?pageSize=20', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Classroom Course Fetch Error: ${errText}`);
  }

  const data = await res.json();
  return data.courses || [];
};

// 5. Google Classroom: Create Course (Teacher Role)
export const createGoogleClassroomCourse = async (
  name: string,
  section: string,
  descriptionHeading: string
): Promise<GoogleClassroomCourse> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to create a Google Classroom course.');

  const res = await fetch('https://classroom.googleapis.com/v1/courses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      section,
      descriptionHeading,
      ownerId: 'me',
      courseState: 'ACTIVE'
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Classroom Course Create Error: ${errText}`);
  }

  return res.json();
};

// 6. Google Classroom: Create Announcement
export const createGoogleClassroomAnnouncement = async (
  courseId: string,
  text: string
): Promise<any> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Authorization required to post an announcement.');

  const res = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/announcements`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      state: 'PUBLISHED'
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Classroom Announcement Error: ${errText}`);
  }

  return res.json();
};
