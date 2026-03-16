import type { Project } from "@pkg/shared";
import { useState } from "react";
import { getProjects } from "../api";

type Status = "loading" | "error" | "success";

const ErrorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  InvalidDataError: "正しいデータが取得できませんでした",
  UnknownError: "エラーが発生しました"
}


export const useGetProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const get = async () => {
    setStatus("loading");
    const result = await getProjects();

    if (!result.success) {
      setStatus("error");
      setErrorMessage(ErrorMap[result.errorType]);
      return;
    };

    setStatus("success");
    setProjects(result.value);
  }


  return { get, status, errorMessage, projects };
};
