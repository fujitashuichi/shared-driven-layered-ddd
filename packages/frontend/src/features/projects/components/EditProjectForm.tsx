import { type Project } from "@pkg/shared";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import type React from "react";
import { useProject } from "../../../Context";
import { useEffect } from "react";


export function EditProjectForm({ id }: { id: Project["id"] }) {
  const { update: updateProject } = useProject();
  const { update, status, errorMessage, reset } = updateProject;
  const tryUpdate = (e: React.SubmitEvent<HTMLFormElement>) => update(e, id);

  useEffect(() => {
    if (status === "error" || status === "success") {
      const timer = setTimeout(() => reset(), 3000);
      return () => {
        reset();
        clearTimeout(timer);
      }
    }
  }, [status, reset]);

  return (<>
    {status === "idle" &&
      <form onSubmit={(e) => tryUpdate(e)} className="flex flex-col gap-6 w-full max-w-lg p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="mb-2">
          <h2 className="text-lg font-bold text-slate-800">プロジェクトの編集</h2>
          <p className="text-sm text-slate-500">変更する内容だけ記入してください</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="title" className="text-sm font-semibold text-slate-700 ml-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            maxLength={30}
            placeholder="プロジェクト名を入力"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-semibold text-slate-700 ml-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            maxLength={100}
            placeholder="プロジェクトの概要（任意）"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 resize-none"
          />
          <p className="text-right text-[10px] font-medium text-slate-400 uppercase tracking-tight pr-1">
            Max 100 characters
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="status" className="text-sm font-semibold text-slate-700 ml-1">
            Status
          </label>
          <input
            id="status"
            name="status"
            maxLength={10}
            placeholder="ステータス（任意）"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <AppButton variant="primary" type="submit" className="w-auto">
            確定
          </AppButton>
        </div>
      </form>
    }
    {status === "pending" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
    {status === "error" &&
      <div>
        <h1>エラーが発生しました</h1>
        <h2>{errorMessage}</h2>
      </div>
    }
    {status === "success" &&
      <h2>正常に更新されました</h2>
    }
  </>)
}
