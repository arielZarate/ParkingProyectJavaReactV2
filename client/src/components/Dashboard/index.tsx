"use client";

import React, { useState } from "react";
import { useHookAuthContext } from "@/context/auth/useHookAuthContext";
import ROLE from "@/enum/roleEmployee";
import useSweetAlertHook from "../SweetAlert/useSweet";
import { useRouter } from "next/navigation";

import EmployeeManagement from "./Employee/EmployeeManagement";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
const Dashboard = () => {
  const { getDecodedToken } = useHookAuthContext();
  const { showAlert, confirmAlert, SweetPosition, SweetType } =
    useSweetAlertHook();
  const router = useRouter();
  const { id, role } = getDecodedToken();

  const [activeComponent, setActiveComponent] = useState<string | null>(null); // Estado para gestionar el componente activo

  if (role !== ROLE.ROLE_ADMIN) {
    showAlert({
      title: "NO AUTORIZADO",
      text: "Debe ser usuario Autorizado",
      type: SweetType.WARNING,
      position: SweetPosition.CENTER,
      time: 2000,
    });

    setTimeout(() => {
      router.push("/home");
    }, 2100);

    return null;
  }

  // Array con la información de las cards
  const adminCards = [
    {
      title: "Parking",
      description: "Gestiona las plazas de parking.",
      component: <div>Página de Parking</div>, // Placeholder para Parking
      key: "parking",
    },
    {
      title: "Usuarios",
      description: "Gestiona los usuarios del sistema.",
      component: <EmployeeManagement />, // Componente de gestión de empleados
      key: "usuarios",
    },
    {
      title: "Tarifas",
      description: "Configura las tarifas de los servicios.",
      component: <div>Página de Tarifas</div>, // Placeholder para Tarifas
      key: "tarifas",
    },
    {
      title: "Reportes",
      description: "Consulta reportes de ingresos y estadísticas.",
      component: <div>Página de Reportes</div>, // Placeholder para Reportes
      key: "reportes",
    },
  ];

  // Función para volver a la lista de tarjetas
  const handleBackClick = () => {
    setActiveComponent(null); // Restablecer el componente activo a null
  };

  // Función para manejar el clic en una card
  const handleCardClick = (key: string) => {
    setActiveComponent(key); // Cambiar el componente activo
  };

  return (
    <>
      <div className="admin-dashboard mx-auto">
        {/* Si no hay un componente activo, mostrar las tarjetas */}
        {!activeComponent ? (
          <div className="flex flex-col justify-start gap-5 sm:mx-10 lg:flex-row lg:flex-wrap">
            {adminCards.map((card) => (
              <>
                
                <div
                  key={card.key}
                  className="mx-10 w-full cursor-pointer rounded-md border-[2.6px]   border-slate-400 dark:border-slate-200 p-5 sm:w-full lg:w-125 hover:scale-105 duration-300 ease-in-out"
                  onClick={() => handleCardClick(card.key)}
                >
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  <p className="text-sm">{card.description}</p>
                </div>
              </>
            ))}
          </div>
        ) : (
          // Renderizar solo el componente activo
          <div className="mt-5">
            <div className="flex justify-end">
              
              <button
                className="mt-5 rounded  border   border-slate-400  text-slate-800 dark:border-slate-200  w-30 p-2    dark:text-white text-md font-thin dark:hover:border-primary dark:hover:text-primary  hover:border-secondary hover:text-secondary hover:scale-105"
                onClick={handleBackClick} // Llama a la función para volver
              >
                Volver 
              </button>
            </div>

            {adminCards.map((card) => {
              if (card.key === activeComponent) {
                return  <>
                
                {/**<Breadcrumb pageName={card.title}/> */}
                 <div key={card.key}>{card.component}</div>  </> ; // Mostrar solo el componente activo
              }
              return null; // No renderizar otros componentes corta
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
