import { useEffect } from "react";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useProject } from "../../../Context";


export function CreateProjectForm() {
  const { create: createProject } = useProject();
  const { create, reset, status, errorMessage } = createProject;

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => reset(), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, reset]);

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

        <AppButton variant="primary" type="submit" className="w-auto">
          新規作成＋
        </AppButton>
      </form>
    }

    {status === "pending" &&
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
