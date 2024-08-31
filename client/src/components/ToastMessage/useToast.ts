import React,{useState} from 'react'
import ToastMessage from './ToastMessage'



//HOOK PARA MANEJAR LA LOGICA DEL TOAST
const useToast = () => {
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error" | "info" | "warning";
      } | null>(null);


      //FUNCION PARA CERRAR EL TOAST
      const handleCloseToast = () => {
        setToast(null);
      };


//================
//FROMA DE USAR EL TOAST
/*
<ToastMessage
 message={toast.message}
 type={toast.type}
 onClose={handleCloseToast}
/>
*/
//==============

    return{
        toast,
        setToast,
        ToastMessage,
        handleCloseToast
    }
}





export default useToast
