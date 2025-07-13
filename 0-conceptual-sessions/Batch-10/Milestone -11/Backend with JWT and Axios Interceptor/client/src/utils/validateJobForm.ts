import { isFuture } from 'date-fns';
import { ICreateJob } from '../types/job';

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validates job form data.
 * @param formData - The form data to validate.
 * @param deadline - The deadline date.
 * @returns {ValidationResult} - The result of the validation.
 */

export const validateJobForm = (
  formData: Partial<ICreateJob>,
  deadline: Date | null
): ValidationResult => {
  // Validate Title
  if (!formData.title || formData.title.length <= 10) {
    return {
      isValid: false,
      errorMessage: 'Job title must be at least 10 characters.',
    };
  }

  // Validate Date
  if (!deadline || !isFuture(new Date(deadline))) {
    return {
      isValid: false,
      errorMessage: 'Please select a valid deadline date.',
    };
  }

  // Validate Price
  if (formData.maximumPrice! <= formData.minimumPrice!) {
    return {
      isValid: false,
      errorMessage:
        'Maximum price must be greater than or equal to minimum price.',
    };
  }

  // All validations passed
  return { isValid: true };
};
