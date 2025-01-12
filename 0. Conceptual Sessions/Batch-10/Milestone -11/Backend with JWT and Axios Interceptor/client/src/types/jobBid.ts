export interface ISaveJobBid {
  jobId: string;
  jobTitle: string;
  jobCategory: string;
  bidAmount: number;
  bidderComment: string;
  bidDeadline: string;
  bidderEmail: string;
  jobOwnerEmail: string;
}

// TODO: Need To modify this
export interface IUpdateBidStatus {
  jobId: string;
  status: object;
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
  createdAt: string;
  updatedAt: string;
}
