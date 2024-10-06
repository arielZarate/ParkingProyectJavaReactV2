"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

//esta funcion es de nextAuth para pasar los datos al credentials
import { signIn } from "next-auth/react";
import handleServiceError from "@/utils/handleServiceError";

interface LoginType {
  email: string;
  password: string;
}
const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const sendLogin = async (data: LoginType) => {
    // console.log("Datos enviados:", data);
    /**try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.log("Usuario o contraseña incorrectos"); // Muestra un mensaje de error
        //usar un toast para enviar una notificacion de erorr

        alert("Usuario o contraseña incorrectos");
      } else {
        // Redirigir al usuario a la página que quieras después del login exitoso

        alert("usuario autentificado");
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      handleServiceError(error);
    } */
  };

  return (
    <>
      <div className="mx-auto  max-w-6xl rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark md:my-10">
        <div className="flex flex-wrap items-center">
          <div className="hidden h-full  bg-slate-800  md:w-1/2  xl:block xl:w-1/2  ">
            <div className="px-26 py-17.5 text-center">
              <h1 className=" text-5xl font-semibold  hover:text-secondary">
                Sistema de Parking
              </h1>

              <div className="mb-5.5 inline-block">
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
              </div>
            </div>
          </div>

          <div className="mx-auto border-stroke dark:border-strokedark  sm:w-9/12 xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Inicio de Sesión
              </h2>

              <form onSubmit={handleSubmit(sendLogin)}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Correo
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Ingrese su correo"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      {...register("email", {
                        required: "El email es requerido",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/,
                          message: "Formato de correo no válido",
                        },
                      })}
                    />

                    <span className="absolute right-4 top-4">
                      <MdEmail size={20} color="gray" />
                    </span>
                    {errors.email && (
                      <p className="m-1 w-96 max-w-xs rounded-sm bg-rose-200 px-4 py-0.5 text-red">
                        <span className="px-2"> {errors.email.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Debe tener min 8 caracteres , 1 Mayuscula y un caracter especial"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-secondary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
                      {...register("password", {
                        required: "La contraseña es requerida",
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@, $, !, %, *, ?, &)",
                        },
                      })}
                    />

                    <span
                      className="absolute right-4 top-4 cursor-pointer"
                      onClick={togglePasswordVisibility} // Evento para alternar la visibilidad de la contraseña
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible size={20} color="gray" />
                      ) : (
                        <AiFillEye size={20} color="gray" />
                      )}
                    </span>
                    {errors.password && (
                      <p className="m-1 w-full  rounded-sm bg-rose-200 px-4 py-0.5 text-red">
                        <span className="px-2"> {errors.password.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <Link href={"/home"} className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-secondary bg-secondary p-4 font-bold text-white transition hover:bg-opacity-90"
                  >
                    Iniciar Sesion
                  </button>
                </Link>

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
