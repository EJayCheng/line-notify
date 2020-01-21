import { post } from "request-promise";

export interface LineNotifyMessage {
  /** 1000 characters max */
  message: string;
  /** Maximum size of 240×240px JPEG, HTTP/HTTPS URL */
  imageThumbnail?: string;
  /** Maximum size of 2048×2048px JPEG, HTTP/HTTPS URL */
  imageFullsize?: string;
  /** 	
    Upload a image file to the LINE server.
    Supported image format is png and jpeg.

    If you specified imageThumbnail ,imageFullsize and imageFile, imageFile takes precedence.

    There is a limit that you can upload to within one hour.
    For more information, please see the section of the API Rate Limit.
  */
  imageFile?: File;
  /** https://devdocs.line.me/files/sticker_list.pdf */
  stickerPackageId?: number;
  stickerId?: number;
  /** 
    true: The user doesn't receive a push notification when the message is sent.

    false: The user receives a push notification when the message is sent (unless they have disabled push notification in LINE and/or their device).

    If omitted, the value defaults to false. 
  */
  notificationDisabled?: boolean;
}

const NOTIFY_URL = "https://notify-api.line.me/api/notify";

export class LineNotify {
  public constructor(public token?: string) {}
  private overflowText(
    text: string,
    max: number = 1000,
    suffix: string = "..."
  ): string {
    if (text.length <= max) return text;
    if (max <= suffix.length) {
      return text.slice(0, max);
    } else {
      return text.slice(0, max - suffix.length) + suffix;
    }
  }
  public async send(formData: LineNotifyMessage): Promise<boolean> {
    if (!formData) return false;
    if (!formData.message || typeof formData.message !== "string") return false;
    formData.message = this.overflowText(formData.message);
    return post(NOTIFY_URL, {
      resolveWithFullResponse: true,
      headers: {
        "Content-Type": "	application/x-www-form-urlencoded"
      },
      auth: {
        bearer: this.token
      },
      formData
    })
      .then(r => true)
      .catch(err => false);
  }
}

let notify = new LineNotify();
notify.token = "ssodjXHcAg03lmxIAR0fLEFSbTnatr1y9Rtv18Y2SYv";
notify.send({ message: "wtf" });
