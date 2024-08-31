// services/parkingService.ts

import {axios,AxiosError} from "@/config/axiosConfig";
import { ISaveParkingProp } from "@/interfaces/ISaveParkingProp";
import { Parking } from "@/types/parking";
import handleServiceError from "@/utils/handleServiceError";


export const fetchParkings = async (): Promise<Parking[]> => {
  try {
    const response = await axios.get<Parking[]>("/api/parking");
    const data = response.data;
    //console.log("datos", JSON.stringify(data));
    return data;
  } catch (error) {
   handleServiceError(error)

   //en caso de error devolver un array
   return [];
  }
};

//===========================================
//debo importar el id del empleado cuando este logueado
const employeeId=1;
//========================================


export const postParkings = async (parking:ISaveParkingProp): Promise<Parking | undefined> => {
  try {
    const response = await axios.post<Parking>(`/api/parking/save/${employeeId}`, parking);
    //console.log("response\n",response)
    return response.data;
  } catch (error) {
    handleServiceError(error);
  }
};




export const postFinalizeParkings = async (licencePlate:string): Promise<Parking | undefined> => {
  try {
    const response = await axios.post<Parking>(`/api/parking/finalize/${licencePlate}`);
    //console.log("response\n",response)
    return response.data;
  } catch (error) {
      handleServiceError(error);
  }
};



export const getParkingByLicencePlate=async(licencePlate:string):Promise<Parking[]> =>{
  try {
    const response = await axios.get<Parking[]>(`/api/parking/licencePlate/${licencePlate}`);
    //console.log("response\n",response.data)
    return response.data;
  } catch (error) {
      handleServiceError(error);
      return [];
  }

}



//==============datos harckodeados============
export const data = [
  {
    id: 1,
    entryTime: "2024-08-24T11:49:00",
    exitTime: "2024-08-24T11:50:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 2,
    entryTime: "2024-08-24T12:05:00",
    exitTime: "2024-08-24T12:09:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 3,
    entryTime: "2024-08-24T12:10:00",
    exitTime: "2024-08-24T12:13:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 4,
    entryTime: "2024-08-24T12:15:00",
    exitTime: "2024-08-24T12:17:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 5,
    entryTime: "2024-08-24T12:17:00",
    exitTime: "2024-08-24T12:17:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 4,
    cost: 120.0,
  },
  {
    id: 6,
    entryTime: "2024-08-24T12:19:00",
    exitTime: "2024-08-24T12:19:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 7,
    entryTime: "2024-08-24T12:19:00",
    exitTime: "2024-08-24T12:21:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 8,
    entryTime: "2024-08-24T12:22:00",
    exitTime: "2024-08-24T12:23:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 9,
    entryTime: "2024-08-24T12:28:00",
    exitTime: "2024-08-24T12:28:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 10,
    entryTime: "2024-08-24T12:29:00",
    exitTime: "2024-08-24T12:31:00",
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "COMPLETED",
    hours: 0,
    cost: 40.0,
  },
  {
    id: 11,
    entryTime: "2024-08-24T12:31:00",
    exitTime: null,
    vehicle: {
      id: 1,
      typeVehicle: "CAR",
      licencePlate: "PIT011",
      color: "BROWN",
      note: "Vehiclo con espejo derecho roto",
    },
    employee: {
      id: 1,
      fullName: "juan sanchez",
      dni: "7458697",
      phoneNumber: "3314567",
      roleUser: "EMPLOYEE",
      email: "juan@gmail.com",
      password: "Admin1234!",
    },
    rate: {
      id: 1,
      typeVehicle: "CAR",
      costPerHour: 40.0,
    },
    status: "IN_PROGRESS",
    hours: 1,
    cost: 0.0,
  },
];
