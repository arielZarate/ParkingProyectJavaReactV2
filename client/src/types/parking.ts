
import { Employee } from "./employee";
import { Rate } from "./rate";
import { Vehicle } from "./vehicle";


export type Parking = {
  id: number;
  entryTime: string; // Puede ser Date si prefieres convertirlo
  exitTime: string | null; // Puede ser Date si prefieres convertirlo
  vehicle: Vehicle;
  employee: Employee;
  rate: Rate;
  status: string;
  hours: number;
  cost: number;
};


