export interface ISaveJobApplication {
  jobId: string;
  applicantInfo: {
    email: string;
    linkedInURL: string;
    githubURL: string;
    resumeURL: string;
  };
}
