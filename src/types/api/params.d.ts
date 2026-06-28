import { PaginationProps } from "antd";

export interface IPagination {
  current: number | undefined;
  pageSize: number | undefined;
  total: number | undefined;
}

export interface IDefaultApi {
  session?: Sessions;
  enabled?: boolean;
  pagination?: IPagination | PaginationProps;
  period?: string;
  filters?: any;
  search?: string | undefined;
}

export interface IDefaultApiMinimum {
  session?: Sessions;
  enabled?: boolean;
  pagination?: IPagination | PaginationProps;
}

export type IDefaultApiExclude<K extends keyof T> = Omit<IDefaultApi, K>;
export type IDefaultApiOnly<K extends keyof T> = Pick<IDefaultApi, K>;
