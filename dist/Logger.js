import { Tg } from "./Tg.js";
export var LogTypes;
(function (LogTypes) {
    LogTypes["LOG"] = "LOG";
    LogTypes["DEBUG"] = "DEBUG";
    LogTypes["WARN"] = "WARN";
})(LogTypes || (LogTypes = {}));
export class Logger {
    static setup(config) {
        this.isDev = config.isDev;
        if (!this.isDev && config.key && config.channel) {
            this.logChanel = new Tg(config.key, config.channel);
        }
    }
    static send(type, text) {
        text = `[${type}] ` + text;
        if (type == LogTypes.WARN) {
            console.warn(text);
        }
        else {
            console.log(text);
        }
        if ((type == LogTypes.WARN || type == LogTypes.LOG) && !this.isDev && this.logChanel) {
            this.logChanel.print(text);
        }
    }
    static log(text) {
        this.send(LogTypes.LOG, text);
    }
    static warn(text) {
        this.send(LogTypes.WARN, text);
    }
}
Logger.isDev = true;
