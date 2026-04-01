import { AppButton } from "../../../components";
import { useAuth } from "../../../Context";


export function LoginForm() {
  const { login } = useAuth();
  const { login: tryLogin } = login;

  return (
    <form onSubmit={tryLogin} className="flex flex-col gap-6 w-full max-w-sm p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="example@email.com"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" title="8～20字" className="text-sm font-medium text-slate-700 ml-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          min={8}
          max={20}
          required
          autoComplete="current-password"
          placeholder="8～20字"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="pt-2">
        <AppButton variant="primary" type="submit" className="w-full py-2.5 font-semibold tracking-wide">
          Sign in
        </AppButton>
      </div>
    </form>
  )
}