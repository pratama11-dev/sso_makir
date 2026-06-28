export interface ICalendar {
    id?: number;
    title?: string;
    start?: string;
    end?: string;
    start_event: string;
    end_event: string;
    user_event?: IUserEvent[]
  }

  export interface IUserEvent {
    user_id?: number
    event_id?: number
    event?:ICalendar
    user?: IUser
  }