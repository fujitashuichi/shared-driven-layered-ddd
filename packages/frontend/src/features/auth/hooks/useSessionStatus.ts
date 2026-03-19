import { useState } from "react";
import type { AuthCtxType } from "../../../Context";

type Result = AuthCtxType["session"];

export const useSessionStatus = (): Result => {
  const [status, setStatus] = useState<Result["status"]>("idle");

  return { status, setStatus };
}
