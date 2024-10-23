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
