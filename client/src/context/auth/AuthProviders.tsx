import React, { createContext, ReactNode } from "react";

import { IAuthContextType, loginProp } from "@/interfaces/IAuthContextType";
import HookAuthProviders from "./hookAuthProviders";

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined,
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user ,status,handleLogout,handleLogin } = HookAuthProviders();
  console.log("Hook providers", user);
  console.log("Hook Status", status);



  return (
    <AuthContext.Provider value={{ user, handleLogin,status,handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
