import { Inject, Injectable } from "@nestjs/common";
import { LineNotify } from "./line-notify";
import { LineNotifyMessage } from "./line-notify.dto";

export const LINE_NOTIFY_TOKEN = "LINE_NOTIFY_TOKEN";

@Injectable()
export class LineNotifyService {
  private lineNotify = new LineNotify();

  public constructor(@Inject(LINE_NOTIFY_TOKEN) token: string | string[] = []) {
    this.lineNotify.registerToken(token);
  }

  public registerToken(tokens: string | string[] = []) {
    this.lineNotify.registerToken(tokens);
  }

  public unregisterToken(tokens: string | string[] = []) {
    this.lineNotify.unregisterToken(tokens);
  }

  public async send(data: string | LineNotifyMessage): Promise<boolean> {
    return this.lineNotify.send(data);
  }
}
