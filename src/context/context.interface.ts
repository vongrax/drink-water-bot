import {Context} from "telegraf";

export interface Session {
    id: string | number
    name: string;
    sex: string;
    weight: number;
    activity: number;
}

export interface IBotContext extends Context{
    session: Session
}