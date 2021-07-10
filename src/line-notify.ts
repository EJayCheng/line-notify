import { map } from "bluebird";
import { post } from "request-promise";
import { LineNotifyMessage } from "./line-notify.dto";

const NOTIFY_URL = "https://notify-api.line.me/api/notify";
const STATUS_URL = "https://notify-api.line.me/api/status";
export class LineNotify {
  private tokenSet = new Set<string>();
  public constructor(tokens: string[] | string = []) {
    this.registerToken(tokens);
  }

  private overflowText(
    text: string,
    max: number = 1000,
    suffix: string = "……"
  ): string {
    if (text.length <= max) return text;
    if (max <= suffix.length) {
      return text.slice(0, max);
    } else {
      return text.slice(0, max - suffix.length) + suffix;
    }
  }

  public registerToken(token: string | string[]): void {
    if (token instanceof Array) {
      token
        .filter((s) => typeof s === "string" && !!s)
        .forEach((t) => this.tokenSet.add(t.trim()));
    } else if (typeof token === "string" && token) {
      this.tokenSet.add(token.trim());
    }
  }

  public unregisterToken(token: string | string[]): void {
    if (token instanceof Array) {
      token
        .filter((s) => typeof s === "string" && !!s)
        .forEach((t) => this.tokenSet.delete(t.trim()));
    } else if (typeof token === "string" && token) {
      this.tokenSet.delete(token.trim());
    }
  }

  private get tokens(): string[] {
    return Array.from(this.tokenSet.values());
  }

  public async send(formData: LineNotifyMessage | string): Promise<boolean> {
    if (typeof formData === "string") {
      formData = { message: formData } as LineNotifyMessage;
    }
    if (!formData) return false;
    if (!formData.message) return false;
    if (typeof formData.message !== "string") return false;
    formData.message = this.overflowText(formData.message);
    return map(
      this.tokens,
      async (token) => {
        if (typeof token !== "string") return;
        return this.notify(token, formData as LineNotifyMessage);
      },
      { concurrency: 10 }
    )
      .then((res) => true)
      .catch((err) => false);
  }

  private async notify(
    bearer: string,
    formData: LineNotifyMessage
  ): Promise<boolean> {
    if (!bearer) return false;
    return post(NOTIFY_URL, {
      resolveWithFullResponse: true,
      headers: {
        "Content-Type": "	application/x-www-form-urlencoded",
      },
      auth: {
        bearer,
      },
      formData,
    })
      .then((res) => true)
      .catch((error) => {
        console.error("Error LineNotify.notify:", { bearer, formData, error });
        return false;
      });
  }
}
