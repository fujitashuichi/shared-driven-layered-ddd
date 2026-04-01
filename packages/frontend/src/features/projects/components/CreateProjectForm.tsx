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
      <form onSubmit={create} className="flex flex-col gap-6 w-full max-w-lg p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="space-y-1.5">
          <label htmlFor="title" className="text-sm font-semibold text-slate-700 ml-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={1}
            maxLength={30}
            placeholder="project title"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-semibold text-slate-700 ml-1">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            maxLength={100}
            placeholder="project description"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="status" className="text-sm font-semibold text-slate-700 ml-1">
            Status
          </label>
          <input
            id="status"
            name="status"
            type="text"
            maxLength={10}
            placeholder="onDevelop, hobby, done, etc..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <AppButton variant="primary" type="submit" className="w-auto font-bold shadow-md active:scale-[0.98] transition-transform">
            新規作成 ＋
          </AppButton>
        </div>
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
