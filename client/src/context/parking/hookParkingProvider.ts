"use client";

import paginationConfig from "@/config/paginationConfig";
import STATUS_VEHICLE from "@/enum/statusVehicle";
import SORT from "@/enum/typeSort";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import { IPage, IParking } from "@/interfaces/IParking";

import { fetchParkingsPageable, getParkingByLicencePlate } from "@/services/parkingPageableService";
import { useEffect, useState } from "react";

//TODO: hook para descentralizar la logica del Provider de parking
//      aca esta toda la logica 

const HookParkingProvider = () => {
  const [allparkings, setAllParkings] = useState<IPage<IParking> | null>(null);
  //uno esw una copia del otro que sirve para restaurar los valores una vez que se busco todo
  const [parkings, setParkings] = useState<IPage<IParking> | null>(null);
  const [loading, setLoading] = useState(false);
  const [typeVehicle, setTypeVehicle] = useState<TYPE_VEHICLE>(
    TYPE_VEHICLE.DEFAULT,
  );
  const [status, setStatus] = useState<STATUS_VEHICLE>(STATUS_VEHICLE.DEFAULT);
  const [sorted,setSorted]=useState<SORT>(paginationConfig.defaultSort)




  //===========FILTER==============================
  //LO UNICO RARO ES EL FILTER DIGAMOS

  const filtered = () => {
    const filteredParking = allparkings?.content.filter((f) => {
      return (
        (typeVehicle === TYPE_VEHICLE.DEFAULT ||
          f.vehicle.typeVehicle === typeVehicle) &&
        (status === STATUS_VEHICLE.DEFAULT || f.status === status)
      );
    });
    return filteredParking ?? [];
  };

  useEffect(() => {
    // Aplica los filtros solo si los parkings ya fueron cargados
    if (allparkings?.content) {
      setParkings({
          ...allparkings,
          content:filtered(),
        });
  }
  }, [typeVehicle, status, allparkings]);

  //=====================================================

  const resetFilter = () => {
    setStatus(STATUS_VEHICLE.DEFAULT);
    setTypeVehicle(TYPE_VEHICLE.DEFAULT);
    setParkings(allparkings);
  };


  // Función para buscar parkings por licencia
  //BUSCA DESDE EL BACK NO DESDE EL FRONT
  const searchParking = async (licencePlate: string) => {
    try {
      const parkingFound = await getParkingByLicencePlate(licencePlate,paginationConfig.defaultPage,paginationConfig.defaultSize,`id,${paginationConfig.defaultSort}`);
      setLoading(true);
      //console.log(parkingFound)
     setParkings(parkingFound);
       setLoading(false);
    } catch (error) {
      console.error("Error searching parking by licence plate", error);
      // alert(error);
    } finally {
      setLoading(false);
    }
  };


  //carga los parkings
  //============================================================

    // Función para cargar todos los parkings
    const loadParkings = async (ORDER:SORT) => {
      setLoading(true);
      try {
        const result:IPage<IParking> = await fetchParkingsPageable(paginationConfig.defaultPage,paginationConfig.defaultSize,`id,${ORDER}`,

/**
 * 
 *  status !== STATUS_VEHICLE.DEFAULT ? status : undefined,
        typeVehicle !== TYPE_VEHICLE.DEFAULT ? typeVehicle : undefined
 * 
 */

        );
        setParkings(result);
        setAllParkings(result);
      } catch (error) {
        //usar toast
        console.error("Error fetching parkings", error);
      } finally {
        setLoading(false);
      }
    };
  
  useEffect(() => {
    loadParkings(sorted);
  }, [sorted]);
  //===========================================================
  return {
    //cada elemento que devuelva debo declararlo con su type en el provider
    parkings,
    loading,
    searchParking,
    typeVehicle,   //filtro de tipo de vehiculo
    status,//filtro de estado finalizado o en proceso
    setStatus, 
    setTypeVehicle,
    resetFilter,
    sorted, //filtro de orden
    setSorted
  };
};

export default HookParkingProvider;
