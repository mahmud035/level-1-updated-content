import { useContext } from 'react';
import { JobContext } from '../contexts/JobContext';

export default function useJobInfo() {
  const jobInfo = useContext(JobContext);
  if (!jobInfo) throw new Error('useJobInfo must be used within a JobProvider');
  return jobInfo;
}
