import React from "react";

interface Props {}

const Pagination = (props: Props) => {
  return (
    <div className="flex">
      <a
        href="#"
        className="text-gray-500 dark:bg-gray-800 dark:text-gray-600 mx-1 flex cursor-not-allowed items-center justify-center rounded-md bg-white px-4 py-2 capitalize rtl:-scale-x-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>

      <a
        href="#"
        className="dark:text-gray-200  mx-1 hidden transform rounded-md bg-white px-4 py-2 text-black transition-colors duration-300 hover:bg-secondary hover:text-white dark:border-strokedark dark:bg-boxdark  dark:text-white dark:hover:bg-secondary sm:inline"
      >
        2
      </a>

      <a
        href="#"
        className="text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:text-gray-200 mx-1 flex transform items-center justify-center rounded-md bg-white px-4 py-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 rtl:-scale-x-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
};

export default Pagination;
