import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuth } from "../../../Context";


export function RegisterForm() {
  const { register } = useAuth();
  const { register: tryRegister, status } = register;

  return (<>
    {
      status === "idle" &&
      <form onSubmit={tryRegister}>
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
      status === "pending" && (
        <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
      )
    }
  </>)
}
