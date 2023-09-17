export interface Config {
    tg: {
        token: string,
        channel: number,
    }
    vk: {
        key: string
    }
    log: LogConfig
}

export interface LogConfig {
    isDev: boolean,
    key: string,
    channel: number
}