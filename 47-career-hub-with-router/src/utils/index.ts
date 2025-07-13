import toast from 'react-hot-toast';
import { IJob } from '../types';

// Function to get image URL
export const getImageURL = (folderName: string, imageName: string): string => {
  return new URL(`../assets/${folderName}/${imageName}`, import.meta.url).href;
};

// Function to get applied jobs from local storage
export const getAppliedJobs = (): IJob[] => {
  const jobs = JSON.parse(localStorage.getItem('appliedJobs') ?? '[]');
  return jobs;
};

// Function to save applied jobs to local storage
export const saveAppliedJobs = (job: IJob) => {
  const storedJobs = getAppliedJobs();
  const jobAlreadyExist = storedJobs.some(
    (storedJob: IJob) => storedJob.id === job.id
  );

  if (!jobAlreadyExist) {
    const updatedAppliedJobs = [...storedJobs, job];
    localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
    toast.success('Successfully applied for the job.');
  } else {
    toast.error('Already applied for this job!');
  }
};
