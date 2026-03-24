import { RegisterDto } from "./types/types.dto.ts";

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly NODE_FE_URL: string;
    readonly NODE_BE_URL: string;
    readonly NODE_JWT_SECRET: string;
    readonly DATABASE_URL: string;
  }
}
