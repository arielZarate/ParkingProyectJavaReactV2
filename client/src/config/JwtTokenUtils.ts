
import { JwtPayload } from "@/interfaces/IJwtPayload";
import {jwtDecode} from "jwt-decode";

// Función para obtener el token y decodificarlo
const getDecodedToken = () => {
  const TOKEN = localStorage.getItem("token");

  if (!TOKEN) {
    throw new Error("Token no disponible");
  }

  try {
    const decodedToken:JwtPayload = jwtDecode(TOKEN); // Decodifica el token JWT
    //console.log("Token decodificado:", decodedToken);
    return decodedToken;
  } catch (error) {
    throw new Error("Token inválido o corrupto");
  }
};


//============funcion que trae el token============



const headerOptions = () => {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      throw new Error("Token no disponible");
    }
   //console.log("TOKEN:", JSON.parse(TOKEN));
  
    const options = {
      headers: {
        Authorization: `Bearer ${JSON.parse(TOKEN)}`, // Añade el token a la cabecera
      },
    };
  
    return options;
  };
  
  

  export {
    headerOptions,
    getDecodedToken
  }
  
  