import { AppButton } from '../../../components';
import { PostProjectForm } from './PostProjectForm';
import type { Project } from '@pkg/shared';

export function PostProjectModal({ id, show, onClose }: { id: Project["id"], show: boolean, onClose: () => void }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className='bg-white mb-6 rounded-2xl p-10'
        onClick={(e) => e.stopPropagation()}
      >
        <PostProjectForm id={id} />

        <div className="flex justify-end mt-1.5">
          <AppButton variant="danger" onClick={onClose} className='w-auto'>
            閉じる
          </AppButton>
        </div>
      </div>
    </div>
  )
}
