import { type Project } from "@pkg/shared";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import type React from "react";
import { useProject } from "../../../Context";
import { useEffect } from "react";


export function PostProjectForm({ id }: { id: Project["id"] }) {
  const { update: updateProject } = useProject();
  const { update, status, errorMessage, reset } = updateProject;
  const tryUpdate = (e: React.SubmitEvent<HTMLFormElement>) => update(e, id);

  useEffect(() => {
    if (status === "error") {
      const timer = setTimeout(() => reset(), 3000);
      return () => {
        reset();
        clearTimeout(timer);
      }
    }
  }, [status, reset]);

  return (<>
    {status === "idle" &&
      <form onSubmit={(e) => tryUpdate(e)}>
        <h2>変更する内容だけ記入してください</h2>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
            <span className="text-red-500 ml-1">*</span> {/* 必須マーク（minLength={1}のため） */}
          </label>
          <input name="title" type="text" minLength={1} maxLength={30}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="プロジェクト名を入力"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea name="description" rows={3} maxLength={100}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="プロジェクトの概要（任意）"
          />
          <p className="text-right text-xs text-gray-400">最大100文字</p>
        </div>

        <div className="flex justify-end pt-2">
          <AppButton variant="primary" type="submit">
            確定
          </AppButton>
        </div>
      </form>
    }
    {status === "loading" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
    {status === "error" &&
      <div>
        <h2>{errorMessage}</h2>
      </div>
    }
    {status === "success" &&
      <h2>正常に更新されました</h2>
    }
  </>)
}
