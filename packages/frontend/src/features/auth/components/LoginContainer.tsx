import { LoginForm } from "./LoginForm";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuth } from "../../../Context";

export function LoginContainer() {
  const { login } = useAuth();
  const { status } = login;

  return (
    <div>
      {status === "idle" && <LoginForm />}
      {status === "loading" && <LoadingUI />}
      {status === "failed" && <FailedUI /> }
      {status === "loggedIn" && <h1>ログイン成功</h1>}
    </div>
  )
}


const LoadingUI = () => (
  <div>
    <h1>Now Loading...</h1>
    <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
  </div>
)

const FailedUI = () => (
  <div>
    <h1>Loginに失敗しました</h1>
    <AppButton
      variant="primary"
      onClick={() => window.location.reload()}
    >再試行</AppButton>
  </div>
)
