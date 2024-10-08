import React, { createContext, ReactNode, useState, useEffect } from "react";

import { IAuthContextType, loginProp } from "@/interfaces/IAuthContextType";
import HookAuthProviders from "./hookAuthProviders";

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined,
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loginService ,status,handleLogout} = HookAuthProviders();
  console.log("Hook providers", user);

  const handleLogin = async (data: loginProp) => {
    const result = await loginService(data);
    if (result) {
      
    return result;
    }
    else {
      return null ;
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin,status,handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
