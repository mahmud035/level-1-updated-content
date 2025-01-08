import { jobs } from '../../../server.js';
import { buildQueryFromFilters } from './job.utils.js';

/** 
 * NOTE: If searchQuery and filtering options are provided, the query object will look like this:
    {
      $or: [
        { title: { $regex: "engineer", $options: "i" } },
        { category: { $regex: "categoryName", $options: "i" } }
      ],
      jobType: "Remote",
      category: "Engineering",
      'salaryRange.min': { '$gte': 0 },
      'salaryRange.max': { '$lte': 100000 }
    }
 */

const getJobs = async (options) => {
  const { page, limit, sortBy, sortOrder, searchQuery, filters } = options;
  const query = {};

  // 1. Pagination
  const skip = (page - 1) * limit;

  // 2. Sorting
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // 3. Add searchQuery for partial and case-insensitive matching
  if (searchQuery) {
    query.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { category: { $regex: searchQuery, $options: 'i' } },
    ];
  }

  // 4. Add filters dynamically using the utility function
  Object.assign(query, buildQueryFromFilters(filters));

  const result = await jobs
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray();
  const total = await jobs.countDocuments(query);

  return { jobs: result, total };
};

export const JobService = { getJobs };
