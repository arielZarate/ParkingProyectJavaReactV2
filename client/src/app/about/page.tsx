import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Image from "next/image";

type Props = {};

const AcercaDe = (props: Props) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Acerca del software" />
      <div
        id="about"
        className="relative mt-16 overflow-hidden bg-white dark:border-strokedark dark:bg-boxdark"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 bg-white  pb-8 dark:border-strokedark dark:bg-boxdark sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white dark:text-boxdark lg:block "
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100"></polygon>
            </svg>

            <div className="pt-1"></div>

            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="my-6 text-2xl font-extrabold tracking-tight text-slate-500 dark:text-slate-200 sm:text-3xl md:text-4xl">
                  Parking Management System (PMS)
                </h2>

                <p className="text-slate-500 dark:text-white">
                  El Parking Management System (PMS) es una solución integral
                  diseñada para optimizar la gestión de estacionamientos,
                  facilitando la administración de la entrada y salida de
                  vehículos, el manejo de listados de espacios de
                  estacionamiento y la gestión de cuentas de empleados y
                  usuarios abonados. Este software robusto está orientado a
                  proporcionar una experiencia fluida tanto para los
                  administradores como para los usuarios, con una interfaz
                  intuitiva y funcionalidades avanzadas.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src={"/images/logo/logo.svg"}
            alt="logo"
            className="h-48 w-full object-contain object-center sm:h-72 md:h-96 lg:h-full lg:w-full"
            width={970}
            height={260}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AcercaDe;

//rounded-tl-sm rounded-tr-sm
