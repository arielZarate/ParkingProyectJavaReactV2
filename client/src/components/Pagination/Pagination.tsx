import Link from "next/link";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import useHookParkingContext from "@/context/parking/useHookParkingContext";

interface Props {}

const Pagination = (props: Props) => {
  const { currentPage, totalPages, setCurrentPage } = useHookParkingContext();

  // Generar un array con los números de página
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center">
      {/* Botón para ir a la página anterior */}
      <Link
        href="#"
        onClick={() => handlePageChange(currentPage - 1)}
        className={`dark:bg-gray-800 dark:text-gray-600 mx-1 flex items-center justify-center rounded-md bg-slate-400 px-3 py-2 capitalize text-white rtl:-scale-x-100 ${
          currentPage === 1 ? "cursor-not-allowed" : ""
        }`}
      >
        <FaAngleLeft size={15} />
      </Link>

      {/* Generar botones de paginación dinámicamente */}
      {pages.map((page) => (
        <Link
          key={page}
          href="#"
          onClick={() => handlePageChange(page)}
          className={`dark:text-gray-200 mx-1 transform rounded-md px-4 py-2 font-thin text-black transition-colors duration-300 hover:bg-secondary hover:text-white dark:border-strokedark dark:bg-boxdark dark:hover:bg-secondary sm:inline ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Botón para ir a la página siguiente */}
      <Link
        href="#"
        onClick={() => handlePageChange(currentPage + 1)}
        className={`dark:bg-gray-800 dark:text-gray-600 mx-1 flex items-center justify-center rounded-md bg-slate-400 px-3 py-2 capitalize text-white rtl:-scale-x-100 ${
          currentPage === totalPages ? "cursor-not-allowed" : ""
        }`}
      >
        <FaAngleRight size={15} />
      </Link>
    </div>
  );
};

export default Pagination;

/**
 * 
 import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import useHookParkingContext from "@/context/parking/useHookParkingContext"; // Importar el hook para acceder al contexto

interface Props {}

const Pagination = (props: Props) => {
  // Acceder al contexto de parking
  const { currentPage, totalPages, setCurrentPage } = useHookParkingContext();

  // Función para ir a la página anterior
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a la página siguiente
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className={`dark:bg-gray-800 dark:text-gray-600 mx-1 flex items-center justify-center rounded-md px-3 py-2 text-white ${
          currentPage === 0
            ? "cursor-not-allowed bg-slate-400"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        <FaAngleLeft size={15} />
      </button>

      <span className="text-gray-600 mx-2 flex items-center justify-center text-sm dark:text-white">
        Página {currentPage + 1} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        className={`dark:bg-gray-800 dark:text-gray-600 mx-1 flex items-center justify-center rounded-md px-3 py-2 text-white ${
          currentPage >= totalPages - 1
            ? "cursor-not-allowed bg-slate-400"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        <FaAngleRight size={15} />
      </button>
    </div>
  );
};

export default Pagination;

 * 
 */

/*

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
        1
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

*/
