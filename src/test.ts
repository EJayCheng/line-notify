import { LineNotify } from "./line-notify";

let notify = new LineNotify(["bmyGyGwpLV2eLSPWvoFI0x64TgB6m3CThykEC2dIPGW"]);

notify.send({ message: "text" }).then(console.log).catch(console.error);
