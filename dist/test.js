"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var line_notify_1 = require("./line-notify");
var notify = new line_notify_1.LineNotify(["bmyGyGwpLV2eLSPWvoFI0x64TgB6m3CThykEC2dIPGW"]);
notify.send({ message: "text" }).then(console.log).catch(console.error);
