import { getUserData } from "../../api";
import type { AuthCtxType } from "../../../../Context";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";


type Result = AuthCtxType["getUser"];

const errorMap = {
  UnAuthorized: "認証に失敗しました",
  InvalidData: "正しいデータを取得出来ませんでした",
  UnknownError: "エラーが発生しました"
} as const;


export const useGetUserData = (setUser: AuthCtxType["useUser"]["setUser"]): Result => {
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const mutation = useMutation({
    mutationFn: () => getUserData(),
    onSuccess: (result) => {
      if (!result.ok) return setErrorMessage(errorMap[result.errorType]);

      setUser(result.data);
    }
  });


  const getUser: Result["getUser"] = async () => mutation.mutate();


  return { status: mutation.status, errorMessage, getUser };
}
