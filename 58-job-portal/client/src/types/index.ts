export interface IRouterError {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: object;
}
