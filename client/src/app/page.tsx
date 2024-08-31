import React, { Suspense } from "react";
import SignInForm from "@/components/FomAuth/SignInForm";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";

//===============METADATA=======================

import { Metadata } from "next";
import Loader from "@/components/common/Loader";

export const metadata: Metadata = {
  title: "Parking", // Título general
  description: "Login para ingresar al sistema", // Descripción general del sitio
};

//===================================

export default function Index() {
  return (
    <>
      {/**aca debe estar el login y si inicio sesion se va al dashboard */}
      {/**aca debe estar el login y si inicio sesion con un contextApi de reactse va al dashboard */}
      <div className="min-w-2xl min-h-screen">
        {/* Suspense debe envolver a los componentes que se cargan de manera asíncrona */}

        <div className="mr-10 flex items-center justify-end px-6 py-4">
          <h4 className="text-gray-800 dark:text-gray-200 mr-4 text-lg font-medium">
            Cambiar Tema
          </h4>
          <DarkModeSwitcher />
        </div>
        <SignInForm />
      </div>
    </>
  );
}
