import { type Project } from "@pkg/shared";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useUpdateProjects } from "../hooks/useUpdateProject";


export function PostProjectForm(id: Project["id"]) {
  const { update, status, errorMessage } = useUpdateProjects(id);

  return (<>
    {status === "default" &&
      <form onSubmit={update}>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" minLength={1} maxLength={30} />
        <label htmlFor="description">Description</label>
        <input name="description" type="text" maxLength={100} />

        <AppButton variant="primary" type="submit" />
      </form>
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
      <h2>正常に更新されました</h2>
    }
  </>)
}
