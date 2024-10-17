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
import useSweetAlertHook from "@/components/SweetAlert/useSweet";
const HookAuthProviders = () => {
  // Usa el hook de sessionStorage para manejar el estado del usuario

  const [user, setUser] = useLocalStorage<AuthLogin | null>("token", null);
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const { showAlert, SweetPosition, SweetType } = useSweetAlertHook();
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
  const getDecodedToken = (): JwtPayload | null => {
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
      // console.error("Error al decodificar el token", error);
      return null;
    }
  };

  //USE EFFCT QUE MANEJA EL ESTADO DE LOGIN DEPENDIENDO DEÑ USER : user.token del localStorage
  useEffect(() => {
    if (user) {
      setStatus(AuthStatus.AUTHENTICATED);
      showAlert({
        title: "Usuario logueado",
        text: "Sera redirigido a Home",
        position: SweetPosition.CENTER,
        time: 2500,
      });

      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } else {
      //setStatus(AuthStatus.UNAUTHENTICATED);
      //localStorage.removeItem("token");

      handleLogout();
    }
  }, [router, user]);

  /*
  const handleLogout = () => {
   // showAlert({title: "USER SESION",type:SweetType.INFO, text:"Se ha cerrado sesion con exito!",time:2000})
   showAlert({title:"USER LOGIN",text:"ha cerrado session",position:SweetPosition.CENTER , time:2500})
   
    setUser(null); // Limpiar el estado del usuario
    localStorage.removeItem("token"); // Limpiar el token de sessionStorage
    cachedDecodedToken = null; // Limpiar la caché del decodedToken
    setStatus(AuthStatus.UNAUTHENTICATED);
     
     // router.push("/")
  
  };*/

  const handleLogout = () => {
    // Mostrar el mensaje antes de realizar cualquier acción
    showAlert({
      title: "Sesión cerrada",
      text: "Cerrando sesión.",
      position: SweetPosition.CENTER,
      type: SweetType.INFO, // Tipo de alerta (informativa, éxito, etc.)
      time: 2500, // Duración de la alerta (en milisegundos)
    });

    // Utilizar un timeout para dar tiempo a que el mensaje se muestre
    setTimeout(() => {
      setUser(null); // Limpiar el estado del usuario
      localStorage.removeItem("token"); // Limpiar el token de localStorage
      cachedDecodedToken = null; // Limpiar la caché del decodedToken
      setStatus(AuthStatus.UNAUTHENTICATED);

      // Redirigir o realizar otras acciones después de mostrar la alerta
      router.push("/"); // Redirigir al usuario al inicio o página de login
    }, 2500); // Ajustar el tiempo del timeout al mismo que la duración de la alerta
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
