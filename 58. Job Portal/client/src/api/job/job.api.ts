import axiosInstance from '../../config/axios.config';

export const getJobs = async () => {
  const { data } = await axiosInstance.get('/jobs');
  return data;
};

export const getJob = async (id: string) => {
  const { data } = await axiosInstance.get(`/jobs/${id}`);
  return data;
};
