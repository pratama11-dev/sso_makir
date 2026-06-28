import useFetcher from "@api/customHooks/useFetcher";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { ApiResponseProperties, IQueryResponse } from "types/api/queryRes";
import { Sessions } from "types/Session";

type TConfig = Omit<
  UseQueryOptions<
    IQueryResponse<any, any>,
    unknown,
    IQueryResponse<any, any>,
    QueryKey
  >,
  "queryFn" | "queryKey"
>;

interface IQuery {
  queryKey: QueryKey;
  queryFn: QueryFunction<any, any>;
  config: TConfig;
}

interface IDataRequire {
  session?: Sessions;
  [key: string]: any;
}

/**
 * customHooks that make live ez
 */
const useQueryHooks = (dataRequire: IDataRequire) => {
  const { session } = dataRequire;
  interface IConfigParams {
    data: (keyof typeof dataRequire)[];
    api: string;
    key: string;
    method: "POST" | "GET";
    config: TConfig;
  }
  type PickerConfig<K extends keyof IConfigParams> = Pick<IConfigParams, K>[K];

  const { FetcherPost, FetcherGet } = useFetcher(session!);

  const useConfig: <T, K extends {}>(
    configParams: IConfigParams
  ) => UseQueryResult<IQueryResponse<T, K>, unknown> = ({
    data: dataKey = [],
    key = "",
    api = "",
    method = "POST",
    config: configParams,
  }: IConfigParams) => {
      const keys: PickerConfig<"data"> = [];
      dataKey.forEach((k) => {
        keys.push(dataRequire[k]);
      });
      const params = { ...dataRequire };
      delete params.session;
      if (dataKey.includes("pagination")) {
        const limit = params?.pagination?.pageSize ?? 0;
        const offset =
          params?.pagination?.pageSize * (params?.pagination?.current - 1);
        delete params?.pagination;
        params.pagination = {
          take: limit,
          skip: offset,
        };
      }

      const config = {
        enabled: true,
        refetchOnWindowFocus: false,
        ...configParams,
      };

      const query: IQuery = {
        queryKey: [key, ...keys],
        queryFn:
          method === "POST"
            ? () =>
              FetcherPost({
                url: api,
                api: "API",
                data: params,
              })
            : () => FetcherGet({ url: api, api: "API" }),
        config,
      };

      // return useQuery(query.queryKey, query.queryFn, query.config);
      return useQuery({
        queryKey: query.queryKey,
        queryFn: query.queryFn,
        ...query.config,
      });
    };
  return {
    config: useConfig,
  };
};

export default useQueryHooks;
