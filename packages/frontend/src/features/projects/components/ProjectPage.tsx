import type { Project } from "@pkg/shared";
import { useProject } from "../../../Context";
import { AppButton } from "../../../components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { EditProjectModal } from "./EditProjectModal";

export function ProjectPage() {
  const [editing, setEditing] = useState<boolean>(false);

  const { id: idParam } = useParams();
  const id: Project["id"] = Number(idParam);

  const { projectsData, delete: deleteProjectHook } = useProject();
  const { delete: deleteProject, status: deleteStatus, errorMessage, reset: resetDeleteStatus } = deleteProjectHook;

  const project: Project | undefined = projectsData.projects.find(item => item.id === id);

  const tryDelete = async (id: Project["id"]) => {
    await deleteProject(id);
  }

  useEffect(() => {
    if (deleteStatus === "error") {
      const timer = setTimeout(() => resetDeleteStatus(), 3000);
      return () => clearTimeout(timer);
    }
    if (deleteStatus === "success") {
      window.location.replace("/projects");
    }
  }, [deleteStatus, resetDeleteStatus]);


  if (!project) return (
    <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
      <h1 className="text-xl font-bold text-slate-400">プロジェクトが見つかりません</h1>
    </div>
  );


  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* メインカード */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          {/* ヘッダーエリア */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{project.title}</h2>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Project Details</p>
            </div>
            <div className="flex gap-2">
              <AppButton variant="primary" onClick={() => setEditing(true)} className="px-5 py-2 text-sm">
                編集
              </AppButton>
              <AppButton variant="danger" onClick={() => tryDelete(project.id)} className="px-5 py-2 text-sm opacity-90 hover:opacity-100">
                削除
              </AppButton>
            </div>
          </div>

          {/* コンテンツエリア */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-tighter">詳細説明</h3>
              <p className="text-slate-600 text-sm leading-relaxed min-h-16">
                {project.description || "説明はありません"}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-tighter">タイムスタンプ</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400 font-mono">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* フッターアクション */}
          <div className="pt-4">
            <Link to="/projects">
              <AppButton variant="primary" className="w-auto px-6 bg-slate-800 hover:bg-slate-900">
                ← 一覧へ戻る
              </AppButton>
            </Link>
          </div>
        </div>
      </div>

      {/* 状態通知エリア（トースト的な役割） */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm space-y-2 px-4">
        {deleteStatus === "pending" && (
          <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-bounce">
            <AppLoadingBar className="w-12 h-1 bg-blue-500 rounded-full" />
            <span className="text-sm font-medium">削除しています...</span>
          </div>
        )}

        {deleteStatus === "error" && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl shadow-lg animate-in slide-in-from-bottom-4">
            <h1 className="text-sm font-bold text-red-700">削除に失敗しました</h1>
            <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
          </div>
        )}

        {deleteStatus === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-sm font-bold text-emerald-700 text-center">正常に削除されました</h1>
          </div>
        )}
      </div>

      <EditProjectModal
        id={id}
        show={editing}
        onClose={() => setEditing(false)}
      />
    </div>
  )
}
