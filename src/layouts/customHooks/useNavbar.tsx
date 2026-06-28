import { changeSidebarKey, InsertBreadcrumb } from "@redux/layout/action";
import configureReduxStore from "@redux/store";
import { useEffect } from "react";

const useNavbar = (
  key: string[],
  breadcrumb: { name: string; url: string }[]
) => {
  const { store } = configureReduxStore();

  useEffect(() => {
    store.dispatch(changeSidebarKey(key));
    store.dispatch(InsertBreadcrumb(breadcrumb));
    return () => {
      store.dispatch(InsertBreadcrumb([]));
    };
  }, [key, breadcrumb, store]);

  return false;
};

export default useNavbar;
