import type { Project } from '@pkg/shared';
import { useProject } from '../../../Context';
import { AppButton } from '../../../components';
import { AppLoadingBar } from '../../../components/AppLoadingBar';

export function DeleteProjectButton(id: Project["id"]) {
  const { delete: deleteProject } = useProject();
  const { delete: tryDelete, status, errorMessage } = deleteProject;

  return (<>
    {status === "idle" &&
      <AppButton variant="danger" onSubmit={() => tryDelete(id)}>削除</AppButton>
    }
    {status === "pending" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
    {status === "error" &&
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
