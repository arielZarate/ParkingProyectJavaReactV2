import { axios } from "@/config/axiosConfig";
import { headerOptions } from "@/config/headerOptions";
import handleServiceError from "@/utils/handleServiceError";
import { IEmployee } from "@/interfaces/IEmployee";

const optionsHeader = headerOptions();

//==============busca empleado por id============================
export const findEmployeeById = async (
  idEmployee: number,
): Promise<IEmployee | undefined> => {
  try {
    const result = await axios.get(`/api/employees/${idEmployee}`, {
      ...optionsHeader,
    });

    // Mapeo de los datos recibidos a la interfaz IEmployee
    const employee: IEmployee = {
      fullName: result.data.fullName,
      dni: result.data.dni,
      phoneNumber: result.data.phoneNumber,
      roleUser: result.data.roleUser, // Cambia "roleUser" si es necesario
      email: result.data.email,
      bio: result.data.bio,
    };

    return employee;
  } catch (error) {
    handleServiceError(error);
    throw new Error("Error al obtener el empleado."); // Lanza un error si hay fallo
  }
};
