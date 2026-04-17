import { LoginForm } from "./LoginForm";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuth } from "../../../Context";
import { LoginErrorPage } from "./errors/LoginErrorPage";

export function LoginContainer() {
  const { login, session } = useAuth();
  const { status } = login;
  const { status: sessionStatus } = session;

  if (sessionStatus === "active") {
    window.location.replace("/");
  }

  if (status === "loggedIn") {
    window.location.replace("/");
  }

  return (
    <div>
      {status === "idle" && <LoginForm />}
      {status === "pending" && <LoadingUI />}
      {status === "error" && <LoginErrorPage /> }
      {status === "loggedIn" && <h1>ログイン成功</h1>}
    </div>
  )
}


const LoadingUI = () => (
  <div>
    <h2>Now Loading...</h2>
    <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
  </div>
)
