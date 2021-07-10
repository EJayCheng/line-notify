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
  /** https://devdocs.line.me/files/sticker_list.pdf */
  stickerId?: number;
  /** 
    true: The user doesn't receive a push notification when the message is sent.

    false: The user receives a push notification when the message is sent (unless they have disabled push notification in LINE and/or their device).

    If omitted, the value defaults to false. 
  */
  notificationDisabled?: boolean;
}

export type LineNotifyTokenTargetType = "USER" | "GROUP";

export interface LineNotifyTokenStatus {
  /**
   * 	Value according to HTTP status code
   *  - 200: Success・Access token valid
   *  - 401: Invalid access token
   */
  status: number;

  /** Message visible to end-user */
  message: string;

  /**
   * If the notification target is a user: "USER"
   *
   * If the notification target is a group: "GROUP"
   */
  targetType: LineNotifyTokenTargetType;

  /**
   * If the notification target is a user, displays user name. If acquisition fails, displays "null."
   *
   * If the notification target is a group, displays group name. If the target user has already left the group, displays "null."
   */
  target: string;
}
