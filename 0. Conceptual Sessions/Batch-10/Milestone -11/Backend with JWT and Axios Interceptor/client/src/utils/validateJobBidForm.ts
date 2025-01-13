import { isBefore, isSameDay, startOfDay } from 'date-fns';
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
  // Validate Bid Amount
  if (formData.bidAmount === undefined || formData.bidAmount < minimumPrice) {
    return {
      isValid: false,
      errorMessage:
        'Bid amount must be greater than or equal to the minimum price.',
    };
  }

  // Validate Date
  if (!startDate) {
    return {
      isValid: false,
      errorMessage: 'Please select a valid deadline dead.',
    };
  }

  /**
   * NOTE: These checks together enforce:
   *
   * 1. The deadline cannot be today or earlier.
   * 2. The deadline must be within the valid range for the job.
   */

  const today = startOfDay(new Date());
  const selectedDate = startOfDay(new Date(startDate));
  const isBidDeadlineToday = isSameDay(selectedDate, today);
  const isBidDeadlineBeforeToday = isBefore(selectedDate, today);
  const isBidDeadlineBeforeJobDeadline = isBefore(
    selectedDate,
    new Date(deadline)
  );

  if (isBidDeadlineToday || isBidDeadlineBeforeToday) {
    return {
      isValid: false,
      errorMessage: 'The bid deadline must be at least one day in the future.',
    };
  }

  if (!isBidDeadlineBeforeJobDeadline) {
    return {
      isValid: false,
      errorMessage: 'The bid deadline must be before the job deadline.',
    };
  }

  // All validations passed
  return { isValid: true };
};

export default validateJobBidForm;
