import { useState } from "react";
import { parseFormData } from "../../../lib";
import { PatchProjectRequestSchema, type PatchProjectRequest } from "@pkg/shared";
import { updateProject } from "../api";
import type { ProjectCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";
import type { Project } from "@pkg/shared";


const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  UserUndefined: "ユーザーデータが見つかりません。再ログインをお試し下さい",
  ProjectUndefined: "プロジェクトが見つかりません。削除されていないか確認して下さい",
  InvalidData: "正しいデータを取得出来ませんでした",
  Unknown: "エラーが発生しました"
} as const;


type Result = ProjectCtxType["update"];


export const useUpdateProjects = (reload: ProjectCtxType["getProjects"]["get"]): Result => {
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const mutation = useMutation({
    mutationFn: ({ project, id }: { project: PatchProjectRequest, id: Project["id"] }) => updateProject(project, id),
    onSuccess: async (result) => {
      if (!result.success) return setErrorMessage(errorMap[result.errorType]);

      await reload(); // 楽観更新をする際はここを差し替え
    }
  });

  const update = async (e: React.SubmitEvent<HTMLFormElement>, id: Project["id"]) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData({
      formData,
      schema: PatchProjectRequestSchema,
      useFor: "update"
    });

    console.log(!parsed.success && parsed.errorMessage);
    if (!parsed.success) return alert("入力内容に不備があります");

    mutation.mutate({ project: parsed.data, id });
  }


  return {
    update,
    reset: mutation.reset,
    status: mutation.status,
    errorMessage
  };
}
