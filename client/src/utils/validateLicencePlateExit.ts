

import TYPE_VEHICLE from "@/enum/typeVehicle";

const validateLicencePlateExit = (value: string, typeVehicle: string): string | undefined => {
  if (typeVehicle === TYPE_VEHICLE.BICYCLE) {
    const bicyclePattern = /^BICYCLE-[A-Z0-9]{6}$/; // Patrón específico para bicicletas
    if (!bicyclePattern.test(value)) {
      return "La matrícula de la bicicleta debe seguir el formato BICYCLE-XXXXXX.";
    }
    return undefined; // Validación exitosa para bicicletas
  }

  // Validación estándar para otros vehículos
  const pattern = /^[A-Za-z0-9]{6,8}$/;
  
  if (!pattern.test(value)) {
    return "La matrícula debe contener letras y números, con una longitud de 6 a 8 caracteres.";
  }

  const letters = value.replace(/[^A-Za-z]/g, "").length;
  const numbers = value.replace(/[^0-9]/g, "").length;
  
  if ((letters < 3 || letters > 4) || (numbers < 3 || numbers > 4)) {
    return "La matrícula debe contener entre 3 y 4 letras y entre 3 y 4 números.";
  }
  
  return undefined;
};

export default validateLicencePlateExit;
