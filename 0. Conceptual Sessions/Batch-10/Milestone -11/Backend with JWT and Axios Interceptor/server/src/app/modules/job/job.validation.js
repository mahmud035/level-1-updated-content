import z from 'zod';

const getJobsZodSchema = z.object({
  query: z.object({
    page: z
      .string()
      .regex(/^[1-9]\d*$/, 'Page must be a positive integer starting from 1')
      .optional(),
    limit: z
      .string()
      .regex(/^[1-9]\d*$/, 'Limit must be a positive integer starting from 1')
      .optional(),
    sortBy: z.string().optional(), // Field to sort by
    sortOrder: z.enum(['asc', 'desc']).optional(), // Sorting order
    searchQuery: z.string().optional(), // Text search input
  }),
});

export const JobValidation = { getJobsZodSchema };
