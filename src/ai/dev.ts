import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-feedback.ts';
import '@/ai/flows/find-thematic-conflicts.ts';
import '@/ai/flows/suggest-improvements.ts';