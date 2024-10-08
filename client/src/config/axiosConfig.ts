// axiosConfig.ts
import axios, { AxiosError } from "axios";

// Configurar la URL base global
axios.defaults.baseURL = "http://localhost:8085"; // Cambia esto a la URL base de tu API

// Configurar otros valores predeterminados
//axios.defaults.timeout = 10000; // Tiempo de espera para las solicitudes (en milisegundos)
axios.defaults.headers.common["Content-Type"] = "application/json"; // Encabezado común para todas las solicitudes



/*
// Configuración global de Axios para manejo de tokens
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`; // Agregar el token a la cabecera
    }

    console.log("axios config", config)
    return config; // Retornar la configuración modificada
  },
  (error: AxiosError) => {
    // Manejo de errores si es necesario
    return Promise.reject(error);
  },
);


//ME ANDA MAL EL INTERCEPTOR
*/

// Manejo de respuestas para manejar errores globalmente (opcional)
axios.interceptors.response.use(
  (response) => {
    return response; // Retornar la respuesta si es exitosa
  },
  (error: AxiosError) => {
    // Manejo de errores en las respuestas
    console.error("Error en la solicitud:", error);
    // Aquí puedes agregar lógica adicional para manejar el error, como redirecciones
    return Promise.reject(error);
  },
);
// Puedes exportar Axios si lo necesitas en otros archivos
export { axios, AxiosError };
