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

export const getDefaultAddJobFormData = (jobOwnerEmail: string) => ({
  title: '',
  email: jobOwnerEmail,
  description: '',
  category: 'Web Development',
  minimumPrice: 1,
  maximumPrice: 1,
  bidCount: 0,
});
