import { AppButton } from "../../../components";
import { useAuthCtx } from "../../../Context";


export function LoginForm() {
  const { login } = useAuthCtx();
  const { login: tryLogin } = login;

  return (
    <form onSubmit={tryLogin}>
      <label htmlFor="email">email</label>
      <input name="email" type="email" required autoComplete="email" placeholder="example@email.com" />

      <label htmlFor="password">password</label>
      <input name="password" type="password" min={8} max={20} required autoComplete="current-password" placeholder="8～20字" />

      <AppButton variant="primary" type="submit">submit</AppButton>
    </form>
  )
}