"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiCamera } from "react-icons/ci";
import profileImg from "/public/images/user/user-06.png";
import coverImg from "/public/images/cover/cover-01.png";
import { findEmployeeById } from "@/services/employeeService";
import { useHookAuthContext } from "@/context/auth/useHookAuthContext";
import ROLE from "@/enum/roleEmployee";
const ProfileForm = () => {
  const { getDecodedToken } = useHookAuthContext();
  const { id } = getDecodedToken();

  const [userProfile, setUserProfile] = useState({
    fullName: "",
    dni: "",
    phoneNumber: "",
    roleUser: "",
    email: "",
    bio: "",
  });
  //console.log(id);

  const imageStatic = {
    profileImage: profileImg,
    coverImage: coverImg,
  };

  useEffect(() => {
    if (id) {
      findEmployeeById(id)
        .then((user) => {
          if (user) {
            setUserProfile(user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={imageStatic.coverImage}
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
                src={imageStatic.profileImage}
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
            {/*   <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {userProfile.role}
            </h3> */}
            <p className="text-lg font-semibold text-secondary">
              {userProfile.roleUser === ROLE.ROLE_ADMIN
                ? "Admin de sistema"
                : "Empleado"}
            </p>
            <div className="mx-auto max-w-180">
              <h4 className="text-lg font-semibold text-black dark:text-white">
                Descripcion personal
              </h4>
              <p className="mt-2 text-[15px] font-medium dark:text-bodydark">
                {userProfile.bio}
              </p>
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
                        <dd className="text-lg font-medium dark:text-bodydark">
                          {userProfile.fullName}
                        </dd>
                      </div>

                      <div className="flex flex-col py-3">
                        <dt className="text-gray-500  mb-3 font-medium">Dni</dt>
                        <dd className="text-lg font-medium dark:text-bodydark">
                          {userProfile.dni}
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
                        <dd className="text-lg font-medium dark:text-bodydark">
                          {userProfile.phoneNumber}
                        </dd>
                      </div>
                      <div className="flex flex-col pt-3">
                        <dt className="text-gray-500 dark:text-gray-400 mb-4 font-medium">
                          Correo
                        </dt>
                        <dd className="text-lg font-medium dark:text-bodydark">
                          {userProfile.email}
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
