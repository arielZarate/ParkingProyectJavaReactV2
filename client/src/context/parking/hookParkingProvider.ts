"use client";

import paginationConfig from "@/config/paginationConfig";
import STATUS_VEHICLE from "@/enum/statusVehicle";
import SORT from "@/enum/typeSort";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import { IPage, IParking } from "@/interfaces/IParking";

import {
  fetchParkingsPageable,
  getParkingByLicencePlate,
} from "@/services/parkingPageableService";
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
  const [sorted, setSorted] = useState<SORT>(paginationConfig.defaultSort);

  //============PAGINADO===============
  // Estados adicionales para manejar la paginación
  const [currentPage, setCurrentPage] = useState(paginationConfig.defaultPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  //=============================================================
  //metodo para setear datos
  const resetFilter = () => {
    setStatus(STATUS_VEHICLE.DEFAULT);
    setTypeVehicle(TYPE_VEHICLE.DEFAULT);
    setParkings(allparkings);
  };

  // Función para buscar parkings por licencia
  //BUSCA DESDE EL BACK NO DESDE EL FRONT
  const searchParking = async (licencePlate: string) => {
    try {
      const parkingFound = await getParkingByLicencePlate(
        licencePlate,
        paginationConfig.defaultPage,
        paginationConfig.defaultSize,
        `id,${paginationConfig.defaultSort}`,
      );
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
  const loadParkings = async (
    ORDER: SORT,
    status: STATUS_VEHICLE,
    typeVehicle: TYPE_VEHICLE,
    page: number,
  ) => {
    setLoading(true);
    try {
      const result: IPage<IParking> = await fetchParkingsPageable(
        page,
        paginationConfig.defaultSize,
        `id,${ORDER}`,
        //ACA ESTA LA MAGIA DEL FILTRADO DONDE MANDO LOS PARAMS
        status !== STATUS_VEHICLE.DEFAULT ? status : undefined, //filtra por estado sino es default
        typeVehicle !== TYPE_VEHICLE.DEFAULT ? typeVehicle : undefined, //filtra por tipo de vehiculo sino es default
      );
      setParkings(result);
      setAllParkings(result);

      //ACTUALIZO EL ESTADO DE EL PAGINADO
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
      setCurrentPage(result.number);
    } catch (error) {
      //usar toast
      console.error("Error fetching parkings", error);
    } finally {
      setLoading(false);
    }
  };

  // Cambiar la página actual y recargar los parkings
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    loadParkings(sorted, status, typeVehicle, newPage); // Recargar los parkings con la nueva página
  };

  useEffect(() => {
    //ahora  para el filtrado mando los parametros en el fetch
    loadParkings(sorted, status, typeVehicle, currentPage);
  }, [sorted, status, typeVehicle, currentPage]);
  //===========================================================
  return {
    //cada elemento que devuelva debo declararlo con su type en el provider
    parkings,
    loading,
    searchParking,
    typeVehicle, //filtro de tipo de vehiculo
    status, //filtro de estado finalizado o en proceso
    setStatus,
    setTypeVehicle,
    resetFilter,
    sorted, //filtro de orden
    setSorted,

    currentPage, // Página actual
    totalPages, // Total de páginas
    totalElements, // Total de elementos
    setCurrentPage, // Cambiar página desde el componente de paginación
  };
};

export default HookParkingProvider;

//===========FILTRADO POR FRONT==============================
//NOTA:  el filtrado nuevo va al back

/*
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
        content: filtered(),
      });
    }
  }, [typeVehicle, status, allparkings]);

  //=====================================================

  =================================================================
*/
