import React, { useEffect, useMemo } from 'react'
import { AuthCtx, type AuthCtxType } from './AuthContext'
import { useLogin, useLogout, useRegister, useSessionStatus, useUser } from '../features/auth/hooks';
import { isSessionActive } from '../features/auth/api';
import { useGetUserData } from '../features/auth/hooks/useGetUserData';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionHook = useSessionStatus();
  const registerHook = useRegister(sessionHook.setStatus);
  const loginHook = useLogin(sessionHook.setStatus);
  const logoutHook = useLogout(sessionHook.setStatus);
  const userHook = useUser();
  const getUserHook = useGetUserData(userHook.setUser);

  console.log(sessionHook.status);

  useEffect(() => {
    // セッションを10分おきにチェック
    const checkSession = async () => {
      const isLoggedIn = await isSessionActive();
      console.log(isLoggedIn);
      sessionHook.setStatus(isLoggedIn ? "active" : "idle");
    };
    checkSession();

    const interval = setInterval(async () => await checkSession(), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [sessionHook]);

  useEffect(() => {
    if (sessionHook.status === "active") getUserHook.getUser();
  }, [sessionHook.status, getUserHook]);


  const ctxData: AuthCtxType = useMemo(() => ({
    session: sessionHook,
    register: registerHook,
    login: loginHook,
    logout: logoutHook,
    useUser: userHook,
    getUser: getUserHook
  }), [sessionHook, registerHook, loginHook, logoutHook, userHook, getUserHook]);

  console.log(sessionHook.status);

  return (
    <AuthCtx.Provider value={ctxData}>
      {children}
    </AuthCtx.Provider>
  )
}
