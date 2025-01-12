import { isBefore } from 'date-fns';
import { ISaveJobBid } from '../types/jobBid';

interface IValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validated job bid form data.
 * @param formData - The form data to validate.
 * @param startDate - The selected start data.
 * @param deadline - The deadline for the job.
 * @param minimumPrice - The minium price for the bid.
 * @returns {IValidationResult} - The result of the validation.
 */

const validateJobBidForm = (
  formData: Partial<ISaveJobBid>,
  startDate: Date | null,
  deadline: string,
  minimumPrice: number
): IValidationResult => {
  // Validate Date
  if (!startDate) {
    return {
      isValid: false,
      errorMessage: 'Please select a valid deadline dead.',
    };
  }

  const isBidDeadlineBeforeJobDeadline = isBefore(
    new Date(startDate),
    new Date(deadline)
  );

  if (!isBidDeadlineBeforeJobDeadline) {
    return {
      isValid: false,
      errorMessage: 'The bid deadline must be before the job deadline.',
    };
  }

  // Validate Bid Amount
  if (formData.bidAmount === undefined || formData.bidAmount < minimumPrice) {
    return {
      isValid: false,
      errorMessage:
        'Bid amount must be greater than or equal to the minimum price.',
    };
  }

  // All validations passed
  return { isValid: true };
};

export default validateJobBidForm;
