import { AppButton } from "../../../components"
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuthCtx } from "../../../Context";


export function LogoutButton() {
  const { logout } = useAuthCtx();
  const { status: logoutStatus, logout: tryLogout } = logout;

  const disabled = logoutStatus !== "idle" ? true : false;

  return (<>
    {logoutStatus === "idle" &&
      <AppButton variant="danger" disabled={disabled} onClick={tryLogout}>Logout</AppButton>
    }
    {logoutStatus === "loading" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
  </>)
}
