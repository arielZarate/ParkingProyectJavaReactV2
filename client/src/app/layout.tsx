"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 777);
  }, []);

  //========================ROOT LAYOUT========================================
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <div className="min-w-max dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}

          {/** <Suspense>{children}</Suspense> */}
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
