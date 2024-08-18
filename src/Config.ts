import fs from "node:fs";
import YAML from "yaml";
import { z } from "zod";
import { fileURLToPath } from "node:url";

interface ConfigI {
  accessKeyId: string;
  accessKeySecret: string;
  certFilePath: string;
  keyFilePath: string;
}

export default class Config {
  config: ConfigI;

  constructor() {
    this.config = this.parseConfig();
  }

  private parseConfig() {
    const file = fs.readFileSync(fileURLToPath(new URL("../config.yml", import.meta.url)), "utf8");
    const tmp = YAML.parse(file) as Partial<Omit<ConfigI, "accessKeyId" | "accessKeySecret">>;
    const config: Partial<ConfigI> = {
      ...tmp,
      accessKeyId: process.env.ACCESS_KEY_ID,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
    };

    const configSchema = z.object({
      accessKeyId: z.string(),
      accessKeySecret: z.string(),
      certFilePath: z.string(),
      keyFilePath: z.string(),
    });

    return configSchema.parse(config);
  }
}
