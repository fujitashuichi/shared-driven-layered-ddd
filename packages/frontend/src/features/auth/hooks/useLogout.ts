import { logout as logoutApi } from "../api";
import type { AuthCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";

type Result = AuthCtxType["logout"];


export const useLogout = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const mutation = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: (isLoggedOut) => {
      if (!isLoggedOut.success) {
        setSessionStatus("active");
        alert("ログアウトできませんでした");
        return;
      }
      setSessionStatus("inactive");
      alert("logoutしました");
      window.location.replace("/");
    },
    onError: () => alert("通信に失敗しました。時間をおいて再度お試しください。\n※学習用なのでSupabaseが停止していることがあります")
  });

  const logout = async () => mutation.mutate();


  const status = mutation.status === "success" ? "loggedOut" : mutation.status;

  return { status, logout }
}
