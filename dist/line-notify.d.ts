import { LineNotifyMessage } from "./line-notify.dto";
export declare class LineNotify {
    private tokenSet;
    constructor(tokens?: string[] | string);
    private overflowText;
    registerToken(token: string | string[]): void;
    unregisterToken(token: string | string[]): void;
    private get tokens();
    send(formData: LineNotifyMessage | string): Promise<boolean>;
    private notify;
}
