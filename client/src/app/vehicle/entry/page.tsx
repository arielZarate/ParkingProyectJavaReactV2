import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EntryVehicleForm from "@/components/Vehicle/EntryVehicleForm";

//=================METADATA===============================
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Parking",
  description: "Esta es el formulario de gestiona la entrada de Vehiculos",
};
//=================METADATA===============================

const PageEntryVehicle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ingreso de Vehiculos" />

      <EntryVehicleForm />
    </DefaultLayout>
  );
};

export default PageEntryVehicle;
