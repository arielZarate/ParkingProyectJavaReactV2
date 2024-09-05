import { IEmployee } from "./IEmployee";
import { IRate } from "./IRate";
import { IVehicle } from "./IVehicle";


export interface IParking{
   id: number;
  entryTime: string; // Puede ser Date si prefieres convertirlo
  exitTime: string | null; // Puede ser Date si prefieres convertirlo
  vehicle: IVehicle;
  employee: IEmployee;
  rate: IRate;
  status: string;
  hours: number;
  cost: number;
}


//=============Pageable=======================
interface Sort{
    sorted:boolean;
    unsorted:boolean;
    empty:boolean;
}


interface Pageable{
    pageNumber:number;
    pageSize:number;
    sort:Sort;
    offset:number;
    paged:boolean;
    unpaged:boolean;
}

//interface Page la que devuelve todos los datos del Page

export interface IPage<T>
{
    totalPages:number;
    totalElements:number;
    pageable:Pageable;
    size:number;
    content:T[];
    number:number;
    sort:Sort;
    first:boolean;
    last:boolean;
    numberOfElements:number;
    empty:boolean;
}
//====================================