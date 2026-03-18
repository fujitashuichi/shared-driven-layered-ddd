import { useState } from "react";
import type { AuthCtxType } from "../../../Context"

type Result = AuthCtxType["useUser"];

export const useUser = (): Result => {
  const [user, setUser] = useState<Result["user"] | null>(null);

  return { user, setUser };
}
