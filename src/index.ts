import "dotenv/config";
import fs from "node:fs";

import Config from "./Config.js";
import Cas from "./Cas.js";
import CDN from "./CDN.js";

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
console.log(`Uploaded certificate: ${certName}`);

await new CDN({
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
}).batchSetCdnDomainServerCertificate({
  domainName: config.cdnDomainNames.join(","),
  sslProtocal: "on",
  certName,
  certType: "cas",
});
console.log(`Applied certificate to CDN: ${certName}`);
