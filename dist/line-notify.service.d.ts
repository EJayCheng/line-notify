import { LineNotifyMessage } from "./line-notify.dto";
export declare const LINE_NOTIFY_TOKEN = "LINE_NOTIFY_TOKEN";
export declare class LineNotifyService {
    private lineNotify;
    constructor(token?: string | string[]);
    registerToken(tokens?: string | string[]): void;
    unregisterToken(tokens?: string | string[]): void;
    send(data: string | LineNotifyMessage): Promise<boolean>;
}
