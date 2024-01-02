import {Context} from "telegraf";

export interface Session {
    id: string
    name: string
}

export interface IBotContext extends Context{
    session: Session
}