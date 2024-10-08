import { useState, useEffect } from "react";
import { axios } from "@/config/axiosConfig";
import handleServiceError from "@/utils/handleServiceError";
import { AuthLogin, loginProp } from "@/interfaces/IAuthContextType";
import useSessionStorage from "@/hooks/useSessionStorage";
import AuthStatus from "@/enum/authStatus";

const HookAuthProviders = () => {
  // Usa el hook de sessionStorage para manejar el estado del usuario
  const [user, setUser] = useSessionStorage<AuthLogin | null>("token", null);
  const [status, setStatus] = useState<AuthStatus | null>(null);

  const loginService = async ({
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
        setUser(userAuthenticated); // Actualiza el usuario en el contexto

        return userAuthenticated;
      } else {
        return null;
      }
    } catch (error) {
      handleServiceError(error);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("token", JSON.stringify(user.token)); // Guardar usuario en sessionStorage

      // Guardar datos del usuario en localStorage
      localStorage.setItem("id", JSON.stringify(user.id));
      localStorage.setItem("email", JSON.stringify(user.email));
      localStorage.setItem("role", JSON.stringify(user.role));
    } else {
      sessionStorage.removeItem("token"); // Eliminar el usuario si no está logueado

      // Limpiar localStorage si no hay usuario
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
    }
  }, [user]);

  useEffect(() => {
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, manejar el estado de inicio de sesión o loguear el usuario
    if (user?.token) {
      setStatus(AuthStatus.AUTHENTICATED);
    } else {
      setStatus(AuthStatus.UNAUTHENTICATED);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null); // Limpiar el estado del usuario
    sessionStorage.removeItem("token"); // Limpiar el token de sessionStorage
  
    // Limpiar otros datos de localStorage si es necesario
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  return {
    loginService,
    user,
    status,
    handleLogout
  };
};

export default HookAuthProviders;
