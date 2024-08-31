import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

//=================METADATA===============================
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ExitVehicleForm from "@/components/Vehicle/ExitVehicleForm";
export const metadata: Metadata = {
  title: "Parking",
  description: "Esta es el formulario de gestiona la  salida de Vehiculos",
};
//=================METADATA===============================
const PageExitVehicle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Salida de Vehiculos" />
      <ExitVehicleForm />
    </DefaultLayout>
  );
};

export default PageExitVehicle;
