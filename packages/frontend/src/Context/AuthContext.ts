import type { User } from "@pkg/shared";
import type { MutationStatus } from "@tanstack/react-query";
import React, { createContext, useContext, type SetStateAction } from "react";


/* 各Hookの型定義 ↓ */

type Register = {
  status: MutationStatus,
  register: (e: React.SubmitEvent<HTMLFormElement>) => void
};

type Login = {
  status: Exclude<MutationStatus, "success"> | "loggedIn",
  errorMessage: string | null
  login: (e: React.SubmitEvent<HTMLFormElement>) => void
};

type Logout = {
  status: Exclude<MutationStatus, "success"> | "loggedOut",
  logout: () => void
};

type Session = {
  status: "idle" | "inactive" | "active",
  setStatus: React.Dispatch<Session["status"]>
};

type GetSession = {
  getSession: () => Promise<void>
};

type GetUser = {
  status: MutationStatus,
  errorMessage: string | null,
  getUser: () => Promise<void>
};

type UseUser = {
  user: User | null,
  setUser: React.Dispatch<SetStateAction<User | null>>
};

/* ↑ 各Hookの型定義 */


export type AuthCtxType = {
  register: Register, login: Login, logout: Logout, session: Session, getSession: GetSession, getUser: GetUser, useUser: UseUser
}


export const AuthCtx = createContext<AuthCtxType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (ctx === null) throw new Error("AuthCtx must be used within Provider");
  return ctx;
}
