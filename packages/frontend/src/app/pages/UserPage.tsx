import { Link } from "react-router-dom";
import { AppButton } from "../../components";
import { AppLoadingBar } from "../../components/AppLoadingBar";
import { useAuth } from "../../Context";
import { User } from "../../features/auth/components";

export function UserPage() {
  const { session } = useAuth();
  const { status } = session;

  return (<>
    {status === "idle" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }

    {status === "inactive" &&
      <>
        <h1>セッションが停止しています</h1>
        <Link to="/login">
          <AppButton variant="primary" className="w-auto">
            再ログイン
          </AppButton>
        </Link>
      </>
    }

    {status === "active" &&
      <div className="pt-10 flex flex-col">
        <h1 className="text-2xl mx-auto mb-4 font-bold">ユーザーページ</h1>
        <User />
      </div>
    }
  </>)
}
