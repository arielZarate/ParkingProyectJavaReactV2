import React from "react";

type Props = {};

//===============METADATA=======================

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContractForm from "@/components/Contract/ContractForm";

export const metadata: Metadata = {
  title: "Parking", // Título general
  description: "contratos de usuarios de parking", // Descripción general del sitio
};

//===================================

const ContractUser = (props: Props) => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Contratos" />
        <ContractForm />
      </DefaultLayout>
    </>
  );
};

export default ContractUser;
