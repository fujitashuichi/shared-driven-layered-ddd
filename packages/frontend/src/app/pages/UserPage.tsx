import { AppLoadingBar } from "../../components/AppLoadingBar";
import { useAuth } from "../../Context";
import { LoginContainer, User } from "../../features/auth/components";

export function UserPage() {
  const { session } = useAuth();
  const { status } = session;

  return (<>
    {status === "idle" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }

    {status === "inactive" &&
      <LoginContainer />
    }

    {status === "active" &&
      <User />
    }
  </>)
}
