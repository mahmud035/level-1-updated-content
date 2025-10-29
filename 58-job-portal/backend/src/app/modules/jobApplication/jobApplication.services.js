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

const getJobApplicationCount = async (jobId) => {
  const query = { jobId: jobId };
  const applications = await jobApplications.find(query).toArray();
  const total = await jobApplications.countDocuments(query);
  return { applications, total };
};

const saveJobApplication = async (data) => {
  // ---------------------------------------------------------------------
  // NOTE: NOT the best way. Use MongoDB Aggregate.
  // Add an `applicationCount` property to the job document inside the jobs collection to track the number of applications for that job.
  const jobId = data?.jobId;
  const query = { _id: new ObjectId(jobId) };
  const job = await jobs.findOne(query);
  let numberOfApplication = 0;
  if (job.applicationCount) numberOfApplication = job.applicationCount + 1;
  else numberOfApplication = 1;

  // Update the job document
  const filter = { _id: new ObjectId(jobId) };
  const updatedDoc = { $set: { applicationCount: numberOfApplication } };
  const updatedJob = await jobs.updateOne(filter, updatedDoc);
  // ---------------------------------------------------------------------

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
  getJobApplicationCount,
  saveJobApplication,
  deleteJobApplication,
};
