import { isSessionActive, logout } from "../api";
import type { AuthCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";

type Result = AuthCtxType["logout"];


export const useLogout = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const mutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: async (result) => {
      if (!result.ok) {
        setSessionStatus("active");
        alert("ログアウトできませんでした");
        return;
      }

      if (await isSessionActive()) {
        setSessionStatus("active");
        alert("ログアウトできませんでした");
        return;
      }

      setSessionStatus("inactive");
      alert("logoutしました");
      window.location.replace("/");
    },
    onError: () => alert("通信に失敗しました。時間をおいて再度お試しください。")
  });

  const tryLogout = async () => mutation.mutate();


  const status = mutation.status === "success" ? "loggedOut" : mutation.status;

  return { status: status, logout: tryLogout }
}
