import { Link } from "react-router-dom";
import { useAuth, useProject } from "../../Context";
import { useEffect, useState } from "react";
import { AppButton } from "../../components";

export function HomePage() {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const checkTime = () => setTime(Date.now());
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


  return (
    <div className="min-h-screen p-4">
      <header className="fix top-0 border-b pb-4">
        <ul className="flex gap-10">
          <li>
            <Link to="/user" className="hover:underline">
              {status === "active" ? `${user?.email} でログイン中` : "ログイン"}
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:underline">
              プロジェクト一覧 ({projects?.length ?? 0})
            </Link>
          </li>
        </ul>
      </header>

      {time === null ? (
        <HomeSkeleton />
      ) : (
        <main className="mt-8 text-center">
          <h1 className="text-2xl font-bold">Project Dashboard</h1>

          <div>
            <ul className="p-4 border border-gray-500 rounded-3xl">
              <h2>過去7日以内に編集</h2>
              {projects
                .filter(item => item.updatedAt >= (time - 7 * 24*60*60*1000))
                .map(project => {
                  return (
                    <li className="flex justify-between">
                      <h3>{project.title}</h3>
                      <Link to={`/projects/${project.id}`}>
                        <AppButton variant="primary">見る</AppButton>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </main>
      )}
    </div>
  );
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
