import axiosInstance from '../../config/axios.config';
import {
  IDeleteJobApplication,
  ISaveJobApplication,
} from '../../types/jobApplication';

export const getJobApplications = async (email: string) => {
  const { data } = await axiosInstance.get(`/job-applications?email=${email}`);
  return data;
};

export const getJobApplicationCount = async (jobId: string) => {
  const { data } = await axiosInstance.get(
    `/job-applications/${jobId}/applications/count`
  );
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

export const deleteJobApplication = async ({
  jobId,
  applicantEmail,
}: IDeleteJobApplication) => {
  const { data } = await axiosInstance.delete(
    `/job-applications/${jobId}?email=${applicantEmail}`
  );
  return data;
};
