import { AppLoadingBar } from "../../components/AppLoadingBar";
import { useAuth } from "../../Context";
import { LoginContainer } from "../../features/auth/components";

export function UserPage() {
  const { session, useUser, getUser } = useAuth();

  const { status: sessionStatus } = session;
  const { user } = useUser;
  const { status: getUserStatus, errorMessage: getUserErrorMessage } = getUser;


  if (user === null) {
    return <h1>データがありません</h1>
  }
  const SuccessUI = (<>
    {sessionStatus === "idle" &&
      <div>
        <h1>ログインしていません</h1>
        <LoginContainer />
      </div>
    }
    {sessionStatus === "active" &&
      <div>
        <h2>email</h2>
        <p>{user.email}</p>
        <h2>作成日時</h2>
        <p>{new Date(user.createdAt).toLocaleString()}</p>
      </div>
    }
  </>)


  const UIMap = {
    idle: <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />,
    loading: <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />,
    failed: <h1>{getUserErrorMessage}</h1>,
    success: SuccessUI
  }

  return UIMap[getUserStatus]
}
