import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";
import { RegisterRequestSchema, type RegisterRequest } from "@pkg/shared";
import type { AuthCtxType } from "../../../Context";
import { parseFormData } from "../../../lib";


type Result = AuthCtxType["register"];

const errorMap = {
  AlreadyRegistered: "登録済のアカウントです",
  GetTokenFailed: "認証トークンの取得に失敗しました",
  UnknownError: "エラーが発生しました"
} as const;

const formDataSchema = RegisterRequestSchema.extend({
  passwordConfirm: z.string().min(8).max(20)
});


export const useRegister = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const mutation = useMutation({
    mutationFn: (body: RegisterRequest) => register(body),
    onSuccess: (result) => {
      if (!result.ok) {
        setSessionStatus("inactive");
        alert(errorMap[result.errorType]);
        return;
      }
      setSessionStatus("active");
      alert("登録完了");
    },
    onError: () => alert("通信に失敗しました。時間をおいて再度お試しください。")
  });


  const tryRegister = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData:FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, formDataSchema);
    if (!parsed.success) {
      alert("入力値が正しくありません");
      return;
    }

    const data = parsed.data;
    if (data.password !== data.passwordConfirm) {
      alert("パスワード確認が一致しません");
      return;
    }

    mutation.mutate({ ...data });
  }

  return { status: mutation.status, register: tryRegister }
}
