"use client";

import { useContext } from "react";

import { ParkingContext } from "@/context/parking/ParkingProvider";
import { ParkingContextType } from "@/interfaces/IParkingContextType";

// Hook para usar el contexto de Parking con validación
const useHookParkingContext = (): ParkingContextType => {
  const context = useContext(ParkingContext);
  // console.log("hook", context);
  if (context === undefined) {
    throw new Error(
      "useParkingContext debe ser usado dentro de un ParkingProvider",
    );
  }
  return context;
};

export default  useHookParkingContext;
//TODO: importo del Contexto y paso a hook para ser uaso por los components
