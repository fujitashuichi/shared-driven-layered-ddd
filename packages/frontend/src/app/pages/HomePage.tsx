import { Link } from "react-router-dom";
import { useAuth, useProject } from "../../Context";
import { useEffect, useState } from "react";
import { AppButton } from "../../components";
import type { Project } from "@pkg/shared";
import { get7daysProjects } from "../../lib/tools/get7daysProject";
import { AppHeader } from "../../components/AppHeader";
import { AppLoadingBar } from "../../components/AppLoadingBar";
import Introduction from "./containers/Introduction";


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


  const { useUser, session } = useAuth();
  const { projectsData } = useProject();

  const { user } = useUser;
  const { status } = session;
  const { projects } = projectsData;


  if (status === "idle") return <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />

  if (status === "inactive") return <Introduction />

  if (!user) return <UserNotFoundView />

  return (
    <div className="mx-auto min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-100">
      <AppHeader user={user} />
      <main className="max-w-(--size-7xl) mx-auto pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="w-full max-w-3xl animate-in slide-in-from-bottom-4 duration-700 ease-out">
          {time === null
            ? <HomeSkeleton />
            : <DashBoard projects={projects} time={time} />
          }
        </div>
      </main>
    </div>
  )
}


function HomeSkeleton() {
  return (
    <div className="animate-in fade-in duration-500">
      <ul className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="flex justify-between items-center">
            <div className="h-4 w-48 bg-gray-300 rounded"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DashBoard({ projects, time }: { projects: Project[], time: Date }) {
  const sevenDaysProjects = get7daysProjects(projects, time);

  return (
    <>
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Project Dashboard
        </h1>
        <p className="text-sm text-slate-500 font-medium italic">Recent Activity</p>
      </header>

      <section className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden text-left">
        <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            過去7日以内に編集
          </h2>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>

        <ul className="divide-y divide-slate-100">
          {sevenDaysProjects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between px-10 py-7 hover:bg-slate-50/40 transition-all group"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider">REF: {String(project.id).slice(0, 8).toUpperCase()}</p>
              </div>

              <Link to={`/projects/${project.id}`}>
                <AppButton variant="primary" className="w-auto">
                  見る
                </AppButton>
              </Link>
            </li>
          ))}

          {sevenDaysProjects.length === 0 && (
            <li className="px-10 py-16 text-center">
              <p className="text-sm text-slate-400 italic font-medium mb-4">
                対象のプロジェクトはありません
              </p>
              <Link to="/projects">
                <AppButton variant="primary" className="w-auto font-medium bg-green-500">
                  ＋新規作成
                </AppButton>
              </Link>
            </li>
          )}
        </ul>
      </section>
    </>
  )
}

function UserNotFoundView() {
  return (
    <>
      <h1>ユーザーデータが見つかりません</h1>
      <Link to="/user">
        <AppButton variant="secondary" className="w-auto">
          ユーザーページへ
        </AppButton>
      </Link>
    </>
  )
}
