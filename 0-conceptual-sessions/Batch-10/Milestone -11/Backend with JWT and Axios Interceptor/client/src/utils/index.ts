import { IJob } from '../types/job';

export const defaultRegistrationFormData = {
  name: '',
  email: '',
  password: '',
  photoURL: '',
};

export const defaultLoginFormData = {
  email: '',
  password: '',
};

export const getDefaultAddJobFormData = {
  title: '',
  description: '',
  category: 'Web Development',
  minimumPrice: 1,
  maximumPrice: 1,
  bidCount: 0,
  isCompleted: false,
};

export const getDefaultUpdateJobFormData = (data: IJob) => ({
  _id: data?._id ?? '',
  title: data?.title ?? '',
  description: data?.description ?? '',
  category: data?.category ?? '',
  minimumPrice: data?.minimumPrice ?? 1,
  maximumPrice: data?.maximumPrice ?? 1,
});
