import React, { useEffect, useMemo } from 'react'
import { AuthCtx, type AuthCtxType } from './AuthContext'
import { useLogin, useLogout, useRegister, useSessionStatus, useUser } from '../features/auth/hooks';
import { useGetUserData } from '../features/auth/hooks/useGetUserData';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sessionHook = useSessionStatus();
  const registerHook = useRegister(sessionHook.setStatus);
  const loginHook = useLogin(sessionHook.setStatus);
  const logoutHook = useLogout(sessionHook.setStatus);
  const userHook = useUser();
  const getUserHook = useGetUserData(userHook.setUser);

  const { status, setStatus } = sessionHook;
  const { getUser } = getUserHook;

  useEffect(() => {
    // セッションを10分おきにチェック
    const checkSession = async () => {
      console.info("session:", status);
      setStatus(status ? "active" : "inactive");
    };
    checkSession();

    const interval = setInterval(async () => await checkSession(), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [status, setStatus]);


  useEffect(() => {
    if (status === "active") getUser();
  }, [status]);


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
