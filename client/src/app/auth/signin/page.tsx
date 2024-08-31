import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignInForm from "@/components/FomAuth/SignInForm";

//===============METADATA=======================

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parking", // Título general
  description: "Inicio de sesion de parking",
};

//===================================

const SignIn: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Iniciar Sesion" />
      <SignInForm />
    </DefaultLayout>
  );
};

export default SignIn;
