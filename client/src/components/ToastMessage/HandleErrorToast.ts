interface ToastProp{
 message:string;
type:"success" | "error" | "info" | "warning";
}

//como setToast es una function
type setToastFunction=(option:ToastProp)=>void;

const handlerErrorToast=(  error:unknown,setToast:setToastFunction)=>{
    if (error instanceof Error) {
        setToast({
          message: error.message,
          type: "info",
        });
      } else {
        setToast({
          message: "A ocurrido un error inesperado",
          type: "error",
        });
      }
}



export default handlerErrorToast;