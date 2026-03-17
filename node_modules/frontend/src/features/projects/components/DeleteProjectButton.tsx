import type { Project } from '@pkg/shared';
import { useDeleteProject } from '../hooks'
import { AppButton } from '../../../components';
import { AppLoadingBar } from '../../../components/AppLoadingBar';

export function DeleteProjectButton(id: Project["id"]) {
  const { tryDelete, status, errorMessage } = useDeleteProject(id);

  return (<>
    {status === "idle" &&
      <AppButton variant="danger" onSubmit={tryDelete}>削除</AppButton>
    }
    {status === "loading" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
    {status === "failed" &&
      <div>
        <h2>{errorMessage}</h2>
        <AppButton
          variant="primary"
          onClick={() => window.location.reload()}
        >再試行</AppButton>
      </div>
    }
    {status === "success" &&
      <h2>削除が完了しました</h2>
    }
  </>)
}
