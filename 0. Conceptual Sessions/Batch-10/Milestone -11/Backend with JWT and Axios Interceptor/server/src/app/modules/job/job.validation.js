import { ObjectId } from 'mongodb';
import z from 'zod';

// Custom validator to check if the value is a valid MongoDB ObjectId
export const isValidObjectId = (id) => ObjectId.isValid(id);

// Function to validate ISO date format
export const isValidISODate = (date) => !isNaN(new Date(date).getTime());

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

const getJobZodSchema = z.object({
  params: z.object({
    jobId: z
      .string({ required_error: 'Job ID is required' })
      .refine(isValidObjectId, 'Invalid job ID format'), // Validate MongoDB ObjectId format
  }),
});

const getJobsByUserZodSchema = z.object({
  query: z.object({
    userEmail: z
      .string({ required_error: 'User email is required' })
      .email('Invalid email format'),
  }),
});

const createJobZodValidation = z.object({
  body: z
    .object({
      jobOwnerInfo: z.object({
        name: z
          .string({ required_error: 'Job owner name is required' })
          .min(3, 'Job owner name must be at least 3 characters'),
        email: z
          .string({ required_error: 'Job owner email is required' })
          .email('Invalid email format'),
        photoURL: z.string({
          required_error: 'Job owner photoURL is required',
        }),
      }),
      title: z
        .string({ required_error: 'Job title is required' })
        .min(3, 'Job title must be at least 3 characters'),
      deadline: z
        .string({ required_error: 'Deadline is required' })
        .refine(isValidISODate, 'Invalid date format for deadline'),
      description: z
        .string({ required_error: 'Description is required' })
        .min(10, 'Description must be at least 10 characters'),
      category: z.enum([
        'Web Development',
        'Graphics Design',
        'Digital Marketing',
      ]), // 👈 Need to modify it later
      minimumPrice: z
        .number({ required_error: 'Minimum price is required' })
        .min(1, 'Minimum price must be at least 1'),
      maximumPrice: z.number({ required_error: 'Maximum price is required' }),
      bitCount: z.number().min(0, 'Minimum bit count value is 0').optional(),
    })
    .refine((data) => data.maximumPrice >= data.minimumPrice, {
      path: ['maximumPrice'],
      message: 'Maximum price must be greater than or equal to minimum price',
    }),
});

const updateJobZodValidation = z.object({
  params: z.object({
    jobId: z
      .string({ required_error: 'Job ID is required' })
      .refine(isValidObjectId, 'Invalid job ID format'), // Validate MongoDB ObjectId format
  }),

  query: z.object({
    ownerEmail: z
      .string({ required_error: 'Job owner email is required' })
      .email('Invalid email format'),
  }),

  body: z
    .object({
      jobOwnerInfo: z.object({
        name: z
          .string({ required_error: 'Job owner name is required' })
          .min(3, 'Job owner name must be at least 3 characters'),
        email: z
          .string({ required_error: 'Job owner email is required' })
          .email('Invalid email format'),
        photoURL: z.string({
          required_error: 'Job owner photoURL is required',
        }),
      }),
      title: z
        .string({ required_error: 'Job title is required' })
        .min(3, 'Job title must be at least 3 characters'),
      deadline: z
        .string({ required_error: 'Deadline is required' })
        .refine(isValidISODate, 'Invalid date format for deadline'),
      description: z
        .string({ required_error: 'Description is required' })
        .min(10, 'Description must be at least 10 characters'),
      category: z.enum([
        'Web Development',
        'Graphics Design',
        'Digital Marketing',
      ]), // 👈 Need to modify it later
      minimumPrice: z
        .number({ required_error: 'Minimum price is required' })
        .min(1, 'Minimum price must be at least 1'),
      maximumPrice: z.number({ required_error: 'Maximum price is required' }),
      bitCount: z.number().min(0, 'Minimum bit count value is 0').optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .refine((data) => data.maximumPrice >= data.minimumPrice, {
      path: ['maximumPrice'],
      message: 'Maximum price must be greater than or equal to minimum price',
    }),
});

const deleteJobZodSchema = z.object({
  params: z.object({
    jobId: z
      .string({ required_error: 'Job ID is required' })
      .refine(isValidObjectId, 'Invalid job ID format'), // Validate MongoDB ObjectId format
  }),
  query: z.object({
    ownerEmail: z
      .string({ required_error: 'Job owner email is required' })
      .email('Invalid email format'),
  }),
});

export const JobValidation = {
  getJobsZodSchema,
  getJobZodSchema,
  getJobsByUserZodSchema,
  createJobZodValidation,
  updateJobZodValidation,
  deleteJobZodSchema,
};
