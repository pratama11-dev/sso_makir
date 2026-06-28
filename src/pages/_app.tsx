import "../styles/globals.css";
// import "antd/dist/antd.css";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import configureReduxStore from "@redux/store";
import themeColor from "@configs/theme/themeColor";
import { showError } from "@utils/helpers/AntdHelper";
import useAuth from "@api/customHooks/useAuth";
import { ConfigProvider } from "antd";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function handlingError(err: any, handleLogout: () => void) {
  if (err?.response?.data === "Unauthorized") {
    handleLogout();
  }
  if (err?.response?.status === 403) {
    showError(
      "Error!",
      err?.response?.data?.info
        ?? err?.response?.data?.message
        ?? "you dont have permissions to access that page!"
    );
    return;
  }
  console.error(err?.response);
  showError(
    "Error!",
    err?.response?.data?.info
      ?? err?.response?.data?.message
      ?? err?.message
      ?? "Server Error!"
  );
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement | ReactNode) => page);
  const { store, persistor } = configureReduxStore();
  const { handleLogout } = useAuth();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // handling error
        onError: async (err) => {
          handlingError(err, handleLogout);
        },
      },
      mutations: {
        // handling error
        onError: async (err) => {
          handlingError(err, handleLogout);
        },
      },
    },
  });

  return getLayout(
    <ConfigProvider>
      <NextNProgress color={themeColor.darkBlueSecondary} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            {process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
            <Component {...pageProps} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}
