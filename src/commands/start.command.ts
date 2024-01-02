import {Command} from "./command.class";
import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((context) => {
            context.reply("Welcome", Markup.inlineKeyboard([
                Markup.button.callback("Add", "add"),
            ]))
        })
        this.bot.action("add", (context) => {
            context.session.name = "test";
            context.editMessageText("Added")
        })
    }
}