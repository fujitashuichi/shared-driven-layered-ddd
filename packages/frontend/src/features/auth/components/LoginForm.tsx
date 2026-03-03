import type { SetStateAction } from "react";
import type { Status } from "./LoginContainer";
import { parseFormData } from "../../../lib";
import { LoginRequestSchema } from "@pkg/shared";
import { login } from "../api/login";
import { AppButton } from "../../../components";

// 原則、Container内部でのみ使用する

type Props = {
  setStatus: React.Dispatch<SetStateAction<Status>>
};

export function LoginForm({ setStatus }: Props) {
  const tryLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, LoginRequestSchema);

    if (!parsed.success) {
      // "loginSession"とすることで、余分な再読込を抑制する
      // (Formの再入力の際に、失敗や再ロードを経由させない)
      setStatus("loginSession");
      alert("入力値に不備があります");
      console.error(parsed.errorMessage);
      return;
    }

    const data = parsed.data;
    const isLoginSucceed = await login({ email: data.email, password:data.password });
    if (!isLoginSucceed) {
      setStatus("failed");
      return;
    }

    setStatus("success");
    return;
  }

  return (
    <form onSubmit={tryLogin}>
      <label htmlFor="email">email</label>
      <input name="email" type="email" required placeholder="example@email.com" />

      <label htmlFor="password">password</label>
      <input name="password" type="password" min={8} max={20} required placeholder="8～20字" />

      <AppButton variant="primary" type="submit">submit</AppButton>
    </form>
  )
}