import "dotenv/config";
import fs from "node:fs";

import Config from "./Config.js";
import Cas from "./Cas.js";

const config = new Config().config;
const cert = fs.readFileSync(config.certFilePath, {
  encoding: "utf-8",
});
const key = fs.readFileSync(config.keyFilePath, {
  encoding: "utf-8",
});
const certName = `cert-${Date.now()}`;

await new Cas({
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
}).uploadUserCertificate({
  name: certName,
  cert,
  key,
});
