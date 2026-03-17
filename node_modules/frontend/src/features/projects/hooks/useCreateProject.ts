import { useState } from "react";
import { parseFormData } from "../../../lib";
import { PostProjectRequestSchema } from "@pkg/shared";
import { createProject } from "../api";
import type { ProjectCtxType } from "../../../Context";


const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  ProjectAlreadyExists: "同名のプロジェクトが既に存在します",
  InvalidData: "正しいデータを取得出来ませんでした",
  UnknownError: "エラーが発生しました",
} as const;

type Result = ProjectCtxType["create"];

export const useCreateProject = (): Result => {
  const [status, setStatus] = useState<Result["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const create: Result["create"] = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const formData: FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, PostProjectRequestSchema);

    if (!parsed.success) {
      setStatus("idle");
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
    setTimeout(() => setStatus("idle"), 3000);
  };


  return { create, status, errorMessage };
}
