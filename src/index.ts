import { Config } from "./config.js";
import { Tg } from "./Tg.js";
import fs from "node:fs";
import { Vk } from "./vk.js";
import { PhotoAttachment } from "vk-io";
import { LogTypes, Logger } from "./Logger.js";
import { Message } from "./Message.js";


var config = JSON.parse(fs.readFileSync("./config.json", "utf8")) as Config;
Logger.setup(config.log);

Logger.log(JSON.stringify(config, null, 2));

var tg = new Tg(config.tg.token, config.tg.channel);
var vk = new Vk(config.vk.key);

vk.addHandler(ctx => {
    let message = new Message()
        .setText(ctx.text);
    let unsuppertedAttachmentsCount = 0;
    for (let attachment of ctx.attachments) {
        switch (attachment.type) {
            case "photo": {
                let photo = attachment as PhotoAttachment;
                message.addPhoto(photo.largeSizeUrl || "");
                break;
            }
            default: {
                message.incrementUnsupportedCounter();
                unsuppertedAttachmentsCount++;
                Logger.warn(JSON.stringify(attachment.type, null, 2));
            }
        }
    }

    if (unsuppertedAttachmentsCount) {
        Logger.warn(`Unsupported attachments count: ${unsuppertedAttachmentsCount}`);
    }
    if (message.isCorrect()) {
        tg.sendMessage(message);

    }
    
    return new Promise<boolean>(() => false);
})
Logger.log("Starting vk...");
vk.start();