'use server';
/**
 * @fileOverview A tool for fetching incident data from Firestore.
 */

import {ai} from '@/ai/genkit';
import {getIncidents} from '@/services/incidents';
import {z} from 'zod';

export const getIncidentsTool = ai.defineTool(
  {
    name: 'getIncidentsTool',
    description: 'Get all incident reports from the database.',
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        location: z.string(),
        date: z.string(),
        status: z.string(),
        actionTaken: z.string(),
      })
    ),
  },
  async () => {
    return getIncidents();
  }
);
