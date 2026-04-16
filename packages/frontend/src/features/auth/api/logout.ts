import { signOut } from "next-auth/react";
import type { LogoutResult } from "./types";

export const logout = async (): Promise<LogoutResult> => {
  try {
    await signOut({
      redirect: false,
    });

    return {
      ok: true
    }
  } catch(err: unknown) {
    console.error("failed to signOut:", err);
    return {
      ok: false
    }
  }
}
