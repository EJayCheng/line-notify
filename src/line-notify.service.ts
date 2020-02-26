import { Inject, Injectable } from "@nestjs/common";
import { LineNotify, LineNotifyMessage } from "./line-notify";

export const LINE_NOTIFY_TOKEN = "LINE_NOTIFY_TOKEN";

@Injectable()
export class LineNotifyService {
  public lineNotify = new LineNotify();

  public constructor(
    @Inject(LINE_NOTIFY_TOKEN)
    public token: string[] = []
  ) {
    this.lineNotify.tokens = token;
  }

  public setToken(tokens: string[] = []) {
    this.lineNotify.tokens = tokens;
  }

  public async send(data: LineNotifyMessage): Promise<boolean> {
    return this.lineNotify.send(data);
  }
}
