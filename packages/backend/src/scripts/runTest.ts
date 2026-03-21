import * as dotenv from "dotenv"
import { spawnSync } from "node:child_process";

dotenv.config({ path: "../../.env.test" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Could not start test because DATABASE_URL was undefined");


spawnSync('tsx', ['vitest', ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env }
});
