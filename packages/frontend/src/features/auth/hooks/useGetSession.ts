import type { AuthCtxType } from "../../../Context"
import { isSessionActive } from "../api";

type Result = AuthCtxType["getSession"];

export const useGetSession = (setStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const getSession: Result["getSession"] = async () => {
    const isActive = await isSessionActive();

    if (isActive) return setStatus("active");
    return setStatus("inactive");
  }

  return { getSession: getSession }
}
