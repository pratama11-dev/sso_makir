import React from "react";

interface routeProperty {
  path: string;
  key: string;
  name: string;
}

interface route extends routeProperty {
  icon: React.ReactNode;
  children: routeProperty[];
}

export type routesType = route[];
