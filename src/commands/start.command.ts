import {Command} from "./command.class";
import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {message} from "telegraf/filters";


export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((context) => {
            context.session.name = context.from.first_name;
            context.session.id = context.from.id;

            const welcomeText = 'Привет! Человек практически на 70% состоит из воды – она жизненно необходима. Мы теряем этот микроэлемент при каждом движении, даже когда спим и дышим. Баланс необходимо восполнять, но это нужно делать правильно. Оптимальное количество жидкости нормализует пищеварение, выводит шлаки, улучшает состояние кожи, волос. Я помогу тебе рассчитать суточную норму воды без учета чая, кофе, жидких блюд.'
            const startText = 'Начнем? Ответь на несколько вопросов. Для начала укажите свой пол';

            context.reply(welcomeText);

            setTimeout(() => {
                context.reply(startText, Markup.inlineKeyboard([
                    Markup.button.callback("Мужской", "male"),
                    Markup.button.callback("Женский", "female"),
                ]))
            }, 3000)

        })

        const weight = "Отлично, давайте продолжим. Укажите свой вес числом"

        this.bot.action("male", (context) => {
            context.session.sex = "male"
            context.reply(weight)
        })

        this.bot.action("female", (context) => {
            context.session.sex = "female"
            context.reply(weight)
        })

        const activity = "Отлично! Теперь укажите сколько часов в день вы проявляете физическую активность. Например активность во время работы, игр, выполнения домашней работы и занятия спортом "

        this.bot.on(message("text"), async (context) => {
            if (!context.session.weight) {

                const text = context.message.text

                if (text && !Number.isNaN(Number(text))) {
                    context.session.weight = Number(text)
                } else {
                    context.reply("Укажите свой вес");
                    return
                }

                context.reply(activity, Markup.inlineKeyboard([
                    Markup.button.callback("1 час", "1"),
                    Markup.button.callback("2 часа", "2"),
                    Markup.button.callback("3 часа", "3"),
                    Markup.button.callback("4 часа", "4"),
                    Markup.button.callback("5 часов", "5"),
                    Markup.button.callback("6 часов", "6"),
                ]))

            }
        });

        new Array(6).fill(0).forEach((_, index) => {
            this.bot.action(String(index + 1), (context) => {
                context.session.activity = index + 1

                const {weight, sex, activity} = context.session


                context.reply(
                    sex === "male" ?
                        `Ваша рекомендованная норма ${(weight * 0.03) + (activity * 0.5)} литра воды в день` :
                        `Ваша рекомендованная норма ${(weight * 0.025) + (activity * 0.4)} литра воды в день`
                )
            })
        })
    }
}