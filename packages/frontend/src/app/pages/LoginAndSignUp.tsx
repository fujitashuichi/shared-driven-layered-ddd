import { LoginContainer, RegisterForm } from '../../features/auth/components'

export function LoginAndSignUp() {
  return (<>
    <div className="max-w-md mx-auto py-12 px-4 space-y-16">
      {/* ログインセクション */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ログイン
          </h1>
          <p className="text-sm text-slate-500">ログイン</p>
        </div>
        <div className="bg-white">
          <LoginContainer />
        </div>
      </section>

      {/* 区切り線（視覚的な休息） */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-slate-50 px-4 text-slate-400">OR</span>
        </div>
      </div>

      {/* 新規登録セクション */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-slate-800">
            未登録の場合はこちら
          </h1>
        </div>
        <div className="bg-white">
          <RegisterForm />
        </div>
      </section>
    </div>
  </>)
}
