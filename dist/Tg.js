import { Telegraf } from "telegraf";
export class Tg {
    constructor(token, channel) {
        this.token = token;
        this.bot = new Telegraf(token);
        this.channel = channel;
    }
    sendMessage(message) {
        if (!message.hasAttachments()) {
            this.bot.telegram.sendMessage(this.channel, message.getText());
            return;
        }
        let waiting = [];
        if (message.getImages().length == 1) {
            waiting.push(this.bot.telegram.sendPhoto(this.channel, message.getImages()[0], {
                caption: message.getText()
            }));
        }
        else if (message.getImages().length > 1) {
            let photoGroup = [];
            for (let image of message.getImages()) {
                photoGroup.push({
                    type: "photo",
                    media: image
                });
            }
            photoGroup[0].caption = message.getText();
            waiting.push(this.bot.telegram.sendMediaGroup(this.channel, photoGroup));
        }
    }
    print(text) {
        // console.log(this.channel);
        this.bot.telegram.sendMessage(this.channel, text);
        return true;
    }
}
