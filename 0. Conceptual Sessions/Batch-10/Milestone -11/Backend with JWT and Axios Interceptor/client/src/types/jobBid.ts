export interface IJobBid {
  jobId: string;
  jobTitle: string;
  bidAmount: number;
  bidDeadline: string;
  bidderEmail: string;
  jobOwnerEmail: string;
}

// TODO: Need To modify this
export interface IUpdateBidStatus {
  jobId: string;
  status: object;
}
