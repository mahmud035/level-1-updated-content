import { z } from 'zod';

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

// NOTE: This schema is for testing purpose only. When using actual project, it MUST be improved.

const createJobZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(3),
    location: z.string({ required_error: 'Location is required' }),
    jobType: z.string({ required_error: 'Job type is required' }),
    category: z.string({ required_error: 'Category is required' }),
    applicationDeadline: z.string({
      required_error: 'Application deadline is required',
    }),
    salaryRange: z.object(
      {
        min: z.number().positive(),
        max: z.number().positive(),
        currency: z.string(),
      },
      { required_error: 'Salary range is required' }
    ),
    description: z.string({ required_error: 'Description is required' }),
    company: z.string({ required_error: 'Company name is required' }),
    requirements: z.array(z.string()),
    responsibilities: z.array(z.string()),
    hr_email: z.string().email({ required_error: 'HR email is required' }),
    hr_name: z.string({ required_error: 'HR name is required' }),
    company_logo: z.string({ required_error: 'Company logo is required' }),
  }),
});

const updateJobZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(3),
    location: z.string({ required_error: 'Location is required' }),
    jobType: z.string({ required_error: 'Job type is required' }),
    category: z.string({ required_error: 'Category is required' }),
    applicationDeadline: z.string({
      required_error: 'Application deadline is required',
    }),
    salaryRange: z.object(
      {
        min: z.number().positive(),
        max: z.number().positive(),
        currency: z.string(),
      },
      { required_error: 'Salary range is required' }
    ),
    description: z.string({ required_error: 'Description is required' }),
    company: z.string({ required_error: 'Company name is required' }),
    requirements: z.array(z.string()),
    responsibilities: z.array(z.string()),
    hr_email: z.string().email({ required_error: 'HR email is required' }),
    hr_name: z.string({ required_error: 'HR name is required' }),
    company_logo: z.string({ required_error: 'Company logo is required' }),
  }),
});

export const JobValidation = {
  getJobsZodSchema,
  createJobZodSchema,
  updateJobZodSchema,
};
