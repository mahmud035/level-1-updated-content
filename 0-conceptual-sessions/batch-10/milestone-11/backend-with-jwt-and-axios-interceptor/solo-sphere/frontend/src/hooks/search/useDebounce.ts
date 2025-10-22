import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on value change or unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, value]);

  return debouncedValue;
}

// NOTE: This hook will delay the setting of the search query and filter values by a specified time (e.g., 500ms) to avoid triggering unnecessary requests when the user is typing.

// We will use the useDebounce hook to debounce the searchQuery, minSalary, and maxSalary before passing them to the useGetJobsQuery hook.
