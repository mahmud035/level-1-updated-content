interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface IJob {
  _id: string;
  title: string;
  location: string;
  jobType: string;
  category: string;
  description: string;
  applicationDeadline: string;
  salaryRange: SalaryRange;
  requirements: string[];
  responsibilities: string[];
  status: string;
  hr_name: string;
  hr_email: string;
  company: string;
  company_logo: string;
}

export interface IAddJob {
  title: string;
  location: string;
  jobType: string;
  category: string;
  applicationDeadline: string;
  description: string;
  salaryRange: SalaryRange;
  requirements: string[];
  responsibilities: string[];
  hr_name: string;
  hr_email: string;
  company: string;
  company_logo: string;
}

export interface IUpdateJob {
  jobId: string;
  recruiterEmail: string;
  jobData: IJob;
}

export interface IDeleteJob {
  jobId: string;
  recruiterEmail: string;
}
