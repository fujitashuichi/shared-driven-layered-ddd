import { LoginForm } from "./LoginForm";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuth } from "../../../Context";
import { AppButton } from "../../../components";
import { Link } from "react-router-dom";

export function LoginContainer() {
  const { login, session } = useAuth();
  const { status } = login;
  const { status: sessionStatus } = session;

  if (sessionStatus === "active") {
    return (
      <div>
        <h1>既にログインしています</h1>
        <Link to="/">
          <AppButton variant="primary">
            ダッシュボードへ
          </AppButton>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {status === "idle" && <LoginForm />}
      {status === "pending" && <LoadingUI />}
      {status === "error" && <h1>ログイン失敗</h1> }
      {status === "loggedIn" && <h1>ログイン成功</h1>}

      {/*
        ログイン失敗時はauth.jsによってリダイレクトされる
      */}
    </div>
  )
}


const LoadingUI = () => (
  <div>
    <h2>Now Loading...</h2>
    <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
  </div>
)
