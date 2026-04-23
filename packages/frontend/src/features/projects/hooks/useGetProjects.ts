import React, { useState, type SetStateAction } from "react";
import { getProjects } from "../api";
import type { ProjectCtxType } from "../../../Context";
import type { Project } from "@pkg/shared";
import { useMutation } from "@tanstack/react-query";


const ErrorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  InvalidDataError: "正しいデータが取得できませんでした",
  Unknown: "エラーが発生しました"
}

type Result = ProjectCtxType["getProjects"];

export const useGetProjects = (setProjects: React.Dispatch<SetStateAction<Project[]>>): Result => {
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const mutation = useMutation({
    mutationFn: () => getProjects(),
    onSuccess: (result) => {
      if (!result.success) return setErrorMessage(ErrorMap[result.errorType]);
      setProjects(result.value);
    }
  });

  const get: Result["get"] = async () => mutation.mutate();


  return { get, status: mutation.status, errorMessage };
};
