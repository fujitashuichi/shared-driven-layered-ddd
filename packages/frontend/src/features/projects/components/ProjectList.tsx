import { Link } from "react-router-dom";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useProject } from "../../../Context";
import { CreateProjectForm } from "./CreateProjectForm";

export function ProjectList() {
  const { projectsData, getProjects } = useProject();
  const { projects } = projectsData;
  const { get, status, errorMessage } = getProjects;


  return (
    <section className="p-4 flex flex-col">
      <h2 className="mx-auto text-xl font-bold mb-4">Project List</h2>

      {status === "pending" && (
        <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
      )}

      {status === "error" && (
        <div className="mx-auto text-red-500 p-4 border border-red-200 rounded">
          {errorMessage}
          <button onClick={get} className="ml-4 underline">再試行</button>
        </div>
      )}

      {status === "success" && projects.length === 0 && (
        <div className="mx-auto">
          <p className="text-gray-500">プロジェクトがありません。新しく作成してください。</p>
          <CreateProjectForm />
        </div>
      )}

      {status === "success" && projects.length > 0 && (
        <div className="mx-auto">
          <div className="mb-5">
            <CreateProjectForm />
          </div>
          <ul className="space-y-3">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border rounded shadow-sm bg-white">
                <Link to={`/projects/${project.id}`}>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
