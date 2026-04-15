import { SessionResponse } from "@pkg/shared";
import { type User as AppUser } from "@pkg/shared";


declare module "@auth/core/types" {
  interface Session {
    user: SessionResponse;
  }
}
