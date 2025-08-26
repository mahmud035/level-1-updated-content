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

// TODO: Need To modify this
export interface IUpdateBidStatus {
  jobBidId: string; // The unique identifier of the job bid that needs to be updated
  jobId: string; // The unique identifier of the job associated with the bid
  status: 'In Progress' | 'Rejected' | 'Completed';
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
