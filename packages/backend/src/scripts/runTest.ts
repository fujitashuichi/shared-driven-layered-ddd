import * as dotenv from "dotenv"
import { spawnSync } from "node:child_process";
import path from "node:path";
import { styleText } from "node:util";


const envPath = path.join(import.meta.dirname, "../../.env.test");
dotenv.config({ path: envPath });

const prismaConfigPath = path.join(import.meta.dirname, "../prisma.config");
process.stdout.write(styleText(
  ["gray"],
  `prisma.config.ts: ${prismaConfigPath}\n`
));

const vitestConfigPath = path.join(import.meta.filename, "../../vitest.config.ts");
process.stdout.write(styleText(
  ["gray"],
  `vitest.config.ts: ${vitestConfigPath}\n`
));


const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("Could not start test because DATABASE_URL was undefined");
else process.stdout.write(styleText(["green"], "ENV>> DATABASE_URL successfully loaded\n"));


const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

// コマンド失敗時に強制throeする関数
const execute = (args: string[]) => {
  const result = spawnSync(npxCommand, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) throw new Error(`Command failed>> cleanUpDb failed with status ${result.status}\n`);
};


const runCommand = () => {
  try {
    // テスト前にDBをクリーンアップ
    execute(["prisma", "generate", ...process.argv.slice(3)]);
    execute(["prisma", "db", "push", "--config", "./src/prisma.config.ts", ...process.argv.slice(5)]);

    process.stdout.write(styleText(
      ["green"],
      "Init_DB>> successfully cleaned up\n"
    ));


    // vitest
    console.log("running vitest...");
    const vitest = spawnSync(
      npxCommand,
      ['vitest', '--config', vitestConfigPath, ...process.argv.slice(4)],
      {
        stdio: "inherit",
        shell: process.platform === "win32",
        env: { ...process.env }
      }
    );

    if (vitest.status !== 0) {
      process.exitCode = vitest.status ?? 1;
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(styleText("red", e.message));
      process.exit(1);
    }
    throw e;
  } finally {
    // DBクリーンアップ
    console.info("Cleaning up database...\n");

    execute(["prisma", "migrate", "reset", "--force", "--config", prismaConfigPath]);

    process.stdout.write(styleText(
      ["blueBright", "green"],
      "DB successfully cleaned up\n"
    ));
  }
}


runCommand();
