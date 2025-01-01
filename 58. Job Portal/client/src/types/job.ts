export interface IJob {
  _id: string;
  title: string;
  location: string;
  jobType: string;
  category: string;
  applicationDeadline: string;
  salaryRange: SalaryRange;
  description: string;
  company: string;
  requirements: string[];
  responsibilities: string[];
  status: string;
  hr_email: string;
  hr_name: string;
  company_logo: string;
}

interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}
