import { useEffect, useState } from "react";

const Loader = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-slate-600 border-t-transparent"></div>
      </div>
    </>
  );
};

export default Loader;
