import React, { useState } from "react";
import ToastMessage from "./ToastMessage";
import ToastType from "./enumToast";
//HOOK PARA MANEJAR LA LOGICA DEL TOAST
const useToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  //FUNCION PARA CERRAR EL TOAST
  const handleCloseToast = () => {
    setToast(null);
  };

  //================
  //FORMA DE USAR EL TOAST
  /*
<ToastMessage
 message={toast.message}
 type={toast.type}
 onClose={handleCloseToast}
/>
*/
  //==============

  return {
    toast,
    setToast,
    ToastMessage,
    handleCloseToast,
  };
};

export default useToast;
