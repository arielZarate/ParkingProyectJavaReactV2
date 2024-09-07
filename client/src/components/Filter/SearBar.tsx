import {
  ChangeEvent,
  FormEvent,
  useState
} from "react";
import { FaSearch } from "react-icons/fa";
//import { useForm } from "react-hook-form";
import useHookParkingContext from "@/context/parking/useHookParkingContext";
import handleServiceError from "@/utils/handleServiceError";
import useToast from "../ToastMessage/useToast";

type Props = {};
interface SearchProp {
  licencePlate: string;
}

const SearchBar = (props: Props) => {
  const { searchParking } = useHookParkingContext();

  const { setToast, toast, ToastMessage, handleCloseToast } = useToast();
  /*
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SearchProp>();

 */
  //estado para setear
  const [search, setSearch] = useState({ licencePlate: "" });

  //funcion para buscar
  const handleSearchParking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //console.log(search.licencePlate);

      if (search.licencePlate == "") {
        setToast({ message: "Debe ingresar una matricula", type: "info" });
        return;
      }
      searchParking(search.licencePlate);
      //luego de buscar setea el search
      setSearch({
        licencePlate: "",
      });
    } catch (error) {
      console.log(error);
      handleServiceError(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  return (
    <>
      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
      <form onSubmit={handleSearchParking}>
        <label className="mb-1 block text-sm font-medium text-body dark:text-white">
          Busqueda por matricula
        </label>
        <div className="flex w-96 rounded-lg border border-stroke bg-transparent outline-none  transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input   dark:text-white dark:hover:border-primary  md:w-72">
          <button
            type="submit"
            className=" rounded-lg border border-stroke bg-transparent px-3 outline-none transition  focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white   md:px-3 md:py-0 "
          >
            <FaSearch
              size={20}
              className="  hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
              type="submit"
            />
          </button>
          <input
            value={search.licencePlate}
            name="licencePlate"
            type="text"
            placeholder="Buscar..."
            className="h-12 rounded-lg bg-transparent px-3 font-medium  focus:outline-none  md:w-80 "
            onChange={handleChange}
          />

          {/*
         
          {errors.licencePlate && (
            <span className="mx-2 text-center text-[14px] text-secondary dark:text-primary ">
              {errors.licencePlate.message}
            </span>
          )}
         */}
        </div>
      </form>
    </>
  );
};

export default SearchBar;

{
  /** <div className="sm:block">
        <form onSubmit={handleSubmit(findParking)}>
          <div className="relative">
            <button className="absolute top-2 mx-1 w-40 px-2">
              <FaSearch
                size={20}
                className="fill-body  hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                type="submit"
              />
            </button>

            <input
              type="text"
              placeholder="Buscar por matricula"
              className="w-full rounded-lg border bg-transparent py-2 pl-12 pr-4 font-medium focus:outline-none xl:w-125"
              {...register("licencePlate", {
                required: "Puede ingresar una licencia",
              })}
            />
            {errors.licencePlate && (
              <span className="mx-2 rounded-md  py-2 text-center text-sm text-slate-400">
                {errors.licencePlate.message}
              </span>
            )}
          </div>
        </form>
      </div> */
}
