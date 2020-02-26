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
export declare class LineNotify {
    tokens: string[];
    constructor(tokens?: string[]);
    private overflowText;
    send(formData: LineNotifyMessage): Promise<boolean>;
    private notify;
}
