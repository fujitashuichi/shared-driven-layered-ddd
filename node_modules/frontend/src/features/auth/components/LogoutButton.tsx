import type React from "react"
import { AppButton } from "../../../components"
import { logout } from "../api";
import { useState } from "react";
import { AppLoadingBar } from "../../../components/AppLoadingBar";

type Status = "loading" | "default";

export function LogoutButton() {
  const [status, setStatus] = useState<Status>("default");
  const tryLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setStatus("loading");
    const isLoggedOut = await logout();
    if (!isLoggedOut) {
      setStatus("default");
      alert("ログアウトできませんでした");
      return;
    }
    setStatus("default");
    alert("logoutしました");
  }

  return (<>
    {
      status === "default" && (
      <AppButton variant="danger" onClick={tryLogout}>Logout</AppButton>
    )}
    {
      status === "loading" && (
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    )}
  </>)
}
