import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useCreateProject } from "../hooks/useCreateProject";


export function CreateProjectForm() {
  const { create, status, errorMessage } = useCreateProject();

  return (<>
    {status === "idle" &&
      <form onSubmit={create}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          required
          minLength={1}
          maxLength={30}
          placeholder="project title"
        />

        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          maxLength={100}
          placeholder="project description"
        />

        <AppButton variant="primary" type="submit">
          Create Project
        </AppButton>
      </form>
    }

    {status === "loading" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }

    {status === "error" &&
      <h2>{errorMessage}</h2>
    }

    {status === "success" &&
      <h1>プロジェクトが作成されました</h1>
    }
  </>);
}
