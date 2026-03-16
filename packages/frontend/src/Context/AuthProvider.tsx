import React, { useEffect } from 'react'
import { AuthCtx, type AuthCtxType } from './AuthContext'
import { useLogin, useLogout, useRegister, useSessionStatus } from '../features/auth/hooks';
import { isSessionActive } from '../features/auth/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const useSession = useSessionStatus();

  useEffect(() => {
    const check = async () => {
      const isLoggedIn = await isSessionActive();
      if (isLoggedIn) useSession.setStatus("active");
    };
    check();

    const interval = setInterval(async () => await check(), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const ctxData: AuthCtxType = {
    register: useRegister(useSession),
    login: useLogin(useSession),
    logout: useLogout(useSession),
    session: useSession
  }

  return (
    <AuthCtx.Provider value={ctxData}>
      {children}
    </AuthCtx.Provider>
  )
}
