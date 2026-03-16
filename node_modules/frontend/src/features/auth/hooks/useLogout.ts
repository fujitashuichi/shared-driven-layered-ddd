import { useState } from "react";
import { logout } from "../api";
import type { AuthCtxType } from "../../../Context";

type Result = AuthCtxType["logout"];


export const useLogout = (useSession: AuthCtxType["session"]): Result => {
  const [status, setStatus] = useState<Result["status"]>("idle");

  const tryLogout = async () => {
    setStatus("loading");
    const isLoggedOut = await logout();
    if (!isLoggedOut) {
      setStatus("idle");
      alert("ログアウトできませんでした");
      return;
    }

    useSession.setStatus("idle");
    setStatus("loggedOut");
    alert("logoutしました");
  }


  return {
    status: status,
    logout: tryLogout
  }
}
