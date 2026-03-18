import React, { useEffect, useMemo } from 'react'
import { AuthCtx, type AuthCtxType } from './AuthContext'
import { useLogin, useLogout, useRegister, useSessionStatus, useUser } from '../features/auth/hooks';
import { isSessionActive } from '../features/auth/api';
import { useGetUserData } from '../features/auth/hooks/useGetUserData';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const useSessionHook = useSessionStatus();
  const useRegisterHook = useRegister(useSessionHook);
  const useLoginHook = useLogin(useSessionHook);
  const useLogoutHook = useLogout(useSessionHook);
  const userData = useUser();
  const useGetUser = useGetUserData(userData.setUser);

  useEffect(() => {
    // セッションを10分おきにチェック
    const checkSession = async () => {
      const isLoggedIn = await isSessionActive();
      useSessionHook.setStatus(isLoggedIn ? "active" : "idle");
    };
    checkSession();

    const interval = setInterval(async () => await checkSession(), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [useSessionHook]);

  useEffect(() => {
    if (useSessionHook.status === "active") useGetUser.getUser();
  }, [useSessionHook.status, useGetUser]);


  const ctxData: AuthCtxType = useMemo(() => ({
    session: useSessionHook,
    register: useRegisterHook,
    login: useLoginHook,
    logout: useLogoutHook,
    user: userData,
    getUser: useGetUser
  }), [useSessionHook, useRegisterHook, useLoginHook, useLogoutHook, userData, useGetUser]);

  return (
    <AuthCtx.Provider value={ctxData}>
      {children}
    </AuthCtx.Provider>
  )
}
