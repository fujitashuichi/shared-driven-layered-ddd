import type { Project } from "@pkg/shared";
import { useProject } from "../../../Context";
import { AppButton } from "../../../components";

export function EditProject(id: Project["id"]) {
  const { projectsData, delete: deleteProject } = useProject();
  const { delete: tryDelete } = deleteProject;

  const project: Project | undefined = projectsData.projects.find(item => item.id === id);


  return (<>
    {project === undefined &&
      <h1>データがありません</h1>
    }
    {project !== undefined &&
      <div>
        <h2 className="font-bold text-lg">{project.title}</h2>
        <div>
          <h3>詳細</h3>
          <p className="text-gray-600 text-sm">{project.description}</p>
          <h3>作成日時</h3>
          <p className="mt-2 text-xs text-gray-400">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>

        <AppButton variant="danger" onClick={() => tryDelete(project.id)}>削除</AppButton>
      </div>
    }
  </>)
}
