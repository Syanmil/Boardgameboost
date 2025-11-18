import { z } from 'zod';

/**
 * Game Project Validation Schemas
 * Used for creating and editing game projects
 */

// Stage enum
export const stageEnum = z.enum([
  'concept',
  'prototype',
  'playtesting',
  'refining',
  'pitching',
  'published'
]);

// Visibility enum
export const visibilityEnum = z.enum(['public', 'private', 'unlisted']);

// Base project schema (for creation)
export const projectSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-:!?]+$/, 'Title can only contain letters, numbers, spaces, and basic punctuation'),

  description: z.string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must be less than 2000 characters'),

  tagline: z.string()
    .max(150, 'Tagline must be less than 150 characters')
    .optional(),

  stage: stageEnum.default('concept'),

  playerCount: z.object({
    min: z.number()
      .int()
      .min(1, 'Minimum players must be at least 1')
      .max(20, 'Minimum players must be 20 or less'),
    max: z.number()
      .int()
      .min(1, 'Maximum players must be at least 1')
      .max(20, 'Maximum players must be 20 or less'),
  }).refine((data) => data.min <= data.max, {
    message: 'Minimum players must be less than or equal to maximum players',
    path: ['min'],
  }),

  playTime: z.number()
    .int()
    .min(5, 'Play time must be at least 5 minutes')
    .max(600, 'Play time must be less than 10 hours (600 minutes)'),

  complexity: z.number()
    .int()
    .min(1, 'Complexity must be between 1 and 5')
    .max(5, 'Complexity must be between 1 and 5'),

  mechanics: z.array(z.string())
    .min(1, 'Select at least one game mechanic')
    .max(10, 'Select up to 10 mechanics'),

  themes: z.array(z.string())
    .max(5, 'Select up to 5 themes')
    .optional()
    .default([]),

  visibility: visibilityEnum.default('public'),
});

// Type inference
export type ProjectFormData = z.infer<typeof projectSchema>;

// Update project schema (allows partial updates)
export const updateProjectSchema = projectSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>;

// Step 1 of multi-step form (Basic Info)
export const projectBasicInfoSchema = projectSchema.pick({
  title: true,
  tagline: true,
  description: true,
  stage: true,
});

export type ProjectBasicInfoData = z.infer<typeof projectBasicInfoSchema>;

// Step 2 of multi-step form (Game Details)
export const projectDetailsSchema = projectSchema.pick({
  playerCount: true,
  playTime: true,
  complexity: true,
  mechanics: true,
  themes: true,
});

export type ProjectDetailsData = z.infer<typeof projectDetailsSchema>;

// Submit to queue validation
export const submitToQueueSchema = z.object({
  projectId: z.string().uuid(),
  isReady: z.boolean().refine(val => val === true, {
    message: 'You must confirm your game is ready for playtesting',
  }),
});

export type SubmitToQueueData = z.infer<typeof submitToQueueSchema>;

// Stage transition validation
export const stageTransitionSchema = z.object({
  projectId: z.string().uuid(),
  newStage: stageEnum,
  confirmationChecklist: z.array(z.boolean())
    .min(1)
    .refine(checks => checks.every(c => c === true), {
      message: 'Complete all checklist items before transitioning',
    }),
});

export type StageTransitionData = z.infer<typeof stageTransitionSchema>;
