import STATUS_VEHICLE from "@/enum/statusVehicle";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import { IPage, IParking } from "@/interfaces/IParking";

export interface ParkingContextType {
  parkings: IPage<IParking>; //se debio cambiar
  //parkings:IParking[]
  loading: boolean;
  typeVehicle: TYPE_VEHICLE;
  status: STATUS_VEHICLE;
  setStatus: (status: STATUS_VEHICLE) => void;
  setTypeVehicle: (typeVehicle: TYPE_VEHICLE) => void;
  resetFilter: () => void;
  //setFilter:Dispatch<SetStateAction<{typeVehicle:TYPE_VEHICLE;status:STATUS_VEHICLE}>>
  searchParking: (licencePlate: string) => void;
}
