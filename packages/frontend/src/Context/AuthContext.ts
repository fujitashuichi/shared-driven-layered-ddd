import React, { createContext, useContext } from "react";

type Register = {
  status: "idle" | "loading" | "failed" | "success",
  register: (e: React.SubmitEvent<HTMLFormElement>) => void
};
type Login = {
  status: "idle" | "loading" | "failed" | "loggedIn",
  login: (e: React.SubmitEvent<HTMLFormElement>) => void
};
type Logout = {
  status: "idle" | "loading" | "loggedOut",
  logout: () => void
};
type Session = {
  status: "idle" | "active",
  setStatus: React.Dispatch<Session["status"]>
};

export type AuthCtxType = {
  register: Register, login: Login, logout: Logout, session: Session
}


export const AuthCtx = createContext<AuthCtxType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (ctx === null) throw new Error("AuthCtx must be used within Provider");
  return ctx;
}
