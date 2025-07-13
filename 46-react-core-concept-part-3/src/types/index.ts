export interface IError {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: object;
}
