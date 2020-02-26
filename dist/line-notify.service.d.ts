import { LineNotify, LineNotifyMessage } from "./line-notify";
export declare const LINE_NOTIFY_TOKEN = "LINE_NOTIFY_TOKEN";
export declare class LineNotifyService {
    token: string[];
    lineNotify: LineNotify;
    constructor(token?: string[]);
    setToken(tokens?: string[]): void;
    send(data: LineNotifyMessage): Promise<boolean>;
}
