// utils/validateLicencePlate.ts

import TYPE_VEHICLE from "@/enum/typeVehicle";
 const validateLicencePlateEntry = (value: string,typeVehicle:string): string | undefined => {
  if (typeVehicle === TYPE_VEHICLE.BICYCLE) {
    return undefined; // No se requiere validación para bicicletas
  }

  
 // const pattern = /^(?=(?:[A-Za-z]*\d){1,3})(?=(?:\d*[A-Za-z]){1,4})[A-Za-z\d]{6,8}$/;

   // Validar que la longitud sea de 6 a 8 caracteres y contenga solo letras y números
   const pattern = /^[A-Za-z0-9]{6,8}$/;
  
    if (!pattern.test(value)) {
      return "La Matricula debe contener letras y números, con una longitud de 6 a 8 caracteres, y no más de 4 letras ni más de 4 números";
    }
  
    const letters = value.replace(/[^A-Za-z]/g, "").length;
    const numbers = value.replace(/[^0-9]/g, "").length;
  
   // Validar que haya entre 3 y 4 letras y entre 3 y 4 números
   if ((letters < 3 || letters > 4) || (numbers < 3 || numbers > 4)) {
    return "La matrícula debe contener entre 3 y 4 letras y entre 3 y 4 números.";
  }
    return undefined;
  };
  

  export default validateLicencePlateEntry;









/*




                          {...register("licencePlate", {
                            required:
                              typeVehicle !== TYPE_VEHICLE.BICYCLE
                                ? "Debe ingresar una Matricula"
                                : false,
                            pattern:
                              typeVehicle !== TYPE_VEHICLE.BICYCLE
                                ? {
                                    value:
                                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/,
                                    message:
                                      "La Matricula debe contener letras y números, con una longitud de 6 a 8 caracteres y no más de 4 letras ni más de 4 números",
                                  }
                                : undefined,
                          })}






  {...register("licencePlate", {
                            required:
                              typeVehicle !== TYPE_VEHICLE.BICYCLE
                                ? "Debe ingresar una Matricula"
                                : false,
                            pattern:
                              typeVehicle !== TYPE_VEHICLE.BICYCLE
                                ? {
                                    value: /^[A-Za-z0-9]{6,8}$/,
                                    message:
                                      "La Matricula debe contener  letras y números, con una longitud de 6 a 8 caracteres",
                                  }
                                : undefined,
                            minLength:
                              typeVehicle !== TYPE_VEHICLE.BICYCLE
                                ? {
                                    value: 6,
                                    message:
                                      "La patente debe tener al menos 6 caracteres",
                                  }
                                : undefined,
                            maxLength: {
                              value: 8,
                              message:
                                "La patente no puede tener más de 8 caracteres",
                            },
                          })}


*/
