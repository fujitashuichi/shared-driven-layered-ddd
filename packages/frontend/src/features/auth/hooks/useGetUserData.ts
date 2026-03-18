import { getUserData } from "../api";
import type { AuthCtxType } from "../../../Context";
import { useState } from "react";

type Result = AuthCtxType["getUser"];

const errorMap = {
  UnAuthorized: "認証に失敗しました",
  InvalidData: "正しいデータを取得出来ませんでした",
  UnknownError: "エラーが発生しました"
} as const;

export const useGetUserData = (setUser: AuthCtxType["user"]["setUser"]) => {
  const [status, setStatus] = useState<Result["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const getUser: Result["getUser"] = async () => {
    setStatus("loading");

    const result = await getUserData();
    if (!result.ok) {
      setStatus("failed");
      setErrorMessage(errorMap[result.errorType]);
      return;
    }

    setUser(result.data);
  }


  return { getUser, status, errorMessage };
}
