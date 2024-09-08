import Link from "next/link";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {}

const Pagination = (props: Props) => {
  return (
    <div className="flex">
      <Link
        href="#"
        className="dark:bg-gray-800 dark:text-gray-600 mx-1 flex cursor-not-allowed items-center justify-center rounded-md bg-slate-400 px-3 py-2 capitalize text-white rtl:-scale-x-100"
      >
        <FaAngleLeft size={15} />
      </Link>

      <Link
        href="#"
        className="dark:text-gray-200  mx-1 hidden transform rounded-md bg-white px-4 py-2 font-thin text-black transition-colors duration-300 hover:bg-secondary hover:text-white dark:border-strokedark dark:bg-boxdark  dark:text-white dark:hover:bg-secondary sm:inline"
      >
        2
      </Link>

      <Link
        href="#"
        className="dark:bg-gray-800 dark:text-gray-200 dark:hover:text-gray-200 mx-1 flex transform items-center justify-center rounded-md bg-slate-400 px-3 py-2 text-white transition-colors duration-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 rtl:-scale-x-100"
      >
        <FaAngleRight size={15} />
      </Link>
    </div>
  );
};

export default Pagination;
