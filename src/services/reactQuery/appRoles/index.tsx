import { IDefaultApi, IDefaultApiExclude, IDefaultApiMinimum } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";
import { IAppRoles } from "types/appRoles";

export const useAppRoleQuery = (
  data: IDefaultApi & {
    app_name?: string
  }
) => {
  const { enabled } = data;

  return useQueryHooks(data).config<IAppRoles[], any>({
    data: ["pagination", "search", "app_name"],
    api: "/api/apps-role",
    key: "useAppRoleQuery",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
    },
  });
};