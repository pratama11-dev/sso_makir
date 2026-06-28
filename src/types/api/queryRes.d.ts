import { AxiosResponse } from "axios";

// Define the generic type K as an interface
export interface ApiResponseProperties {
  info?: string;
  count?: number;
}

export interface IGenericApiResponse<T, K extends ApiResponseProperties>
  extends K {
  data?: T;
  total: number;
}

export interface IQueryResponse<T, K extends ApiResponseProperties>
  extends AxiosResponse<IGenericApiResponse<T, K>> {}
