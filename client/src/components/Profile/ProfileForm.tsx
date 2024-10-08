'use client '

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiCamera } from "react-icons/ci";
import useHookAuthContext from "@/context/auth/useHookAuthContext";

const employee = {
  fullName: "Danish Heilium",
  role: "Empleado",
  dni: "32458778",
  phoneNumber: "3512784454",
  email: "danish@gmail.com",
  bio: "Soy un padre de un niño de 7 años. Estudio en la universidad, tengo 37 años y trabajo en el parking de lunes a viernes de 9 a 17 hs.",
  profileImage: "/images/user/user-06.png",
  coverImage: "/images/cover/cover-01.png",
};

const ProfileForm = () => {
 const { status,user } = useHookAuthContext();

 console.log("Status", status);
 console.log("user",user)

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={employee.coverImage}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
                <CiCamera size={18} />
              </span>
              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {/*
                  <img src="https://avatars.githubusercontent.com/{arielZarate}" />   */}

              <Image
                src={employee.profileImage}
                width={140}
                height={140}
                alt="profile"
              />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <CiCamera size={18} />
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {employee.fullName}
            </h3>
            <p className="font-medium">Empleado</p>
            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                Descripcion personal
              </h4>
              <p className="mt-4.5">{employee.bio}</p>
            </div>
            {/**    <!-- Detail --> */}
            <div className=" flex flex-col px-4">
              <div className="my-auto flex w-full flex-col justify-center gap-2 py-6">
                {/** <div className="xs:flex-col flex w-full justify-center gap-2 sm:flex-row"> */}
                <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                  <div className="w-full">
                    <dl className="text-gray-900 divide-gray-400 dark:divide-gray-700 divide-y dark:text-white">
                      <div className="flex flex-col">
                        <dt className="text-gray-500 dark:text-gray-400  mb-1 mt-3 font-medium ">
                          Nombre completo
                        </dt>
                        <dd className="text-lg font-semibold ">
                          {employee.fullName}
                        </dd>
                      </div>

                      <div className="flex flex-col py-3">
                        <dt className="text-gray-500 dark:text-gray-400 mb-3 font-medium">
                          Dni
                        </dt>
                        <dd className="text-lg  font-semibold">
                          {employee.dni}
                        </dd>
                      </div>
                      <div className="-my-2 flex flex-col py-3"></div>
                    </dl>
                  </div>
                  <div className="w-full">
                    <dl className="text-gray-900 divide-gray-200 dark:divide-gray-700 divide-y dark:text-white">
                      <div className="flex flex-col pt-3">
                        <dt className="text-gray-500 dark:text-gray-400 mb-1 font-medium">
                          Numero de Telefono
                        </dt>
                        <dd className="text-lg font-semibold">
                          {employee.phoneNumber}
                        </dd>
                      </div>
                      <div className="flex flex-col pt-3">
                        <dt className="text-gray-500 dark:text-gray-400 mb-4 font-medium">
                          Correo
                        </dt>
                        <dd className="text-lg font-semibold">
                          {employee.email}
                        </dd>
                      </div>

                      <div className="flex flex-col pt-3"></div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {/**Fin del detail */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;

{
  /*   <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    259
                  </span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    129K
                  </span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    2K
                  </span>
                  <span className="text-sm">Following</span>
                </div>
              </div> */
}

{
  /*  <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Follow me on
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  <Link
                    href="#"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaFacebookF size={18} />
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaTwitter size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaLinkedinIn size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaInstagram size={20} />
                  </Link>
                  <Link
                    href="#"
                    className="hover:text-primary"
                    aria-label="social-icon"
                  >
                    <FaGithub size={20} />
                  </Link>
                </div>
              </div> */
}
