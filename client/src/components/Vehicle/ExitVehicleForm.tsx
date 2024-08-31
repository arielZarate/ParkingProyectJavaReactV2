"use client";

import React, { useState } from "react";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import useToast from "../ToastMessage/useToast";
import { useForm } from "react-hook-form";
import validateLicencePlate from "@/utils/validateLicencePlateExit";
import { useRouter } from "next/navigation";
import IFinalizeParkingProp from "@/interfaces/IFinalizeParkingProp";
import { postFinalizeParkings } from "@/services/parkingService";
import handlerErrorToast from "@/components/ToastMessage/HandleErrorToast";

const ExitVehicleForm = () => {
  const [typeVehicle, setTypeVehicle] = useState<string>("");
  const router = useRouter(); // Inicializar useRoute
  //==============hook de toast=============
  const { setToast, toast, ToastMessage, handleCloseToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Añadido para actualizar el valor del campo
  } = useForm<IFinalizeParkingProp>();

  //===========funcion finalizeParking==================
  const finalizeParking = async (data: IFinalizeParkingProp) => {
    try {
      //======================VALIDACIONES=================================
      const licencePlateError = validateLicencePlate(
        data.licencePlate || "",
        typeVehicle,
      );
      if (licencePlateError) {
        setToast({
          message: licencePlateError,
          type: "error",
        });
        return;
      }
      //==================================================================
      //console.log("antes de enviar los datos", data);
      const res = await postFinalizeParkings(data.licencePlate);

      if (res != undefined || res != null) {
        setToast({ message: "Parking Finalizado con éxito", type: "info" });
      }

      setTimeout(() => {
        router.push("/vehicle/table"); // Redirigir a la página deseada
      }, 3000);
    } catch (error) {
      handlerErrorToast(error, setToast);
    }
  };

  // Función para convertir el texto a mayúsculas antes de enviarlo
  const handleLicencePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convierte a mayúsculas
    setValue("licencePlate", value); // Actualiza el valor en react-hook-form
  };

  //manejador del estado de un typeVehicle
  //si el type es BICYCLE DESABILITA LA licencePlate(las bicis no llevan patente)
  const handleTypeVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeVehicle(e.target.value);
  };
  return (
    <>
      <div>
        {toast && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onClose={handleCloseToast}
          />
        )}
      </div>
      <div className="flex justify-start md:ml-20 lg:ml-20">
        <div className="w-full max-w-lg">
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full ">
              <div className="my-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex items-start justify-between rounded-t border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="text-xl font-semibold">Finalize Parking</h3>
                </div>
                <div className="mx-auto space-y-6 p-10">
                  <form onSubmit={handleSubmit(finalizeParking)}>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="licencePlate"
                          className="text-gray-900 mb-2 block text-sm font-medium"
                        >
                          Patente
                          <span className="mx-2 font-bold text-danger">
                            * requerido
                          </span>
                        </label>
                        <input
                          type="text"
                          // name="licencePlate"
                          id="licencePlate"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-slate-700 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary"
                          placeholder="AXXX-XXXX"
                          {...register("licencePlate", {
                            required: "Debe ingresar una Matricula",

                            validate: (value) =>
                              validateLicencePlate(value, typeVehicle),
                          })}
                          onChange={handleLicencePlateChange} // Convierte a mayúsculas al cambiar
                        />

                        {errors.licencePlate && (
                          <p className="p-0.2 m-0.5 rounded-md bg-rose-200 text-center text-sm text-danger">
                            {errors.licencePlate.message}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <h2 className="text-gray-900 mb-2 block text-sm font-medium">
                          Seleccione solo si es
                          <span className="mx-2 font-bold text-danger">
                            Bicicleta
                          </span>
                        </h2>

                        <div className="flex gap-x-0.5 rounded-lg ">
                          <label className="bg-gray-100 my-1 flex cursor-pointer rounded-md py-1 text-center text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-graydark ">
                            <input
                              type="radio"
                              name="typeVehicle"
                              value={TYPE_VEHICLE.BICYCLE}
                              className="accent-green-500"
                              onChange={handleTypeVehicleChange}
                            />
                            <i className="pl-1">Bicicleta</i>
                          </label>

                          {errors.typeVehicle && (
                            <p className="p-0.2 m-0.5 rounded-md bg-rose-200 text-center text-sm text-danger">
                              {errors.typeVehicle.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-8">
                      <div className="absolute left-0 right-0 -mx-10 border-t border-stroke dark:border-strokedark"></div>
                    </div>
                    <div className="flex justify-around  py-4">
                      <button
                        className="text-medium rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-white hover:font-semibold hover:opacity-80 focus:ring-4 focus:ring-green-700"
                        type="submit"
                      >
                        Finalize Parking
                      </button>
                      <button
                        className="text-medium rounded-lg bg-slate-500 px-5 py-2.5 text-center font-medium text-white hover:font-semibold hover:opacity-80 "
                        type="reset"
                      >
                        Borrar campos
                      </button>
                    </div>
                  </form>
                </div>
                {/** */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExitVehicleForm;

{
  /*

  <div className="my-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex items-start justify-between rounded-t border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="text-xl font-semibold">Finalize Parking</h3>
                </div>

                <div className="mx-auto space-y-6 p-10">
                  <form onSubmit={handleSubmit(finalizeParking)}>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="licencePlate"
                          className="text-gray-900 mb-2 block text-sm font-medium"
                        >
                          Patente
                          <span className="mx-2 font-bold text-danger">
                            * requerido
                          </span>
                        </label>
                        <input
                          type="text"
                          name="licencePlate"
                          id="licencePlate"
                          className=" rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary"
                          placeholder="AXXX-XXX"
                        />
                      </div>
                    </div>

                    <div className="relative mt-8">
                      <div className="absolute left-0 right-0 -mx-10 border-t border-stroke dark:border-strokedark"></div>
                    </div>
                    <div className="flex justify-start  py-4">
                      <button
                        className="text-medium rounded-lg bg-secondary px-5 py-2.5 text-center font-medium text-white hover:font-semibold hover:opacity-80 focus:ring-4 focus:ring-sky-700"
                        type="submit"
                      >
                        Finalizar Parking
                      </button>
                    </div>
                  </form>
                </div>
              </div>

                      

                       */
}
