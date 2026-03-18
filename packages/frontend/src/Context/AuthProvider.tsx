import React, { useEffect, useMemo } from 'react'
import { AuthCtx, type AuthCtxType } from './AuthContext'
import { useLogin, useLogout, useRegister, useSessionStatus, useUser } from '../features/auth/hooks';
import { isSessionActive } from '../features/auth/api';
import { useGetUserData } from '../features/auth/hooks/useGetUserData';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionHook = useSessionStatus();
  const registerHook = useRegister(sessionHook);
  const loginHook = useLogin(sessionHook);
  const logoutHook = useLogout(sessionHook);
  const userHook = useUser();
  const getUserHook = useGetUserData(userHook.setUser);

  useEffect(() => {
    // セッションを10分おきにチェック
    const checkSession = async () => {
      const isLoggedIn = await isSessionActive();
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

  return (
    <AuthCtx.Provider value={ctxData}>
      {children}
    </AuthCtx.Provider>
  )
}
