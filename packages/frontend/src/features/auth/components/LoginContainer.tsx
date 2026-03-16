import { LoginForm } from "./LoginForm";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuthCtx } from "../../../Context";

export function LoginContainer() {
  const { login, session } = useAuthCtx();
  const { status } = login;

  return (
    <div>
      {session.status === "idle" &&
        <>
          <h2>ログインしていません。</h2>
          <LoginForm />
        </>
      }
      {session.status === "active" && <SuccessUI /> }
      {status === "loading" && <LoadingUI />}
      {status === "failed" && <FailedUI /> }
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

const SuccessUI = () => (
  <div>
    <h1>Loginしています</h1>
  </div>
)
