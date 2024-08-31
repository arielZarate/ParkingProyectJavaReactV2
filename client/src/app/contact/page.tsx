import Link from "next/link";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContactForm from "@/components/Contact/ContactForm";
type Props = {};
//===============METADATA=======================

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Parking", // Título general
  description: "Soporte de pagina de parking",
};

//===================================

const Contact = (props: Props) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Soporte Tecnico" />
      <ContactForm />
    </DefaultLayout>
  );
};
export default Contact;
