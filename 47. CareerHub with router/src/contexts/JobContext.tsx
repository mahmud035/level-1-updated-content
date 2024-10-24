import { createContext, ReactNode } from 'react';
import useFetchData from '../hooks/useFetchData';
import { IJob, IJobCategory } from '../types';

interface IJobProviderProps {
  children: ReactNode;
}

interface IJobContext {
  jobs: IJob[];
  jobCategories: IJobCategory[];
}

export const JobContext = createContext<IJobContext | undefined>(undefined);

export default function JobProvider({ children }: IJobProviderProps) {
  const jobs = useFetchData<IJob>('jobs.json');
  const jobCategories = useFetchData<IJobCategory>('categories.json');

  const jobInfo = { jobs, jobCategories };

  return <JobContext.Provider value={jobInfo}>{children}</JobContext.Provider>;
}
