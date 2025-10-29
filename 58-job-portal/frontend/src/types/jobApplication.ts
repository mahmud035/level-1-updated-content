export interface ISaveJobApplication {
  jobId: string;
  applicantInfo: {
    email: string;
    linkedInURL: string;
    githubURL: string;
    resumeURL: string;
  };
}

export interface IJobApplication {
  _id: string;
  title: string;
  location: string;
  company: string;
  company_logo: string;
}

export interface IDeleteJobApplication {
  jobId: string;
  applicantEmail: string;
}
