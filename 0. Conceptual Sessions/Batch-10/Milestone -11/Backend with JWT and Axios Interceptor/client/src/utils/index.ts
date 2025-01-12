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

export const defaultJobApplyFormData = {
  linkedInURL: '',
  githubURL: '',
  resumeURL: '',
};

export const getDefaultAddJobFormData = {
  title: '',
  description: '',
  category: 'Web Development',
  minimumPrice: 1,
  maximumPrice: 1,
  bidCount: 0,
};

export const getDefaultUpdateJobFormData = (data: IJob) => ({
  _id: data?._id ?? '',
  title: data?.title ?? '',
  description: data?.description ?? '',
  category: data?.category ?? '',
  minimumPrice: data?.minimumPrice ?? 1,
  maximumPrice: data?.maximumPrice ?? 1,
  bidCount: data?.bidCount ?? 0,
  createdAt: data?.createdAt ?? '',
  updatedAt: data?.updatedAt ?? '',
});
