import { IApplication } from "types/apps"

export interface IAppRoles {
    id: number
    id_app: number
    role_code: string
    role_name: string
    created_at: string
    created_by: string
    total_user: number
    app: IApplication
    user_app_role: IUserAppRole[]
}

export interface IUserAppRole {
    id: number
    id_user: number
    id_app_role: number
    granted_at: string
}
