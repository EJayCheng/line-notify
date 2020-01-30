import { LineNotifyMessage, LineNotify } from "./line-notify";
export declare const LINE_NOTIFY_TOKEN = "LINE_NOTIFY_TOKEN";
export declare class LineNotifyService {
    token: string;
    notify: LineNotify;
    constructor(token: string);
    setToken(token: string): void;
    send(data: LineNotifyMessage): Promise<boolean>;
}
