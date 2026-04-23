import React, { useState } from "react";
import { parseFormData } from "../../../lib";
import { PostProjectRequestSchema, type PostProjectRequest } from "@pkg/shared";
import { createProject } from "../api";
import type { ProjectCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";


const errorMap = {
  UnAuthorized: "ユーザー認証に失敗しました",
  ProjectAlreadyExists: "同名のプロジェクトが既に存在します",
  InvalidData: "正しいデータを取得出来ませんでした",
  UnknownError: "エラーが発生しました",
} as const;

type Result = ProjectCtxType["create"];


export const useCreateProject = (reload: ProjectCtxType["getProjects"]["get"]): Result => {
  const [overrideStatus, setOverrideStatus] = useState<"error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (body: PostProjectRequest) => createProject(body),
    onSuccess: async (result) => {
      if (!result.success) {
        setOverrideStatus("error");
        return setErrorMessage(errorMap[result.errorType]);
      }

      await reload(); // createはサーバーレスポンスが必須なため、ここを楽観更新に差し替えることは許容しない
    },
    onError: () => alert("通信に失敗しました。時間をおいて再度お試しください。")
  });


  const create: Result["create"] = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData({
      formData,
      schema: PostProjectRequestSchema,
      useFor: "create"
    });

    if (!parsed.success) return alert("入力内容に不備があります");

    mutation.mutate(parsed.data);
  };

  const reset = () => {
    mutation.reset();
    setOverrideStatus(null);
  }


  const trulyStatus = overrideStatus ?? mutation.status;

  return { create, reset, status: trulyStatus, errorMessage };
}
