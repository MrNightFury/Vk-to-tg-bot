import * as VK from "vk-io";
import { Logger } from "./Logger.js";

type Context = VK.MessageContext<VK.ContextDefaultState>;

export class Vk {
    private key: string;
    // private bot: VKBot;
    private bot: VK.VK;

    public constructor(key: string) {
        this.key = key;
        // this.bot = new VKBot(key);
        this.bot = new VK.VK({
            token: this.key
        })
    }

    // public addHandler(handler: (ctx: VkBotContext) => Promise<boolean>) {
    public addHandler(handler: (ctx: Context) => Promise<boolean>) {
        this.bot.updates.on('message', ctx => {
            Logger.log("Message got");
            handler(ctx).then(result => {
                console.log("Message processed")
            });
        })
    }

    public start() {
        this.bot.updates.start()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
}