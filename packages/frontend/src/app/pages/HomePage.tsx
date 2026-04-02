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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-100">
      <AppHeader user={user} />

      <main className="max-w-7xl mx-auto pt-24 pb-12 px-6">
        {time === null
          ? <HomeSkeleton />
          : <DashBoard projects={projects} time={time} />
        }
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
