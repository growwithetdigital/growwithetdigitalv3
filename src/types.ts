export interface GrowthModule {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  metrics: { label: string; value: string; trend?: string }[];
  visualType: 'editor' | 'flow' | 'chart' | 'analytics' | 'terminal';
  mockData: any;
}

export interface SystemFlowStep {
  id: string;
  label: string;
  description: string;
  category: 'input' | 'core' | 'output' | 'outcome';
  status: 'idle' | 'processing' | 'completed';
}

export interface StrategyProfile {
  companyName: string;
  industry: string;
  targetAudience: string;
  primaryChannels: string[];
  currentVolume: string; // "occasional" | "regular" | "frequent"
  additionalNotes?: string;
}

export interface CaseStudy {
  clientName: string;
  industry: string;
  duration: string;
  objectives: string[];
  systemImplementation: string[];
  growthOutcomes: { label: string; value: string; desc: string }[];
  performanceHistory: { month: string; before: number; after: number }[];
}
