import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useProject } from "../../../Context";


export function ProjectList() {
  const { projectsData, getProjects } = useProject();

  const { projects } = projectsData;
  const { get, status, errorMessage } = getProjects;


  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Project List</h2>

      {status === "loading" && (
        <AppLoadingBar className="w-full h-1" />
      )}

      {status === "error" && (
        <div className="text-red-500 p-4 border border-red-200 rounded">
          {errorMessage}
          <button onClick={get} className="ml-4 underline">再試行</button>
        </div>
      )}

      {status === "success" && projects.length === 0 && (
        <p className="text-gray-500">プロジェクトがありません。新しく作成してください。</p>
      )}

      {status === "success" && projects.length > 0 && (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li key={project.id} className="p-4 border rounded shadow-sm bg-white">
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
              <div className="mt-2 text-xs text-gray-400">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
