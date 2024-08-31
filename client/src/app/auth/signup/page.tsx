import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SigUpForm from "@/components/FomAuth/SigUpForm";

//===============METADATA=======================

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parking", // Título general
  description: "Registro de empleados de parking",
};

//===================================
const SignUp: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Registro" />

      <SigUpForm />
    </DefaultLayout>
  );
};

export default SignUp;
