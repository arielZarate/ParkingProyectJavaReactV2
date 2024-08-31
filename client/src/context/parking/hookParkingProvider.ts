"use client";

import STATUS_VEHICLE from "@/enum/statusVehicle";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import {
  fetchParkings,
  getParkingByLicencePlate,
} from "@/services/parkingService";
import { Parking } from "@/types/parking";
import { useEffect, useState } from "react";

//TODO: hook para descentralizar la logica del Provider de parking

const HookParkingProvider = () => {
  const [allparkings, setAllParkings] = useState<Parking[]>([]);
  //uno esw una copia del otro que sirve para restaurar los valores una vez que se busco todo
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [loading, setLoading] = useState(false);
  const [typeVehicle, setTypeVehicle] = useState<TYPE_VEHICLE>(
    TYPE_VEHICLE.DEFAULT,
  );
  const [status, setStatus] = useState<STATUS_VEHICLE>(STATUS_VEHICLE.DEFAULT);

  //===========FILTER==============================
  //LO UNICO RARO ES EL FILTER DIGAMOS

  const filtered = () => {
    const filteredParking = allparkings?.filter((f) => {
      return (
        (typeVehicle === TYPE_VEHICLE.DEFAULT ||
          f.vehicle.typeVehicle === typeVehicle) &&
        (status === STATUS_VEHICLE.DEFAULT || f.status === status)
      );
    });
    return filteredParking;
  };

  useEffect(() => {
    // Aplica los filtros solo si los parkings ya fueron cargados
    if (allparkings.length > 0) {
      setParkings(filtered());
    }
  }, [typeVehicle, status, allparkings]);

  //=====================================================

  const resetFilter = () => {
    setStatus(STATUS_VEHICLE.DEFAULT);
    setTypeVehicle(TYPE_VEHICLE.DEFAULT);
    setParkings(allparkings);
  };

  // Función para cargar todos los parkings
  const loadParkings = async () => {
    setLoading(true);
    try {
      const result = await fetchParkings();
      setParkings(result);
      setAllParkings(result);
    } catch (error) {
      //usar toast
      console.error("Error fetching parkings", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar parkings por licencia
  //BUSCA DESDE EL BACK NO DESDE EL FRONT
  const searchParking = async (licencePlate: string) => {
    try {
      const parkingFound = await getParkingByLicencePlate(licencePlate);
      //setLoading(true);
      //console.log(parkingFound)
      setParkings(parkingFound);
      // setLoading(false);
    } catch (error) {
      console.error("Error searching parking by licence plate", error);
      // alert(error);
    } finally {
      setLoading(false);
    }
  };

  //carga los parkings
  useEffect(() => {
    loadParkings();
  }, []);

  return {
    //cada elemento que devuelva debo declararlo con su type en el provider
    parkings,
    loading,
    searchParking,
    typeVehicle,
    status,
    setStatus,
    setTypeVehicle,
    resetFilter,
  };
};

export default HookParkingProvider;
