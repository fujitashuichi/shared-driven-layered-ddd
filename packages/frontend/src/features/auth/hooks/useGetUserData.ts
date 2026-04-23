import { getUserData } from "../api";
import type { AuthCtxType } from "../../../Context";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";


type Result = AuthCtxType["getUser"];

const errorMap = {
  UnAuthorized: "認証に失敗しました",
  InvalidData: "正しいデータを取得出来ませんでした",
  Unknown: "エラーが発生しました"
} as const;


export const useGetUserData = (setUser: AuthCtxType["useUser"]["setUser"]): Result => {
  const [overrideStatus, setOverrideStatus] = useState<"error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const mutation = useMutation({
    mutationFn: () => getUserData(),
    onSuccess: (result) => {
      if (!result.success) {
        setErrorMessage(errorMap[result.errorType]);
        setOverrideStatus("error");
        return;
      }
      setUser(result.data);
    },
    onError: () => alert("通信に失敗しました。時間をおいて再度お試しください。\n※学習用なのでSupabaseが停止していることがあります")
  });


  const getUser: Result["getUser"] = async () => mutation.mutate();


  const trulyStatus = overrideStatus ?? mutation.status;

  return { status: trulyStatus, errorMessage, getUser };
}
