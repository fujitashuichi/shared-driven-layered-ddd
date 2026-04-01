import { Link } from "react-router-dom";
import { useAuth, useProject } from "../../Context";
import { useEffect, useState } from "react";
import { AppButton } from "../../components";
import type { Project } from "@pkg/shared";
import { get7daysProjects } from "../../lib/tools/get7daysProject";


export function HomePage() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const checkTime = () => setTime(new Date());
    const timerId = setInterval(() => {
      checkTime();
    }, 5 * 60 * 1000);
    checkTime();

    return () => clearInterval(timerId);
  }, []);


  const { session, useUser } = useAuth();
  const { projectsData } = useProject();

  const { status } = session;
  const { user } = useUser;
  const { projects } = projectsData;


  if (!user) return (<>
    <h1>ユーザーデータが見つかりません</h1>
    <Link to="/user">
      <AppButton variant="secondary" className="w-auto">
        ユーザーページへ
      </AppButton>
    </Link>
  </>)

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-100">
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
                  {projects?.length ?? 0}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto pt-24 pb-12 px-6">
        {time === null ? (
          <div className="animate-in fade-in duration-500">
            <HomeSkeleton />
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-2 duration-700">
            <DashBoard projects={projects} time={time} />
          </div>
        )}
      </main>
    </div>
  )
}


function HomeSkeleton() {
  return (
    <ul className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <li key={i} className="flex justify-between items-center">
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
        </li>
      ))}
    </ul>
  );
}

function DashBoard({ projects, time }: { projects: Project[], time: Date }) {
  const sevenDaysProjects = get7daysProjects(projects, time);

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4 text-center space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Project Dashboard
      </h1>

      <div className="bg-white border border-slate-200 rounded-4xl shadow-sm overflow-hidden text-left">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">
            過去7日以内に編集
          </h2>
        </div>

        <ul className="divide-y divide-slate-100">
          {sevenDaysProjects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between px-8 py-5 hover:bg-slate-50/30 transition-colors"
            >
              <h3 className="text-md font-semibold text-slate-800">
                {project.title}
              </h3>
              <Link to={`/projects/${project.id}`}>
                <AppButton variant="primary" className="px-6 py-2 text-sm">
                  見る
                </AppButton>
              </Link>
            </li>
          ))}

          {sevenDaysProjects.length === 0 && (
            <li className="px-8 py-10 text-center text-sm text-slate-400 italic">
              対象のプロジェクトはありません
            </li>
          )}
        </ul>
      </div>
    </main>
  )
}
