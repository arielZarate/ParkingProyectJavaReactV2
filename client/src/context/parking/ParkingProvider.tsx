"use client";

import { ParkingContextType } from "@/interfaces/IParkingContextType";
import React, { createContext, ReactNode } from "react";

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
    sorted,
    setSorted,

    //pagination
    currentPage,
    totalPages,
    totalElements,
    setCurrentPage,
  } = HookParkingProvider();
  return (
    <ParkingContext.Provider
      value={{
        parkings,
        loading,
        //search
        searchParking,
        //tipo de vehiculo
        typeVehicle,
        setTypeVehicle,
        //estado
        status,
        setStatus,
        //orden
        sorted,
        setSorted,
        //borrar filtros
        resetFilter,
        //pagination
        currentPage,
        totalPages,
        totalElements,
        setCurrentPage,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export default ParkingProvider;
