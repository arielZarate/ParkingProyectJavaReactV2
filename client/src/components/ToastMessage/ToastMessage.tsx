// components/ToastMessage.tsx
import React, { useState, useEffect } from "react";
import ToastType from "./enumToast";
interface ToastMessageProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  type,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Llama a la función de cierre cuando el mensaje se oculta
    }, 3000); // Muestra el mensaje por 4 segundos

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, [onClose]);

  if (!visible) return null;

  // Asigna colores según el tipo de mensaje
  const backgroundColor = {
    success: "bg-green-500",
    error: "bg-rose-500",
    warning: "bg-yellow-500",
    info: "bg-sky-500",
  }[type];

  const closeButtonColor = {
    success: "text-green-700",
    error: "text-rose-700",
    warning: "text-yellow-700",
    info: "text-sky-700",
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 flex gap-4 rounded-lg px-4 py-2 text-center font-semibold text-slate-950 ${backgroundColor} `}
    >
      <p>{message}</p>
      <span
        className={`cursor-pointer font-bold ${closeButtonColor} rounded-full font-bold`}
        onClick={() => {
          setVisible(false);
          onClose();
        }}
      >
        <sup className="font-bold">X</sup>
      </span>
    </div>
  );
};

export default ToastMessage;
