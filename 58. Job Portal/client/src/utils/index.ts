export const defaultRegistrationFormData = {
  name: '',
  email: '',
  password: '',
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

export const getDefaultAddJobFormData = (recruiterEmail: string) => ({
  title: '',
  location: '',
  description: '',
  jobType: 'Hybrid',
  category: 'Engineering',
  applicationDeadline: '',
  salaryRange: { min: 0, max: 0, currency: 'bdt' },
  requirements: [],
  responsibilities: [],
  hr_email: recruiterEmail,
  hr_name: '',
  company: '',
  company_logo: '',
});
