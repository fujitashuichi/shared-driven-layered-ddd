import { AppButton } from '../../../components';
import { AppLoadingBar } from '../../../components/AppLoadingBar';
import { useAuth } from '../../../Context';

export function User() {
  const { session, useUser, getUser } = useAuth();

  const { status: sessionStatus } = session;
  const { user } = useUser;
  const { status: gettingStatus, errorMessage } = getUser;


  if (sessionStatus === "idle") return <h1>ログインしていください</h1>

  if (user === null) return <h1>データがありません</h1>;

  return (<>
    {(gettingStatus === "idle" || gettingStatus === "loading") &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }

    {gettingStatus === "failed" &&
      <>
        <h1>{errorMessage}</h1>
        <AppButton
          variant="primary"
          onClick={() => window.location.reload()}
        >再試行</AppButton>
      </>
    }

    {gettingStatus === "success" &&
      <div>
        <h2>email</h2>
        <p>{user.email}</p>
        <h2>作成日時</h2>
        <p>{new Date(user.createdAt).toLocaleString()}</p>
      </div>
    }
  </>)
}
