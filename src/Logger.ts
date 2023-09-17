import { LogConfig } from "./config";
import { Tg } from "./Tg.js";

export enum LogTypes {
    LOG = "LOG",
    DEBUG = "DEBUG",
    WARN = "WARN",
}

export class Logger {
    private static isDev: boolean = true;
    private static logChanel: Tg;

    public static setup(config: LogConfig) {
        this.isDev = config.isDev;
        if (!this.isDev && config.key && config.channel) {
            this.logChanel = new Tg(config.key, config.channel);
        }
    }
    
    public static send(type: LogTypes, text: string) {
        text = `[${type}] ` + text;

        if (type == LogTypes.WARN) {
            console.warn(text);
        } else {
            console.log(text);
        }
        
        if ((type == LogTypes.WARN || type == LogTypes.LOG) && !this.isDev && this.logChanel) {
            this.logChanel.print(text);
        }
    }

    public static log(text: string) {
        this.send(LogTypes.LOG, text);
    }

    public static warn(text: string) {
        this.send(LogTypes.WARN, text);
    }
}