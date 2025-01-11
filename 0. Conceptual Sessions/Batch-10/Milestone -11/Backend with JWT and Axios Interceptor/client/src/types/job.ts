export interface IGetJobsQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchQuery?: string;
  category?: string;
}

export interface IJob {
  _id: string;
  email: string;
  title: string;
  deadline: string;
  description: string;
  category: string;
  minimumPrice: number;
  maximumPrice: number;
  bidCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateJob {
  email: string;
  title: string;
  deadline: string;
  description: string;
  category: string;
  minimumPrice: number;
  maximumPrice: number;
  bidCount: number;
}

export interface IUpdateJob {
  jobId: string;
  jobOwnerEmail: string;
  jobData: IJob;
}

export interface IDeleteJob {
  jobId: string;
  jobOwnerEmail: string;
}
