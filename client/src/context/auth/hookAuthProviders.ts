import { useState, useEffect } from "react";
import { axios } from "@/config/axiosConfig";
import handleServiceError from "@/utils/handleServiceError";
import { AuthLogin, loginProp } from "@/interfaces/IAuthContextType";
import AuthStatus from "@/enum/authStatus";
import useLocalStorage from "@/hooks/useLocalStorage";

const HookAuthProviders = () => {
  // Usa el hook de sessionStorage para manejar el estado del usuario

  const [user, setUser] = useLocalStorage<AuthLogin | null>("token", null);
  const [status, setStatus] = useState<AuthStatus | null>(null);

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

  useEffect(() => {
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, manejar el estado de inicio de sesión o loguear el usuario
    if (user) {
      setStatus(AuthStatus.AUTHENTICATED);
    } else {
      setStatus(AuthStatus.UNAUTHENTICATED);
      localStorage.removeItem("token");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null); // Limpiar el estado del usuario
    localStorage.removeItem("token"); // Limpiar el token de sessionStorage
    setStatus(AuthStatus.UNAUTHENTICATED);
  };

  return {
    handleLogin,
    user,
    status,
    handleLogout,
  };
};

export default HookAuthProviders;
