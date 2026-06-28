// import { IOrderItem } from "../event"

export interface ITicket {
    id?: number;
    id_order_item?: number;
    qr_code?: string;
    ticket_owner?: string;
    scan_at?: string
    doc_ticket_owner?: string;
    is_active?: number;
    price?: string;
    order_item?: IOrderItem;
}

export interface IOrderItem {
    id?: number;
    id_order?: number;
    id_ticket?: number;
    id_event?: number;
    type_ticket?: string;
    price?: string;
    created_at?: Date;
    updated_at?: null;
    orders?: IOrders;
    event?: IEvent;
}

export interface IEvent {
    id?: number;
    id_status?: number;
    name?: string;
    event_date?: Date;
    create_at?: null;
    updated_at?: null;
}

export interface IOrders {
    id?: number;
    id_user?: number;
    id_status?: number;
    total_amount?: number;
    remark?: null;
    total_price?: string;
    created_at?: Date;
    updated_at?: null;
    order_status?: {
        status?: string,
        id?: number
    }
    user?: {
        name: string,
        no_document: string
        email: string
    }
}
