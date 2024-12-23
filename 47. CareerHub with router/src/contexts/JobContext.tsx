import React, { createContext, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { IJob, IJobCategory } from '../types';
import { getAppliedJobs } from '../utils';

interface IJobContext {
  jobs: IJob[];
  jobCategories: IJobCategory[];
  showAllJobs: boolean;
  setShowAllJobs: React.Dispatch<React.SetStateAction<boolean>>;
  appliedJobs: IJob[];
  setAppliedJobs: React.Dispatch<React.SetStateAction<IJob[]>>;
}

interface IJobProviderProps {
  children: React.ReactNode;
}

const JobContext = createContext<IJobContext | null>(null);

export default function JobProvider({ children }: IJobProviderProps) {
  // Fetch jobs and job categories data using custom hooks
  const jobs = useFetchData<IJob>('jobs.json');
  const jobCategories = useFetchData<IJobCategory>('categories.json');

  // State to manage job visibility and applied jobs
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(getAppliedJobs() as IJob[]);

  // Consolidate all context values
  const jobInfo = {
    jobs,
    jobCategories,
    showAllJobs,
    setShowAllJobs,
    appliedJobs,
    setAppliedJobs,
  };

  return <JobContext.Provider value={jobInfo}>{children}</JobContext.Provider>;
}

export { JobContext };
