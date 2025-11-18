import { z } from 'zod';

/**
 * Game Iteration Validation Schemas
 * Used for creating and tracking game iterations
 */

// Version number validation (semantic versioning)
const versionSchema = z.string()
  .regex(
    /^\d+\.\d+(\.\d+)?([a-z])?$/,
    'Version must follow format: 1.0, 1.0a, or 1.0.1'
  );

// Iteration creation schema
export const iterationSchema = z.object({
  gameProjectId: z.string().uuid(),

  version: versionSchema,

  changesDescription: z.string()
    .min(50, 'Please describe your changes in at least 50 characters')
    .max(2000, 'Changes description must be less than 2000 characters'),

  inspiringFeedbackIds: z.array(z.string().uuid())
    .optional()
    .default([]),

  hasNewMaterials: z.boolean().default(false),
});

export type IterationFormData = z.infer<typeof iterationSchema>;

// Version comparison schema
export const versionComparisonSchema = z.object({
  gameProjectId: z.string().uuid(),
  version1: z.string(),
  version2: z.string(),
});

export type VersionComparisonData = z.infer<typeof versionComparisonSchema>;

// Suggested next version helper
export function suggestNextVersion(currentVersion: string): string {
  const match = currentVersion.match(/^(\d+)\.(\d+)(?:\.(\d+))?([a-z])?$/);

  if (!match) return '1.0';

  const [, major, minor, patch, letter] = match;

  // If has letter suffix, remove it
  if (letter) {
    return `${major}.${minor}${patch ? `.${patch}` : ''}`;
  }

  // If has patch, increment it
  if (patch) {
    return `${major}.${minor}.${parseInt(patch) + 1}`;
  }

  // Otherwise increment minor
  return `${major}.${parseInt(minor) + 1}`;
}
