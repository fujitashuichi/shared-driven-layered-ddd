import { useState } from "react";
import { parseFormData } from "../../../lib";
import { PostProjectRequestSchema } from "@pkg/shared";
import { createProject } from "../api";

type Status = "default" | "loading" | "error" | "success";

const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  ProjectAlreadyExists: "同名のプロジェクトが既に存在します",
  InvalidData: "正しいデータを取得出来ませんでした",
  UnknownError: "エラーが発生しました",
} as const;


export const useCreateProject = () => {
  const [status, setStatus] = useState<Status>("default");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const create = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const formData: FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, PostProjectRequestSchema);

    if (!parsed.success) {
      setStatus("default");
      alert("入力内容に不備があります");
      return;
    }

    const result = await createProject(parsed.data);

    if (!result.success) {
      setErrorMessage(errorMap[result.errorType]);
      setStatus("error");
      return;
    }

    setStatus("success");
    setTimeout(() => setStatus("default"), 3000);
  };


  return { create, status, errorMessage };
}
