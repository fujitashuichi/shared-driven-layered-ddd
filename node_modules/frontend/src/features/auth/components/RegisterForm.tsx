import z from "zod";
import { registerUser } from "../api/register";
import { parseFormData } from "../../../lib";
import type React from "react";
import { RegisterRequestSchema } from "@pkg/shared";


const formDataSchema = RegisterRequestSchema.extend({
  passwordConfirm: z.string().min(8).max(20)
});


export function RegisterForm() {
  const register = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
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
    const result = await registerUser({ email: data.email, password: data.password  });
    if (!result.ok) {
      console.error(result.error);
      alert("登録に失敗しました");
      return;
    }
    alert("登録完了");
  }

  return (
    <form onSubmit={(e) => register(e)}>
      <label htmlFor="email">email</label>
      <input name="email" type="email" required placeholder="example@email.com" />

      <label htmlFor="password">password</label>
      <input name="password" type="password" required min={8} max={20} placeholder="8～20字" />

      <label htmlFor="passwordConfirm">type password again</label>
      <input name="passwordConfirm" type="password" required min={8} max={20} placeholder="8～20字" />

      <button type="submit">submit</button>
    </form>
  )
}
