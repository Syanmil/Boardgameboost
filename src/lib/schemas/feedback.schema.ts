import { z } from 'zod';

/**
 * Feedback Validation Schemas
 * Used for submitting and managing playtest feedback
 */

// Rating validation (1-5 scale)
const ratingSchema = z.number()
  .int()
  .min(1, 'Rating must be at least 1')
  .max(5, 'Rating must be at most 5');

// Feedback submission schema
export const feedbackSchema = z.object({
  sessionId: z.string().uuid(),
  gameProjectId: z.string().uuid(),

  // Ratings (all required)
  ratings: z.object({
    fun: ratingSchema,
    clarity: ratingSchema,
    balance: ratingSchema,
    theme: ratingSchema,
    mechanics: ratingSchema,
  }),

  // Comments (liked is required, others optional)
  comments: z.object({
    liked: z.string()
      .min(10, 'Please provide at least 10 characters about what you liked')
      .max(1000, 'Comment must be less than 1000 characters'),
    disliked: z.string()
      .max(1000, 'Comment must be less than 1000 characters')
      .optional(),
    suggestions: z.string()
      .max(1000, 'Comment must be less than 1000 characters')
      .optional(),
    confusing: z.string()
      .max(1000, 'Comment must be less than 1000 characters')
      .optional(),
  }),

  // Behavioral questions
  wouldPlayAgain: z.boolean(),
  wouldRecommend: z.boolean(),

  // Meta
  isAnonymous: z.boolean().default(false),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;

// Designer response to feedback
export const feedbackResponseSchema = z.object({
  feedbackId: z.string().uuid(),
  response: z.string()
    .min(10, 'Response must be at least 10 characters')
    .max(500, 'Response must be less than 500 characters'),
});

export type FeedbackResponseData = z.infer<typeof feedbackResponseSchema>;

// Feedback filter schema
export const feedbackFilterSchema = z.object({
  gameProjectId: z.string().uuid(),
  sessionId: z.string().uuid().optional(),
  minRating: z.number().int().min(1).max(5).optional(),
  includeAnonymous: z.boolean().default(true),
});

export type FeedbackFilterData = z.infer<typeof feedbackFilterSchema>;
