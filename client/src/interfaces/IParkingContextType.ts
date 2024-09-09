import STATUS_VEHICLE from "@/enum/statusVehicle";
import SORT from "@/enum/typeSort";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import { IPage, IParking } from "@/interfaces/IParking";

export interface ParkingContextType {
  parkings: IPage<IParking> | null; //se debio cambiar
  //parkings:IParking[]
  loading: boolean;
  typeVehicle: TYPE_VEHICLE;
  setTypeVehicle: (typeVehicle: TYPE_VEHICLE) => void;
  status: STATUS_VEHICLE;
  setStatus: (status: STATUS_VEHICLE) => void;
  sorted: SORT;
  setSorted: (sorted: SORT) => void;
  resetFilter: () => void;
  //setFilter:Dispatch<SetStateAction<{typeVehicle:TYPE_VEHICLE;status:STATUS_VEHICLE}>>
  searchParking: (licencePlate: string) => void;

  //pagination
  currentPage: number;
  totalPages: number;
  totalElements: number;
  setCurrentPage: (page: number) => void;
}
