import * as VK from "vk-io";
import { Logger } from "./Logger.js";
export class Vk {
    constructor(key) {
        this.key = key;
        // this.bot = new VKBot(key);
        this.bot = new VK.VK({
            token: this.key
        });
    }
    // public addHandler(handler: (ctx: VkBotContext) => Promise<boolean>) {
    addHandler(handler) {
        this.bot.updates.on('message', ctx => {
            Logger.log("Message got");
            handler(ctx).then(result => {
                console.log("Message processed");
            });
        });
    }
    start() {
        this.bot.updates.start()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
}
