export interface IGetJobsQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchQuery?: string;
  category?: string;
}

interface IJobOwnerInfo {
  name: string;
  email: string;
  photoURL: string;
}

export interface IJob {
  _id: string;
  jobOwnerInfo: IJobOwnerInfo;
  title: string;
  description: string;
  category: string;
  minimumPrice: number;
  maximumPrice: number;
  bidCount: number;
  deadline: string;
  acceptingBidRequest: boolean;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateJob {
  jobOwnerInfo: IJobOwnerInfo;
  title: string;
  deadline: string;
  description: string;
  category: string;
  minimumPrice: number;
  maximumPrice: number;
  bidCount: number;
  isCompleted: boolean;
}

interface IJobData {
  title: string;
  deadline: string;
  description: string;
  minimumPrice: number;
  maximumPrice: number;
}

export interface IUpdateJob {
  jobId: string;
  jobOwnerEmail: string;
  jobData: IJobData;
}

export interface IDeleteJob {
  jobId: string;
  jobOwnerEmail: string;
}
