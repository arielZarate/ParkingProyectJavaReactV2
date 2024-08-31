
import TYPE_VEHICLE  from "@/enum/typeVehicle";
import { Color } from "@/enum/colorVehicle";


export interface ISaveParkingProp{
  typeVehicle:TYPE_VEHICLE;
  licencePlate:string;
  color:Color;
  note:string
  }
