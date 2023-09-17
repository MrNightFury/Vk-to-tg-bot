import { Telegraf } from "telegraf";
export class Tg {
    constructor(token, channel) {
        this.token = token;
        this.bot = new Telegraf(token);
        this.channel = channel;
    }
    sendMessage(text) {
        // console.log(this.channel);
        this.bot.telegram.sendMessage(this.channel, text);
        return true;
    }
}
