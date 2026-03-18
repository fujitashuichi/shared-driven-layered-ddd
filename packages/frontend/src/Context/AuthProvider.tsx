import React, { useEffect, useMemo } from 'react'
import { AuthCtx, type AuthCtxType } from './AuthContext'
import { useLogin, useLogout, useRegister, useSessionStatus, useUser } from '../features/auth/hooks';
import { isSessionActive } from '../features/auth/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const useSessionHook = useSessionStatus();
  const useRegisterHook = useRegister(useSessionHook);
  const useLoginHook = useLogin(useSessionHook);
  const useLogoutHook = useLogout(useSessionHook);
  const userData = useUser();

  useEffect(() => {
    const check = async () => {
      const isLoggedIn = await isSessionActive();
      if (isLoggedIn) useSessionHook.setStatus("active");
    };
    check();

    const interval = setInterval(async () => await check(), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const ctxData: AuthCtxType = useMemo(() => ({
    session: useSessionHook,
    register: useRegisterHook,
    login: useLoginHook,
    logout: useLogoutHook,
    user: userData
  }), [useSessionHook, useRegisterHook, useLoginHook, useLogoutHook, userData]);

  return (
    <AuthCtx.Provider value={ctxData}>
      {children}
    </AuthCtx.Provider>
  )
}
