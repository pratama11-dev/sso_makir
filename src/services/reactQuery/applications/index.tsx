import { IDefaultApi, IDefaultApiExclude, IDefaultApiMinimum } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";
import { IApplication } from "types/apps";

export const useAppQuery = (
  data: IDefaultApi
) => {
  const { enabled } = data;

  return useQueryHooks(data).config<IApplication[], any>({
    data: ["pagination", "search"],
    api: "/api/apps",
    key: "useAppQuery",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      // keepPreviousData: false,
    },
  });
};