import { Telegraf } from "telegraf";
import { Message } from "./Message";
import { InputMediaPhoto } from "telegraf/typings/core/types/typegram";

export class Tg {
    token: string;
    bot: Telegraf;
    channel: number;

    constructor(token: string, channel: number) {
        this.token = token;
        this.bot = new Telegraf(token);
        this.channel = channel;
    }

    public sendMessage(message: Message) {
        if (!message.hasAttachments()) {
            this.bot.telegram.sendMessage(this.channel, message.getText());
            return;
        }

        let waiting = [];
        if (message.getImages().length == 1) {
            waiting.push(this.bot.telegram.sendPhoto(this.channel, message.getImages()[0], {
                caption: message.getText()
            }));
        } else if (message.getImages().length > 1) {
            let photoGroup: InputMediaPhoto[] = [];
            for (let image of message.getImages()) {
                photoGroup.push({
                    type: "photo",
                    media: image
                })
            }
            photoGroup[0].caption = message.getText();
            waiting.push(this.bot.telegram.sendMediaGroup(this.channel, photoGroup))
        }
    }

    public print(text: string) {
        // console.log(this.channel);
        this.bot.telegram.sendMessage(this.channel, text);
        return true;
    }
}