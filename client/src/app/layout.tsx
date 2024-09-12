"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import AuthProvider from "@/context/auth/AuthProviders";
import { SessionProvider } from "next-auth/react";

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
          {/**
           * SessionProvider de nextAuth
           *
           *
           */}

          <SessionProvider>
            <AuthProvider>{loading ? <Loader /> : children}</AuthProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
