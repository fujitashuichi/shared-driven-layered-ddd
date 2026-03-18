import type { Project } from "@pkg/shared";
import { useProject } from "../../../Context";
import { AppButton } from "../../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppLoadingBar } from "../../../components/AppLoadingBar";

export function ProjectPage() {
  const { id: idParam } = useParams();
  const id: Project["id"] = Number(idParam);

  const { projectsData, delete: deleteProjectHook } = useProject();
  const { delete: deleteProject, status: deleteStatus, errorMessage, reset: resetDeleteStatus } = deleteProjectHook;

  const project: Project | undefined = projectsData.projects.find(item => item.id === id);

  const tryDelete = async (id: Project["id"]) => {
    await deleteProject(id);
  }

  useEffect(() => {
    if (deleteStatus === "error") {
      const timer = setTimeout(() => resetDeleteStatus(), 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteStatus, resetDeleteStatus]);


  return (<>
    {project === undefined &&
      <h1>データがありません</h1>
    }
    {project !== undefined &&
      <div>
        <h2 className="font-bold text-lg">{project.title}</h2>
        <div>
          <div>
            <h3>詳細</h3>
            <p className="text-gray-600 text-sm">{project.description || "no descriptions"}</p>
          </div>
          <div>
            <h3>作成日時</h3>
            <p className="mt-2 text-xs text-gray-400">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <AppButton variant="primary">編集</AppButton>
        <AppButton variant="danger" onClick={() => tryDelete(project.id)}>削除</AppButton>
      </div>
    }
    {deleteStatus === "loading" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
    {deleteStatus === "error" &&
      <>
        <h1>削除に失敗しました</h1>
        <p>{errorMessage}</p>
      </>
    }
  </>)
}
