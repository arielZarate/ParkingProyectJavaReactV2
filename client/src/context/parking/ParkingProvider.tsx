"use client";

import React, { createContext, ReactNode } from "react";
import { ParkingContextType } from "@/interfaces/IParkingContextType";

//======================HOOK==================================
import HookParkingProvider from "@/context/parking/hookParkingProvider";
//================================
interface ParkingProvidersProps {
  children: ReactNode;
}

//====================CONTEXTO=================================
export const ParkingContext = createContext<ParkingContextType | undefined>(
  undefined,
);

const ParkingProvider: React.FC<ParkingProvidersProps> = ({ children }) => {
  const {
    parkings,
    loading,
    searchParking,
    typeVehicle,
    setTypeVehicle,
    status,
    setStatus,
    resetFilter,
  } = HookParkingProvider();
  return (
    <ParkingContext.Provider
      value={{
        parkings,
        loading,
        searchParking,
        typeVehicle,
        setTypeVehicle,
        status,
        setStatus,
        resetFilter,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export default ParkingProvider;
