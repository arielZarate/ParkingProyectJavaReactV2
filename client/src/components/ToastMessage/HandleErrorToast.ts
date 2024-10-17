import ToastType from "./enumToast";

interface ToastProp {
  message: string;
  type: ToastType;
}

//como setToast es una function
type setToastFunction = (option: ToastProp) => void;

const handlerErrorToast = (error: unknown, setToast: setToastFunction) => {
  if (error instanceof Error) {
    setToast({
      message: error.message,
      type: ToastType.INFO,
    });
  } else {
    setToast({
      message: "A ocurrido un error inesperado",
      type: ToastType.ERROR,
    });
  }
};

export default handlerErrorToast;
