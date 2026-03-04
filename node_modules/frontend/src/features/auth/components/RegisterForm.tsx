import z from "zod";
import { registerUser } from "../api/register";
import { parseFormData } from "../../../lib";
import type React from "react";
import { RegisterRequestSchema } from "@pkg/shared";
import { AppButton } from "../../../components";
import { useState } from "react";
import { AppLoadingBar } from "../../../components/AppLoadingBar";

// Containerでラップする際は、登録再試行でストレスがないことを前提とする

const formDataSchema = RegisterRequestSchema.extend({
  passwordConfirm: z.string().min(8).max(20)
});

type Status = "loading" | "default";

export function RegisterForm() {
  const [status, setStatus] = useState<Status>("default")

  const errorMap = {
    AlreadyRegistered: "登録済のアカウントです",
    GetTokenFailed: "申し訳ありません。認証トークンの取得に失敗しました",
    UnknownError: "申し訳ありません。エラーが発生しました"
  } as const;

  const register = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setStatus("loading");

    const formData:FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, formDataSchema);
    if (!parsed.success) {
      setStatus("default");
      alert("入力値が正しくありません");
      return;
    }

    const data = parsed.data;
    if (data.password !== data.passwordConfirm) {
      setStatus("default");
      alert("パスワード確認が一致しません");
      return;
    }

    const result = await registerUser({ email: data.email, password: data.password  });
    if (!result.ok) {
      setStatus("default");
      alert(errorMap[result.errorType]);
      return;
    }

    setStatus("default");
    alert("登録完了");
  }

  return (<>
    {
      status === "default" &&
      <form onSubmit={register}>
        <label htmlFor="email">email</label>
        <input name="email" type="email" required autoComplete="address-level3" placeholder="example@email.com" />

        <label htmlFor="password">password</label>
        <input name="password" type="password" required min={8} max={20} autoComplete="new-password" placeholder="8～20字" />

        <label htmlFor="passwordConfirm">type password again</label>
        <input name="passwordConfirm" type="password" required min={8} max={20} autoComplete="new-password webauthn" placeholder="8～20字" />

        <AppButton variant="primary" type="submit">submit</AppButton>
      </form>
    }
    {
      status === "loading" && (
        <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
      )
    }
  </>)
}
