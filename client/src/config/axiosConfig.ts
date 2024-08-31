// axiosConfig.ts
import axios,{AxiosError} from "axios";

// Configurar la URL base global
axios.defaults.baseURL = "http://localhost:8085"; // Cambia esto a la URL base de tu API

// Configurar otros valores predeterminados
//axios.defaults.timeout = 10000; // Tiempo de espera para las solicitudes (en milisegundos)
axios.defaults.headers.common["Content-Type"] = "application/json"; // Encabezado común para todas las solicitudes

// Puedes exportar Axios si lo necesitas en otros archivos
export {axios,AxiosError} 
