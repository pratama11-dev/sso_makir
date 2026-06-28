import { User } from "types/Session"

export interface IOrder {
    id?: string
    id_user?: number
    id_status?: number
    total_amount?: string
    total_price?: string
    created_at?: string
    updated_at?: string
    order_item?: IOrderItem[]
    user?: Pick<User, "name">;
    // order_status order_status?
}

export interface IOrderItem {
    id?: number
    id_order?: number
    id_ticket?: number
    id_event?: number
    created_at?: string
    updated_at?: string
    tickets?: ITicket
    event?: IEvent
    orders?: IOrder
}

export interface IOrderStatus {
    id?: number
    name?: string
}