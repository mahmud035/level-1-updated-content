import { compareAsc, startOfDay } from 'date-fns';
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
  maximumPrice: number
): IValidationResult => {
  // Validate Bid Amount
  if (formData.bidAmount === undefined || formData.bidAmount > maximumPrice) {
    return {
      isValid: false,
      errorMessage: 'Bid amount cannot exceed the maximum allowable price.',
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
   * NOTE: The `compareAsc` function compares two dates and returns:
   
   * `-1` if the first date is earlier than the second.
   * `0` if the two dates are the same.
   * `1` if the first date is later than the second.
   
   * The `startOfDay` function returns the start of a day for the given date.
   * It ensures that only the date is considered during comparisons, ignoring the time (e.g., 10:30 AM vs. 00:00 AM).
   * If the current time is 2025-01-13T15:45:00, startOfDay(new Date()) results in `2025-01-13T00:00:00`.
   */

  const today = startOfDay(new Date());
  const selectedDate = startOfDay(new Date(startDate));
  const jobDeadline = startOfDay(new Date(deadline));

  // Check if selected date is today or in the past
  if (compareAsc(selectedDate, today) <= 0) {
    return {
      isValid: false,
      errorMessage: 'The bid deadline must be at least one day in the future.',
    };
  }

  // Check if selected date is before the job deadline
  if (compareAsc(selectedDate, jobDeadline) >= 0) {
    return {
      isValid: false,
      errorMessage: 'The bid deadline must be before the job deadline.',
    };
  }

  // All validations passed
  return { isValid: true };
};

export default validateJobBidForm;
