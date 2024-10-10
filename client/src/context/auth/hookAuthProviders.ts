"use client";
import { useState, useEffect } from "react";
import { axios } from "@/config/axiosConfig";
import handleServiceError from "@/utils/handleServiceError";
import { AuthLogin, loginProp } from "@/interfaces/IAuthContextType";
import AuthStatus from "@/enum/authStatus";
import useLocalStorage from "@/hooks/useLocalStorage";
import { JwtPayload } from "@/interfaces/IJwtPayload";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const HookAuthProviders = () => {
  // Usa el hook de sessionStorage para manejar el estado del usuario

  const [user, setUser] = useLocalStorage<AuthLogin | null>("token", null);
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const router = useRouter();

  //cache de token
  let cachedDecodedToken: JwtPayload | null = null;

  //================================================================
  const handleLogin = async ({
    email,
    password,
  }: loginProp): Promise<AuthLogin | null> => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const userAuthenticated = res.data;
      if (res.status === 200 && userAuthenticated) {
        // console.log(userAuthenticated)
        localStorage.setItem("token", JSON.stringify(userAuthenticated.token)); // Guardar el token en localStorage
        //  setUser(userAuthenticated); // Actualiza el usuario en el contexto

        return userAuthenticated;
      } else {
        return null;
      }
    } catch (error) {
      handleServiceError(error);
      return null;
    }
  };

  //TOKEN DECODIFICADO PARA OBTENER EL ID ROLE EMAIL
  const getDecodedToken = (): JwtPayload => {
    if (cachedDecodedToken) {
      return cachedDecodedToken;
    }
    try {
      const TOKEN = localStorage.getItem("token");
      if (!TOKEN) {
        throw new Error("Token no disponible");
      }
      const decodedToken: JwtPayload = jwtDecode(TOKEN); // Decodifica el token JWT
      cachedDecodedToken = decodedToken; // Almacena en caché el token decodificado
      return decodedToken;
    } catch (error) {
      throw new Error("Error al decodificar el token");
    }
  };

  //USE EFFCT QUE MANEJA EL ESTADO DE LOGIN DEPENDIENDO DEÑ USER : user.token del localStorage
  useEffect(() => {
    if (user) {
      setStatus(AuthStatus.AUTHENTICATED);
      router.push("/home");
    } else {
      //setStatus(AuthStatus.UNAUTHENTICATED);
      //localStorage.removeItem("token");
      handleLogout();
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null); // Limpiar el estado del usuario
    localStorage.removeItem("token"); // Limpiar el token de sessionStorage
    cachedDecodedToken = null; // Limpiar la caché del decodedToken
    setStatus(AuthStatus.UNAUTHENTICATED);
    router.push("/");
  };

  return {
    handleLogin,
    user,
    status,
    handleLogout,
    getDecodedToken,
  };
};

export default HookAuthProviders;
