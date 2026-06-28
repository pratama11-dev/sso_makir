export interface SsoPermissions {
  permission_key?: string;
  permission_name?: string;
  permission_description?: string;
}

export interface SsoPlatforms {
  id?: number;
  name?: string;
  client_id?: string;
}

export interface SsoRolePermission {
  sso_permissions?: SsoPermissions;
}

export interface SsoRoles {
  id?: number;
  roles_name?: string;
  sso_role_permissions?: SsoRolePermission[];
}

export interface SsoUserRolesPlatformPivot {
  sso_roles?: SsoRoles;
  sso_platforms?: SsoPlatforms;
}

export interface Data {
  user_role: {
    id?: number
    role?: string
  }
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  created_at?: null;
  updated_at?: string;
  last_login?: string;
  last_logout?: null;
}

export interface Sessions {
  code?: number;
  info?: string;
  data?: {
    user?: User;
    type?: string;
    data?: Data;
  };
  token?: any | undefined;
}
