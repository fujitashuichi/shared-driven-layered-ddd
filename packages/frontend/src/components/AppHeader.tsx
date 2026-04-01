import { Link } from "react-router-dom";
import { useAuth, useProject } from "../Context";
import type { User } from "@pkg/shared";
import { LogoutButton } from "../features/auth/components";


export function AppHeader({ user }: { user: User }) {
  const { session } = useAuth();
  const { projectsData } = useProject();

  const { status } = session;
  const { projects } = projectsData;

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <ul className="flex gap-8 items-center text-sm font-semibold tracking-tight">
          <li>
            <Link
              to="/user"
              className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-emerald-500" : "bg-slate-300"}`} />
              <span className="group-hover:underline underline-offset-4">
                {status === "active" ? `${user.email}` : "ログイン"}
              </span>
              {status === "active" && <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase">Online</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group"
            >
              <span className="group-hover:underline underline-offset-4">プロジェクト一覧</span>
              <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[11px] font-bold">
                {projects.length ?? 0}
              </span>
            </Link>
          </li>
        </ul>

        <LogoutButton />
      </nav>
    </header>
  )
}