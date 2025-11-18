import { z } from 'zod';

/**
 * Profile Validation Schemas
 * Used for editing user profiles
 */

// URL validation helper
const urlSchema = z.string()
  .url('Must be a valid URL')
  .optional()
  .or(z.literal(''));

// Twitter handle validation (optional @ prefix)
const twitterHandleSchema = z.string()
  .regex(/^@?[A-Za-z0-9_]{1,15}$/, 'Invalid Twitter handle')
  .transform(val => val.startsWith('@') ? val.slice(1) : val)
  .optional()
  .or(z.literal(''));

// Profile update schema
export const profileSchema = z.object({
  displayName: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-]+$/, 'Display name can only contain letters, numbers, spaces, and hyphens'),

  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .or(z.literal('')),

  location: z.string()
    .max(100, 'Location must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  websiteUrl: urlSchema,

  twitterHandle: twitterHandleSchema,

  bggUsername: z.string()
    .max(50, 'BoardGameGeek username must be less than 50 characters')
    .optional()
    .or(z.literal('')),

  // Notification preferences
  notificationPreferences: z.object({
    sessionScheduled: z.boolean().default(true),
    sessionReminder: z.boolean().default(true),
    feedbackReceived: z.boolean().default(true),
    badgeUnlocked: z.boolean().default(true),
    queueUpdate: z.boolean().default(false),
    weeklyDigest: z.boolean().default(true),
  }).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Avatar upload validation
export const avatarSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 2 * 1024 * 1024, 'Avatar must be less than 2MB')
    .refine(
      file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Avatar must be a JPG, PNG, or WebP image'
    ),
});

export type AvatarData = z.infer<typeof avatarSchema>;
