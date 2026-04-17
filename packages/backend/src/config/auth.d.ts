import { SessionResponse } from "@pkg/shared";

declare module "@auth/core/types" {
  interface Session {
    user: SessionResponse & DefaultSession["user"];
  }

  interface User {
    createdAt?: SessionResponse["createdAt"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    createdAt?: SessionResponse["createdAt"];
  }
}
