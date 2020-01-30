import { Injectable, Inject } from "@nestjs/common";
import { LineNotifyMessage, LineNotify } from "./line-notify";

export const LINE_NOTIFY_TOKEN = "LINE_NOTIFY_TOKEN";

@Injectable()
export class LineNotifyService {
  public notify = new LineNotify();

  public constructor(
    @Inject(LINE_NOTIFY_TOKEN)
    public token: string
  ) {
    this.notify.token = token;
  }

  public setToken(token: string) {
    this.notify.token = token;
  }

  public async send(data: LineNotifyMessage): Promise<boolean> {
    return this.notify.send(data);
  }
}
