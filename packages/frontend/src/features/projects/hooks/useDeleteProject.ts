import type { Project } from "@pkg/shared";
import { useState } from "react";
import { deleteProject } from "../api";
import type { ProjectCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";


const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました。再ログインをお試しください",
  UserUndefined: "ユーザーが存在しません",
  ProjectUndefined: "プロジェクトが存在しません",
  InvalidData: "エラーが発生しました",
  Unknown: "エラーが発生しました"
}

type Result = ProjectCtxType["delete"];


export const useDeleteProject = (reload: ProjectCtxType["getProjects"]["get"]): Result => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (id: Project["id"]) => deleteProject(id),
    onSuccess: async (result) => {
      if (!result.success) return setErrorMessage(errorMap[result.errorType]);

      await reload(); // 楽観更新をする際はここを差し替え
    }
  });

  const deleteFn: Result["delete"] = async (id: Project["id"]) => mutation.mutate(id);


  return {
    delete: deleteFn,
    reset: mutation.reset,
    status: mutation.status,
    errorMessage
  };
}
