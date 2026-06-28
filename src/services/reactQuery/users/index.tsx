import { IDefaultApi, IDefaultApiExclude, IDefaultApiMinimum } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";
import { IUser } from "types/Users";

export const useUserQuery = (
  data: IDefaultApi
) => {
  const { enabled } = data;

  return useQueryHooks(data).config<IUser[], any>({
    data: ["pagination", "search"],
    api: "/api/users/list",
    key: "useUserQuery",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      // keepPreviousData: false,
    },
  });
};

// export const useListPr = (
//   data: IDefaultApiMinimum & { search?: string, mode?: string, user_role?: string, filters?: any}
// ) => {
//   const { enabled } = data;

//   return useQueryHooks(data).config<any[], any>({
//       data: ["pagination", "search", "mode", "user_role", "filters"],
//       api: "/api/users/list",
//       key: "useListPr",
//       method: "POST",
//       config: {
//           enabled: enabled ?? false,
//           refetchOnWindowFocus: true,
//           keepPreviousData: false,
//       },
//   });
// };