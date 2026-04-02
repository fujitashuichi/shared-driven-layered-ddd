import { AppButton } from '../../../components';
import { EditProjectForm } from './EditProjectForm';
import type { Project } from '@pkg/shared';

export function EditProjectModal({ id, show, onClose }: { id: Project["id"], show: boolean, onClose: () => void }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* フォームコンポーネントをそのまま呼び出し */}
        <div>
          <EditProjectForm id={id} />
        </div>

        {/* フッターアクションエリア */}
        <div className="px-8 pb-8 flex justify-start border-t border-slate-50 pt-4">
          <AppButton
            variant="danger"
            onClick={onClose}
            className="w-auto"
          >
            キャンセル
          </AppButton>
        </div>
      </div>
    </div>
  )
}
