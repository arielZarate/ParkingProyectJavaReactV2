"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

//===============REACT-ICONS===================
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCar,
  FaChartPie,
  FaFileContract,
  FaHeadset,
  FaInfoCircle,
  FaLongArrowAltLeft,
  FaUserShield,
} from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

//================================================

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

//==============MENU DE SIDEBAR=====================
const menuGroups = [
  {
    name: "GESTION DE PARKING",
    menuItems: [
      {
        icon: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaArrowAltCircleRight size={15} />
            <FaCar size={24} style={{ marginLeft: "5px" }} />
          </div>
        ),
        label: "Ingreso Vehiculo",
        route: "/vehicle/entry",
      },

      {
        icon: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaArrowAltCircleLeft size={15} />
            <FaCar size={24} style={{ marginLeft: "5px" }} />
          </div>
        ),
        label: "Salida Vehiculo",
        route: "/vehicle/exit",
      },

      {
        icon: <FaTableList size={18} />,
        label: "Listado de parking",
        route: "/vehicle/table",
      },

      {
        icon: <FaFileContract size={18} />,
        label: "Contratos",
        route: "#",
        children: [
          { label: "Ver Contratos", route: "/contract" },
          { label: "Nuevo Contrato", route: "/contract" },
        ],
      },

      {
        icon: <FaChartPie size={18} color="white" />,
        label: "Reportes",
        route: "#",
        children: [
          { label: "Ver Reportes", route: "/chart" },
          { label: "Generar Reportes", route: "/chart" },
        ],
      },

      {
        icon: <IoSettings size={18} />,
        label: "Configuracion",
        route: "#",
        children: [
          { label: "Perfil", route: "/profile" },
          { label: "Cuenta", route: "/settings" },
        ],
      },
    ],
  },
  {
    name: "OTROS",
    menuItems: [
      {
        icon: <FaHeadset size={20} />,
        label: "Soporte",
        route: "/contact",
      },

      {
        icon: <FaInfoCircle size={20} />,
        label: "Acerca de",
        route: "/about",
      },

      {
        icon: <FaUserShield size={20} />,
        label: "Administrador",
        route: "#",
        children: [
          { label: "Gestionar Tarifas", route: "#" },
          //una tabla para gestionar empleados
          { label: "Gestionar Empleados", route: "/auth/signup" },
          { label: "Gestionar Parkings", route: "#" },
        ],
      },
      {
        icon: <MdLogin size={20} color="white" />,
        label: "Salir",
        route: "/",
      },
    ],
  },
]; //FIN DE MENU DE SIDEBAR

//============================  COMPONENTE SIDEBAR================================================
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`overflow-y-hidde fixed left-0 top-0 z-9999 flex max-h-max w-72.5 flex-col bg-sidebarBgSky duration-300 ease-linear dark:bg-SidebarDark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-1">
          <Link href="/home">
            <Image
              src={"/images/logo/logo.svg"}
              width={"140"}
              height={"30"}
              alt="Logo"
              loading="lazy"
              className="object-contain object-center"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <FaLongArrowAltLeft size={25} color={"white"} />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex min-h-screen flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
