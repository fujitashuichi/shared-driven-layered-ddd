import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuth } from "../../../Context";


export function RegisterForm() {
  const { register } = useAuth();
  const { register: tryRegister, status } = register;

  return (<>
    {
      status === "idle" &&
      <form onSubmit={tryRegister} className="flex flex-col gap-6 w-full max-w-sm p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="address-level3"
            placeholder="example@email.com"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" title="8～20字" className="text-sm font-semibold text-slate-700 ml-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            min={8}
            max={20}
            autoComplete="new-password"
            placeholder="8～20字"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="passwordConfirm" className="text-sm font-semibold text-slate-700 ml-1">
            Confirm password
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            required
            min={8}
            max={20}
            autoComplete="new-password webauthn"
            placeholder="確認のためもう一度入力"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="pt-2">
          <AppButton variant="primary" type="submit" className="w-full py-3 font-bold tracking-wide shadow-md active:scale-[0.98] transition-transform">
            Create account
          </AppButton>
        </div>
      </form>
    }
    {
      status === "pending" && (
        <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
      )
    }
  </>)
}
