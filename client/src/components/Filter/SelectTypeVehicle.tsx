"use client";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaParking } from "react-icons/fa";

import useHookParkingContext from "@/context/parking/useHookParkingContext";


interface ITypeVehicleProp {
  typeVehicle: TYPE_VEHICLE;
}



const SelectTypeVehicle: FC = () => {
  const { register, watch, setValue } = useForm<ITypeVehicleProp>();

  // Observa el valor seleccionado
  const selectedTypeVehicle = watch("typeVehicle");
  const { setTypeVehicle, typeVehicle } = useHookParkingContext();
  useEffect(() => {
    if (selectedTypeVehicle) {
      setTypeVehicle(selectedTypeVehicle);
    }
  }, [selectedTypeVehicle]);

  // Si el filtro en el contexto cambia, actualiza el valor del select
  useEffect(() => {
    setValue("typeVehicle", typeVehicle);
  }, [typeVehicle, setValue]);

  //==========opcion2 (la vieja y conocida)=============
  /*
  const handleChangeVehicle = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
*/

  return (
    <div className="relative z-20  w-48 bg-transparent md:w-48">
      <label className="mb-1 block text-sm font-medium text-body dark:text-white">
        Tipo de Vehiculo
      </label>
      <select
        defaultValue=""
        {...register("typeVehicle")}
        className={`}z-20 w-48 appearance-none rounded-md border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white 
             dark:focus:border-primary md:w-48 h-12.5`}
        //onChange={handleChangeVehicle} //opcion de vieja y conocida
      >
        <option
          value={TYPE_VEHICLE.DEFAULT}
          className="text-body dark:text-bodydark"
        >
          Todos
        </option>
        <option
          value={TYPE_VEHICLE.CAR}
          className="text-body dark:text-bodydark"
        >
          Auto 🚗
        </option>
        <option
          value={TYPE_VEHICLE.MOTORCYCLE}
          className="text-body dark:text-bodydark"
        >
          Moto 🏍️
        </option>
        <option
          value={TYPE_VEHICLE.TRUCK}
          className="text-body dark:text-bodydark"
        >
          Utilitario 🚚
        </option>
        <option
          value={TYPE_VEHICLE.BICYCLE}
          className="text-body dark:text-bodydark"
        >
          Bicicleta 🚲
        </option>
      </select>
      <span className="absolute top-10  -translate-x-8 transform">
        <FaParking size={18} className="text-secondary dark:text-primary" />
      </span>
    </div>
  );
};

export default SelectTypeVehicle;
