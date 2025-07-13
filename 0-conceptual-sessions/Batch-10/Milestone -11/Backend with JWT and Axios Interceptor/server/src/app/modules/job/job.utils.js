/**
 * Processes filters and constructs a query object.
 
 * @param {Object} filters - The filters to be applied.
 * @returns {Object} query - The constructed query object.
 */

export const buildQueryFromFilters = (filters) => {
  const query = {};

  if (Object.keys(filters).length) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'undefined') {
        const parsedValue = parseInt(value);

        if (value !== '') query[key] = value;
      }
    });
  }

  return query;
};
