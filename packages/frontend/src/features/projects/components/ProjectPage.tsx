import type { Project } from "@pkg/shared";
import { useProject } from "../../../Context";
import { AppButton } from "../../../components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { EditProjectModal } from "./EditProjectModal";

export function ProjectPage() {
  const [editing, setEditing] = useState<boolean>(false);

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
    if (deleteStatus === "success") {
      window.location.replace("/projects");
    }
  }, [deleteStatus, resetDeleteStatus]);


  if (!project) return <h1>データがありません</h1>;

  return (<>
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

      <div>
        <AppButton variant="primary" onClick={() => setEditing(true)}>編集</AppButton>
        <AppButton variant="danger" onClick={() => tryDelete(project.id)}>削除</AppButton>
      </div>

      <Link to="/projects">
        <AppButton variant="primary" className="w-auto">
          一覧へ
        </AppButton>
      </Link>
    </div>


    {deleteStatus === "pending" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
    {deleteStatus === "error" &&
      <>
        <h1>削除に失敗しました</h1>
        <p>{errorMessage}</p>
      </>
    }
    {deleteStatus === "success" &&
      <h1>正常に削除されました</h1>
    }

    <EditProjectModal
      id={id}
      show={editing}
      onClose={() => setEditing(false)}
    />
  </>)
}
