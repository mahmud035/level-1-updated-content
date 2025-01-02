import { ObjectId } from 'mongodb';
import { jobApplications, jobs } from '../../../server.js';

const getJobApplications = async (applicantEmail) => {
  // Query to find job applications by email
  const query = { 'applicantInfo.email': applicantEmail };
  const jobApplicationsList = await jobApplications.find(query).toArray();

  if (jobApplicationsList.length === 0) return [];

  // Extract job IDs from the job applications
  const jobIds = jobApplicationsList.map(
    (application) => new ObjectId(application.jobId)
  );

  // Query the jobs collection for matching jobs
  const jobsQuery = { _id: { $in: jobIds } };
  const projection = {
    title: 1,
    location: 1,
    company: 1,
    company_logo: 1,
  };
  const jobDetailsList = await jobs
    .find(jobsQuery)
    .project(projection)
    .toArray();

  return jobDetailsList;
};

const saveJobApplication = async (data) => {
  const timestamp = new Date();
  const result = await jobApplications.insertOne({
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  return result;
};

const deleteJobApplication = async (id, applicantEmail) => {
  const query = { jobId: id, 'applicantInfo.email': applicantEmail };
  const result = await jobApplications.deleteOne(query);
  return result;
};

export const JobApplicationServices = {
  getJobApplications,
  saveJobApplication,
  deleteJobApplication,
};
