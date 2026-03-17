import { useState } from "react";
import { getProjects } from "../api";
import type { ProjectCtxType } from "../../../Context";
import { useProjectsData } from "./useProjectsData";


const ErrorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  InvalidDataError: "正しいデータが取得できませんでした",
  UnknownError: "エラーが発生しました"
}

type Result = ProjectCtxType["getProjects"];

export const useGetProjects = (): Result => {
  const [status, setStatus] = useState<Result["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const { setProjects } = useProjectsData();

  const get: Result["get"] = async () => {
    setStatus("loading");
    const result = await getProjects();

    if (!result.success) {
      setStatus("error");
      setErrorMessage(ErrorMap[result.errorType]);
      return;
    };

    setProjects(result.value);
    setStatus("success");
  }


  return { get, status, errorMessage };
};
