import { useState } from "react";
import { parseFormData } from "../../../lib";
import { PostProjectRequestSchema } from "@pkg/shared";
import { updateProject } from "../api";
import type { Project } from "@pkg/shared";
import type { ProjectCtxType } from "../../../Context";


const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  UserUndefined: "ユーザーデータが見つかりません。再ログインをお試し下さい",
  ProjectUndefined: "プロジェクトが見つかりません。削除されていないか確認して下さい",
  InvalidData: "正しいデータを取得出来ませんでした",
  UnknownError: "エラーが発生しました"
} as const;

type Result = ProjectCtxType["update"];

export const useUpdateProjects = (id: Project["id"]) => {
  const [status, setStatus] = useState<Result["status"]>("idle");
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const update = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const formData: FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, PostProjectRequestSchema);

    if (!parsed.success) {
      setStatus("idle");
      alert("入力内容に不備があります");
      return;
    }

    const result = await updateProject(parsed.data, id);
    if (!result.success) {
      setErrorMessage(errorMap[result.errorType]);
      return setStatus("error");
    }

    setStatus("success");
    setTimeout(() => setStatus("idle"), 3000);
  }


  return { update, status, errorMessage };
}
