import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { GoogleGenAI } from '@google/genai';

function growthApiPlugin(): Plugin {
  return {
    name: 'growth-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/generate-growth-package' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const businessName = parsed.businessName || 'Modern Enterprise';
              const websiteUrl = parsed.websiteUrl || 'https://growwithetdigital.com';
              const industry = parsed.industry || 'B2B & Digital Services';

              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  fallback: true,
                  message: 'API key not set, using default strategic package.'
                }));
                return;
              }

              const ai = new GoogleGenAI({ apiKey });
              const prompt = `
                You are ET Digital's senior growth marketing strategist. Write a comprehensive, tactical 1,000-word SEO-optimized blog post for ${businessName} in the ${industry} niche (Website: ${websiteUrl}).
                
                Respond ONLY in valid JSON matching this schema:
                {
                  "title": "Compelling Title",
                  "target_keyword": "Primary Target Keyword",
                  "word_count": 1050,
                  "markdown_content": "# Heading\\n\\nFull 1,000-word article with actionable subsections and advice...",
                  "meta_description": "155 character SEO meta description",
                  "social_captions": {
                    "linkedin": "Thought leadership post with bullet points and hashtags",
                    "twitter_x": "Punchy thread hook / tweet",
                    "facebook": "Engaging community-focused summary",
                    "instagram_threads": "Short, carousel-friendly slide script"
                  }
                }
              `;

              const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: 'application/json' },
              });

              const generated = JSON.parse(response.text || '{}');
              const payload = {
                title: generated.title || `The 2026 Customer Acquisition Engine: How ${businessName} Wins Market Share`,
                target_keyword: generated.target_keyword || `${businessName} customer acquisition`,
                word_count: generated.word_count || 1050,
                markdown_content: generated.markdown_content || '',
                meta_description: generated.meta_description || '',
                social_captions: generated.social_captions || {
                  linkedin: `How ${businessName} builds compound pipeline in 2026.`,
                  twitter_x: `Tactical growth architecture for ${businessName}.`,
                  facebook: `Discover the 2026 growth blueprint for ${businessName}.`,
                  instagram_threads: `Scaling pipeline through systematic architecture.`
                },
                graphic: {
                  public_download_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
                  prompt_used: `Branded modern growth architecture graphic for ${businessName}`,
                  dimensions: { width: 1920, height: 1080 }
                }
              };

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, package: payload }));
            } catch (err: any) {
              console.error('API middleware error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), growthApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
