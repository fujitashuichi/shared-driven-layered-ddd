import { AppButton } from "../../../components"
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuth } from "../../../Context";


export function LogoutButton() {
  const { logout, session } = useAuth();
  const { status: logoutStatus, logout: tryLogout } = logout;

  const disabled = session.status === "idle" ? true : false;
  const color = session.status === "idle" ? "bg-red-900" : "";

  return (<>
    {logoutStatus !== "loading" &&
      <AppButton variant="danger" className={color} disabled={disabled} onClick={tryLogout}>Logout</AppButton>
    }
    {logoutStatus === "loading" &&
      <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
    }
  </>)
}
