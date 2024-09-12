import React, { createContext, ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IAuthContextType from "@/interfaces/IAuthContextType";

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined,
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const { data: session, status } = useSession(); //hook de nextAuth
  const [user, setUser] = useState<any>(null);

  //hook que se carga y setea dependiendo de la session

  /*
    useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  */
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
