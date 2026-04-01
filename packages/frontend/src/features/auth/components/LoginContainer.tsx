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
      {status === "pending" && <LoadingUI />}
      {status === "error" && <FailedUI /> }
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

const FailedUI = () => (
  <div className="max-w-sm mx-auto my-10 p-8 bg-red-50 border border-red-100 rounded-2xl flex flex-col items-center gap-6 shadow-sm">
    <div className="text-center space-y-2">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-2">
        <span className="text-xl font-bold">!</span>
      </div>
      <h2 className="text-lg font-bold text-red-800 tracking-tight">
        ログインに失敗しました
      </h2>
      <p className="text-sm text-red-600/80 leading-relaxed">
        入力内容を確認のうえ、<br />もう一度お試しください。
      </p>
    </div>

    <AppButton
      variant="primary"
      className="w-full py-3 bg-red-600 hover:bg-red-700 shadow-md transition-all active:scale-[0.98]"
      onClick={() => window.location.reload()}
    >
      再試行
    </AppButton>
  </div>
)
