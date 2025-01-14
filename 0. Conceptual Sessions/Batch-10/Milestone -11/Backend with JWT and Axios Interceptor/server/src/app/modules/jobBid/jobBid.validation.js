import { z } from 'zod';
import { isValidISODate, isValidObjectId } from '../job/job.validation.js';

const getJobBidsByUserZodSchema = z.object({
  query: z.object({
    userEmail: z
      .string({ required_error: 'User email is required' })
      .email('Invalid email format'),
  }),
});

const getAllJobBidsForOwner = z.object({
  query: z.object({
    ownerEmail: z
      .string({ required_error: 'Job owner email is required' })
      .email('Invalid email format'),
  }),
});

const getJobBidsByJobOwnerZodSchema = z.object({
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

const saveJobBidZodSchema = z.object({
  body: z.object({
    jobId: z
      .string({ required_error: 'Job ID is required' })
      .refine(isValidObjectId, 'Invalid job ID format'),
    jobTitle: z.string({ required_error: 'Job title is required' }),
    jobCategory: z.enum([
      'Web Development',
      'Graphics Design',
      'Digital Marketing',
    ]),
    bidAmount: z
      .number({ required_error: 'Bid amount is required' })
      .min(1, 'Minimum bid amount must be at least 1'),
    bidDeadline: z
      .string({ required_error: 'Bid deadline is required' })
      .refine(isValidISODate, 'Invalid date format for bid deadline'),
    bidderComment: z
      .string({ required_error: 'Bid comment is required' })
      .min(10, 'Comment should be at least 10 characters'),
    bidderEmail: z
      .string({ required_error: 'Bidder email is required' })
      .email('Invalid email format'),
    jobOwnerEmail: z
      .string({ required_error: 'Job owner email is required' })
      .email('Invalid email format'),
    status: z.enum(['Pending']),
  }),
});

const updateBidStatusZodSchema = z.object({
  params: z.object({
    jobBidId: z
      .string({ required_error: 'Job bid ID is required' })
      .refine(isValidObjectId, 'Invalid job bid ID format'), // Validate MongoDB ObjectId format
  }),
  body: z.object({
    jobId: z
      .string({ required_error: 'Job ID is required' })
      .refine(isValidObjectId, 'Invalid Job ID format'), // Validate MongoDB ObjectId format,
    status: z.enum(['In Progress', 'Rejected', 'Completed']),
  }),
});

export const JobBidValidation = {
  getJobBidsByUserZodSchema,
  getAllJobBidsForOwner,
  getJobBidsByJobOwnerZodSchema,
  saveJobBidZodSchema,
  updateBidStatusZodSchema,
};
