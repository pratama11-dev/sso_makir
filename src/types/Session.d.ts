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
  user_app_role?: {
    app_role?: {
      id: number
      id_app: number
      role_code: string
      role_name: string
      created_at: string
      created_by: string
      app: {
        id: number
        app_key: string
        app_name: string
        base_url: string
        is_active: boolean
        created_at: string
        created_by: string
      }
    }
  }[]
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
