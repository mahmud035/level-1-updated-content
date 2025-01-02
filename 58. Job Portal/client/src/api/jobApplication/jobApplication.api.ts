import axiosInstance from '../../config/axios.config';
import { ISaveJobApplication } from '../../types/jobApplication';

export const getJobApplications = async (email: string) => {
  const { data } = await axiosInstance.get(`/job-applications?email=${email}`);
  return data;
};

export const saveJobApplication = async (
  applicationData: ISaveJobApplication
) => {
  const { data } = await axiosInstance.post(
    `/job-applications`,
    applicationData
  );
  return data;
};
