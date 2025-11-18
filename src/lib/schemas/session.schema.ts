import { z } from 'zod';

/**
 * Session Management Validation Schemas
 * Used for session creation and registration
 */

// Session registration schema
export const sessionRegistrationSchema = z.object({
  sessionId: z.string().uuid(),
  addToCalendar: z.boolean().default(true),
  sendReminder: z.boolean().default(true),
});

export type SessionRegistrationData = z.infer<typeof sessionRegistrationSchema>;

// Session cancellation schema
export const sessionCancellationSchema = z.object({
  sessionId: z.string().uuid(),
  reason: z.string()
    .max(200, 'Reason must be less than 200 characters')
    .optional(),
});

export type SessionCancellationData = z.infer<typeof sessionCancellationSchema>;

// Session creation schema (admin only)
export const sessionCreationSchema = z.object({
  gameProjectId: z.string().uuid(),

  scheduledDate: z.date()
    .refine(date => date > new Date(), {
      message: 'Session date must be in the future',
    }),

  duration: z.number()
    .int()
    .min(30, 'Session must be at least 30 minutes')
    .max(480, 'Session must be less than 8 hours')
    .default(120),

  maxPlayers: z.number()
    .int()
    .min(2, 'Session must allow at least 2 players')
    .max(10, 'Session must allow at most 10 players'),

  venue: z.string()
    .min(5, 'Venue description must be at least 5 characters')
    .max(200, 'Venue description must be less than 200 characters'),

  venueType: z.enum(['in_person', 'online', 'hybrid']).default('in_person'),

  onlineLink: z.string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),

  notes: z.string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),

  facilitatorId: z.string().uuid().optional(), // Defaults to current user
}).refine(
  data => {
    // If online or hybrid, require online link
    if (data.venueType === 'online' || data.venueType === 'hybrid') {
      return data.onlineLink && data.onlineLink.length > 0;
    }
    return true;
  },
  {
    message: 'Online link is required for online or hybrid sessions',
    path: ['onlineLink'],
  }
);

export type SessionCreationData = z.infer<typeof sessionCreationSchema>;

// Session update schema (admin only)
export const sessionUpdateSchema = sessionCreationSchema.partial().extend({
  id: z.string().uuid(),
  status: z.enum(['scheduled', 'ongoing', 'completed', 'cancelled']).optional(),
});

export type SessionUpdateData = z.infer<typeof sessionUpdateSchema>;

// Mark attendance schema
export const markAttendanceSchema = z.object({
  sessionId: z.string().uuid(),
  attendees: z.array(z.object({
    userId: z.string().uuid(),
    attended: z.boolean(),
  })),
});

export type MarkAttendanceData = z.infer<typeof markAttendanceSchema>;
