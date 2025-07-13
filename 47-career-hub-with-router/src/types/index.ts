export interface IError {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: object;
}

export interface IJobCategory {
  id: number;
  logo: string;
  category_name: string;
  availability: string;
}

export interface IJob {
  id: number;
  logo: string;
  job_title: string;
  company_name: string;
  remote_or_onsite: string;
  location: string;
  job_type: string;
  salary: string;
  job_description: string;
  job_responsibility: string;
  educational_requirements: string;
  experiences: string;
  contact_information: IContactInformation;
}

interface IContactInformation {
  phone: string;
  email: string;
  address: string;
}
