import { PostProjectForm } from './PostProjectForm';
import type { Project } from '@pkg/shared';

export function PostProjectModal({ id, show }: { id: Project["id"], show: boolean }) {
  if (!show) return null;

  return (
    <div>
      <PostProjectForm id={id} />
    </div>
  )
}
