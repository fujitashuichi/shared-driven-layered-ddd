import { useEffect, useState } from "react"
import { LoginForm } from "./LoginForm";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { isSessionActive } from "../api";

export type Status = "loading" | "loginSession" | "success" | "failed";

export function LoginContainer() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const result = await isSessionActive();
      if (!result) {
        setStatus("loginSession");
      };
    }
    checkIsLoggedIn();
  }, []);

  return (
    <div>
      {status === "loading" && <LoadingUI />}
      {status === "loginSession" && <LoginForm setStatus={setStatus} /> }
      {status === "failed" && <FailedUI /> }
      {status === "success" && <SuccessUI /> }
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
