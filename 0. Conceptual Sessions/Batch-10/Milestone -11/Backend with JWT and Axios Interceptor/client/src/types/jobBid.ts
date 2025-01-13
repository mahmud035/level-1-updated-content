export interface ISaveJobBid {
  jobId: string;
  jobTitle: string;
  jobCategory: string;
  bidAmount: number;
  bidderComment: string;
  bidDeadline: string;
  bidderEmail: string;
  jobOwnerEmail: string;
  status: 'Pending';
}

interface IStatus {
  status: 'In Progress' | 'Rejected' | 'Completed';
}

// TODO: Need To modify this
export interface IUpdateBidStatus {
  jobId: string;
  status: IStatus;
}

export interface IJobBid {
  _id: string;
  jobId: string;
  jobTitle: string;
  jobCategory: string;
  bidAmount: number;
  bidDeadline: string;
  bidderEmail: string;
  jobOwnerEmail: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
