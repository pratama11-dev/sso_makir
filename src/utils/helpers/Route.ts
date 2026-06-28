import { NonDashboardRoutes } from "@configs/route/NonDashboardRoutes";
import Router, { NextRouter } from "next/router";

export const isNotDashboard = (router: NextRouter) => NonDashboardRoutes.includes(router?.pathname ?? "/");

export const PushNavigateTo = async (routes: string) => {
  Router.push(routes);
};

export const ReplaceNavigateTo = async (routes: string) => {
  Router.replace(routes);
};
