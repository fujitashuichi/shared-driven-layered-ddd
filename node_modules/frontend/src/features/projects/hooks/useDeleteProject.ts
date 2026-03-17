import type { Project } from "@pkg/shared";
import { useState } from "react";
import { deleteProject } from "../api";

type Status = "idle" | "loading" | "failed" | "success";

const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました。再ログインをお試しください",
  UserUndefined: "ユーザーが存在しません",
  ProjectUndefined: "プロジェクトが存在しません",
  InvalidData: "エラーが発生しました",
  UnknownError: "エラーが発生しました"
}

export const useDeleteProject = (id: Project["id"]) => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tryDelete = async () => {
    setStatus("loading");

    const result = await deleteProject(id);

    if (!result.success) {
      setErrorMessage(errorMap[result.errorType]);
      setStatus("failed");
    }

    setStatus("success");
  }


  return { tryDelete, status, errorMessage };
}
