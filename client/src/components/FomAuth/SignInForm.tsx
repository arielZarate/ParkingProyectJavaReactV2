import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const SignInForm: React.FC = () => {
  return (
    <>
      <div className="mx-auto  max-w-6xl rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark md:my-10">
        <div className="flex flex-wrap items-center">
          <div className="hidden h-full  bg-slate-800  md:w-1/2  xl:block xl:w-1/2  ">
            <div className="px-26 py-17.5 text-center">
              {/*  <h2 className="mb-2 text-4xl font-bold text-primary">
                Inicio de Sesión
              </h2> */}
              <h1 className=" text-5xl font-semibold  hover:text-secondary">
                Sistema de Parking
              </h1>

              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={600}
                  height={100}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={600}
                  height={200}
                />
              </Link>
            </div>
          </div>

          <div className="mx-auto border-stroke dark:border-strokedark  sm:w-9/12 xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Inicio de Sesión
              </h2>

              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Correo
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Ingrese su correo"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />

                    <span className="absolute right-4 top-4">
                      <MdEmail size={20} color="gray" />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Debe tener min 8 caracteres , 1 Mayuscula y un caracter especial"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                    />

                    <span className="absolute right-4 top-4">
                      <CiLock size={20} color="gray" />
                    </span>
                  </div>
                </div>

                <div>
                  <Link href={"/home"} className="mb-5">
                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-lg border border-secondary bg-secondary p-4 font-bold text-white transition hover:bg-opacity-90"
                    >
                      Iniciar Sesion
                    </button>
                  </Link>
                </div>

                {/*
                
                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <FaGoogle size={30} color="#80CAEE" />
                  </span>
                  Sign up with Google
                </button>
                */}

                <div className="mt-6 text-center">
                  <p>
                    No tiene una cuenta?
                    <Link
                      href="/contact"
                      className="ml-1 text-lg  text-primary hover:translate-x-2 hover:font-bold"
                    >
                      Soporte
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
