// services/parkingService.ts

import { axios } from "@/config/axiosConfig";
import { IParking } from "@/interfaces/IParking";
import { ISaveParkingProp } from "@/interfaces/ISaveParkingProp";
import handleServiceError from "@/utils/handleServiceError";
import { getDecodedToken, headerOptions } from "@/config/JwtTokenUtils";


const {id}=getDecodedToken();  //decodifico el token
const optionsHeaders = headerOptions(); //obtengo el header:Autorization

export const fetchParkings = async (): Promise<IParking[]> => {
  try {
    const response = await axios.get<IParking[]>("/api/parking", {
      ...optionsHeaders,
    });
    const data = response.data;
    //console.log("datos", JSON.stringify(data));
    return data;
  } catch (error) {
    handleServiceError(error);

    //en caso de error devolver un array
    return [];
  }
};

//===========================================
//debo importar el id del empleado cuando este logueado
const employeeId = id;
//========================================

export const postParkings = async (
  parking: ISaveParkingProp,
): Promise<IParking | undefined> => {
  try {
    const response = await axios.post<IParking>(
      `/api/parking/save/${employeeId}`,
      parking,
      {
        ...optionsHeaders,
      },
    );
    //console.log("response\n",response)
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
};

export const postFinalizeParkings = async (
  licencePlate: string,
): Promise<IParking | undefined> => {
  try {
    const response = await axios.post<IParking>(
      `/api/parking/finalize/${licencePlate}`,
      {},
      {
        ...optionsHeaders,
      },
    );
    //console.log("response\n",response)
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
};

export const getParkingByLicencePlate = async (
  licencePlate: string,
): Promise<IParking[]> => {
  try {
    const response = await axios.get<IParking[]>(
      `/api/parking/licencePlate/${licencePlate}`,
      { ...optionsHeaders },
    );
    //console.log("response\n",response.data)
    return response.data;
  } catch (error) {
    handleServiceError(error);
    return [];
  }
};
