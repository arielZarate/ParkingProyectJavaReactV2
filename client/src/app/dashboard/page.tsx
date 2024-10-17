import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import * as React from 'react';



//=================METADATA===============================
import { Metadata } from "next";
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Dashboard from '@/components/Dashboard';
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Esta es pagina de adminstracion del sistema",
};
//=================METADATA===============================

export function DashboardPage () {
  return (
    <DefaultLayout>
         <Breadcrumb pageName="Dashboard" />
         <Dashboard/>
    </DefaultLayout>
  );
}



export default DashboardPage;