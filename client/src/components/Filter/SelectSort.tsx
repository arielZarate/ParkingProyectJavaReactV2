"use client";
import SORT from "@/enum/typeSort";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FaSort } from "react-icons/fa";



interface ISortVehicleProp{
    sort:SORT
}


const SelectSort: FC = () => {
  const { register, watch, setValue } = useForm<ISortVehicleProp>();
  //const { status, setStatus } = useHookParkingContext();
  // Observa el valor seleccionado
  const selectedSort = watch("sort");

/* 

  useEffect(() => {
    if (SelectedSort) {
      //console.log(selectedStatusVehicle);
      //setStatus(selectedStatusVehicle);
    }
  }, [SelectedSort]);

  // Si el filtro en el contexto cambia, actualiza el valor del select
  useEffect(() => {
    setValue("sort", status);
  }, [status, setValue]);

*/
  //==========opcion2 (la vieja y conocida)=============
  /*
  const handleChangeVehicle = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
*/

  return (
    <div>
      <div className="relative z-20  w-40 bg-transparent  md:w-32">
        <label className="mb-1 block text-sm font-medium text-body dark:text-white">
          Orden
        </label>
        <select
          defaultValue=""
          {...register("sort")}
          className={`}z-20 w-40 appearance-none rounded-md border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white 
             dark:focus:border-primary md:w-32 h-12.5
          `}
          //onChange={handleChangeVehicle} //opcion de vieja y conocida
        >
          <option
            value={SORT.DESC}
            className="text-body dark:text-bodydark"
          >
            Ultimos
          </option>
          <option
            value={SORT.ASC}
            className="text-body dark:text-bodydark"
          >
            Primeros
          </option>
        
        </select>
        <span className="absolute top-10 -translate-x-8 transform md:-translate-x-6">
          <FaSort
            size={18}
            className="text-secondary dark:text-primary"
          />
        </span>
      </div>
    </div>
  );
};

export default SelectSort;
