"use client";
import React, { useContext } from "react";
import { AuthContext } from "./AuthProviders";
import { IAuthContextType } from "@/interfaces/IAuthContextType";

//debo declarar un typo de devolicion que es user y un status
const useHookAuthContext = (): IAuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export { useHookAuthContext };
