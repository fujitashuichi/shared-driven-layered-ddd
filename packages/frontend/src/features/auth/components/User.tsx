import { Link } from 'react-router-dom';
import { AppButton } from '../../../components';
import { AppLoadingBar } from '../../../components/AppLoadingBar';
import { useAuth } from '../../../Context';

export function User() {
  const { session, useUser, getUser } = useAuth();

  const { status: sessionStatus } = session;
  const { user } = useUser;
  const { status: gettingStatus, errorMessage } = getUser;


  if (gettingStatus === "idle" || gettingStatus === "pending" || sessionStatus === "idle") {
    return <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
  }

  if (sessionStatus === "inactive") return <h1>ログインしていください</h1>

  if (!user) return (<>
    <h1>ユーザーデータが見つかりません</h1>
    <div className="border-2 p-10">
      <h2>ログイン状態: {sessionStatus === "active" ? "ログイン中" : "未ログイン"}</h2>
    </div>
    <p>ログイン中にこの画面が出る場合は、お手数ですがお問い合わせください</p>
  </>)

  if (user === null) return (<>
    <h1>データがありません</h1>
    <Link to="/projects">
      <AppButton variant="primary" className="w-auto">
        新規作成✛
      </AppButton>
    </Link>
  </>);

  return (<>
    {gettingStatus === "error" &&
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

        <Link to="/">
          <AppButton variant="primary" className='w-auto'>
            ダッシュボード
          </AppButton>
        </Link>
      </div>
    }
  </>)
}
