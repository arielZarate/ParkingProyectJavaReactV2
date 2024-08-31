"use client";

import React, { useState } from "react";
import COLOR from "@/enum/colorVehicle";
import { ISaveParkingProp } from "@/interfaces/ISaveParkingProp";
import { postParkings } from "@/services/parkingService";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import useToast from "../ToastMessage/useToast";
import { useForm } from "react-hook-form";
import validateLicencePlate from "@/utils/validateLicencePlateEntry";
import { useRouter } from "next/navigation";
import handlerErrorToast from "../ToastMessage/HandleErrorToast";

const EntryVehicleForm = () => {
  //useState
  const [typeVehicle, setTypeVehicle] = useState<string>("");
  const router = useRouter(); // Inicializar useRoute
  //==============hook de toast=============
  const { setToast, toast, ToastMessage, handleCloseToast } = useToast();
  //=======REACT HOOK FORM==============================
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Añadido para actualizar el valor del campo
  } = useForm<ISaveParkingProp>();

  //===========funcion saveParking==================
  const saveParking = async (data: ISaveParkingProp) => {
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
      //  console.log("antes de enviar los datos", data);
      const res = await postParkings(data);

      if (res != undefined || res != null) {
        setToast({ message: "Parking creado con éxito", type: "success" });
      }

      setTimeout(() => {
        router.push("/vehicle/table"); // Redirigir a la página deseada
      }, 3000);
    } catch (error) {
      //console.error(error);
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
                  <h3 className="text-xl font-semibold">Crear Parking</h3>
                </div>
                <div className="mx-auto space-y-6 p-10">
                  <form onSubmit={handleSubmit(saveParking)}>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="licencePlate"
                          className="text-gray-900 mb-2 block text-sm font-medium"
                        >
                          Patente
                          {typeVehicle === TYPE_VEHICLE.BICYCLE ? (
                            <span className="mx-2 rounded-md bg-yellow-100 p-0.5 font-bold text-warning">
                              No requerida
                            </span>
                          ) : (
                            <span className="mx-2 font-bold text-danger">
                              * requerido
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          // name="licencePlate"
                          id="licencePlate"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-slate-700 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary"
                          placeholder="AXXX-XXXX"
                          {...register("licencePlate", {
                            required:
                              typeVehicle !== TYPE_VEHICLE.BICYCLE
                                ? "Debe ingresar una Matricula"
                                : false,
                            validate: (value) =>
                              validateLicencePlate(value, typeVehicle),
                          })}
                          onChange={handleLicencePlateChange} // Convierte a mayúsculas al cambiar
                          disabled={typeVehicle === TYPE_VEHICLE.BICYCLE} // Desactiva el campo si el tipo de vehículo es bicicleta
                        />

                        {errors.licencePlate && (
                          <p className="p-0.2 m-0.5 rounded-md bg-rose-200 text-center text-sm text-danger">
                            {errors.licencePlate.message}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <h2 className="text-gray-900 mb-2 block text-sm font-medium">
                          Tipo de Vehiculo
                          <span className="mx-2 font-bold text-danger">
                            * requerido
                          </span>
                        </h2>

                        <div className="flex gap-x-0.5 rounded-lg border-[1.5px] border-stroke bg-transparent p-1 dark:border-form-strokedark">
                          <div className="mr-0.5">
                            <label className="bg-gray-100 my-1 flex cursor-pointer rounded-md px-1 py-1 text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-graydark">
                              <input
                                type="radio"
                                value={TYPE_VEHICLE.CAR}
                                className="accent-green-500"
                                {...register("typeVehicle", {
                                  required:
                                    "Debe seleccionar un tipo de vehículo",
                                })}
                                onChange={handleTypeVehicleChange}
                              />
                              <i className="pl-1">Auto</i>
                            </label>
                            <label className=" bg-gray-100 my-1 flex cursor-pointer rounded-md px-1 py-1 text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-graydark">
                              <input
                                type="radio"
                                value={TYPE_VEHICLE.MOTORCYCLE}
                                className="accent-green-500"
                                {...register("typeVehicle", {
                                  required:
                                    "Debe seleccionar un tipo de vehículo",
                                })}
                                onChange={handleTypeVehicleChange}
                              />
                              <i className="pl-1">Motocicleta</i>
                            </label>
                          </div>
                          <div>
                            <label className="bg-gray-100 my-1 flex cursor-pointer rounded-md py-1 text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-graydark ">
                              <input
                                type="radio"
                                value={TYPE_VEHICLE.BICYCLE}
                                className="accent-green-500"
                                {...register("typeVehicle", {
                                  required:
                                    "Debe seleccionar un tipo de vehículo",
                                })}
                                onChange={handleTypeVehicleChange}
                              />
                              <i className="pl-1">Bicicleta</i>
                            </label>

                            <label className="bg-gray-100 my-1 flex cursor-pointer rounded-md py-1 text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-graydark ">
                              <input
                                type="radio"
                                value={TYPE_VEHICLE.TRUCK}
                                className="accent-green-500"
                                {...register("typeVehicle", {
                                  required:
                                    "Debe seleccionar un tipo de vehículo",
                                })}
                                onChange={handleTypeVehicleChange}
                              />
                              <i className="pl-1">Utilitario</i>
                            </label>
                          </div>
                        </div>

                        {errors.typeVehicle && (
                          <p className="p-0.2 m-0.5 rounded-md bg-rose-200 text-center text-sm text-danger">
                            {errors.typeVehicle.message}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="color"
                          className="text-gray-900 mb-2 block text-sm font-medium"
                        >
                          Color de vehiculo
                          <span className="mx-2 font-medium text-warning">
                            (Opcional)
                          </span>
                        </label>

                        <select
                          id="color"
                          defaultValue={COLOR.UNKNOW}
                          className="w-52 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-slate-600 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary   lg:w-100"
                          {...register("color")}
                        >
                          <option value="" disabled>
                            Elija color de vehículo
                          </option>
                          {Object.entries(COLOR).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="note"
                          className="text-gray-900 mb-2 block text-sm font-medium"
                        >
                          Descripción{" "}
                          <span className="mx-1 font-medium text-warning">
                            (Opcional)
                          </span>
                        </label>
                        <textarea
                          id="note"
                          rows={3}
                          placeholder="Ingrese una descripción si es necesario"
                          className="w-full resize-none overflow-hidden rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-slate-700 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          //maxLength={150} // Limita a 50 caracteres
                          {...register("note", {
                            maxLength: {
                              value: 150,
                              message:
                                "La descripción no puede exceder los 150 caracteres",
                            },
                          })}
                        ></textarea>
                        {errors.note && (
                          <p className="p-0.2 m-0.5 rounded-md bg-rose-200 text-center text-sm text-danger">
                            {errors.note.message}
                          </p>
                        )}
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
                        Crear Parking
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

export default EntryVehicleForm;
