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

  if (sessionStatus === "inactive") return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h1 className="text-xl font-bold text-slate-800">ログインしてください</h1>
      <p className="text-sm text-slate-500">この操作には認証が必要です。</p>
    </div>
  )

  if (!user) return (<>
    <div className="max-w-md mx-auto mt-10 p-8 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6">
      <h1 className="text-lg font-bold text-red-600">ユーザーデータが見つかりません</h1>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">ログイン状態</h2>
        <p className="text-md font-semibold text-slate-800 mt-1">
          {sessionStatus === "active" ? "認証済み" : "未認証"}
        </p>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed text-center">
        ログイン中にこの画面が出る場合は、<br />お手数ですがお問い合わせください
      </p>
    </div>
  </>)

  if (user === null) return (<>
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-bold text-slate-800">データがありません</h1>
        <p className="text-sm text-slate-500">新しいプロジェクトを開始して、データを追加しましょう。</p>
      </div>
      <Link to="/projects">
        <AppButton variant="primary" className="w-auto">
          新規作成 ✛
        </AppButton>
      </Link>
    </div>
  </>);

  return (<>
    <div className="max-w-2xl mx-auto space-y-8">
      {gettingStatus === "error" && (
        <div className="p-6 bg-red-50 border border-red-100 rounded-xl flex flex-col items-center gap-4">
          <h1 className="text-md font-semibold text-red-700">{errorMessage}</h1>
          <AppButton
            variant="primary"
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            再試行
          </AppButton>
        </div>
      )}

      {gettingStatus === "success" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email address</h2>
                <p className="text-lg font-medium text-slate-900 break-all">{user.email}</p>
              </div>
              <div className="space-y-1">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Created at</h2>
                <p className="text-lg font-medium text-slate-900">
                  {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <Link to="/">
                <AppButton variant="primary" className="w-auto">
                  ダッシュボードへ戻る
                </AppButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  </>)
}
