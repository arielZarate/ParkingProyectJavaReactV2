import { AxiosError } from "@/config/axiosConfig";



//esta hanlder funciona con axios :notar que usa el response?.data busca la info del "data"
const handleServiceError = (error: unknown): never => {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data || error.message;
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("A ocurrido un error inesperado");
    }
  };


export default handleServiceError;