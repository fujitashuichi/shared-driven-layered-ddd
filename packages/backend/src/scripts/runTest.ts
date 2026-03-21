import * as dotenv from "dotenv"
import { spawnSync } from "node:child_process";
import path from "node:path";
import { styleText } from "node:util";


const envPath = path.join(import.meta.dirname, "../../.env.test");
dotenv.config({ path: envPath });


const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Could not start test because DATABASE_URL was undefined");
else process.stdout.write(styleText(["green"], "ENV>> DATABASE_URL successfully loaded"));


const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

spawnSync(npxCommand, ['vitest', ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env }
});
