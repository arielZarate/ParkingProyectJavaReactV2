import { axios } from "@/config/axiosConfig";
import STATUS_VEHICLE from "@/enum/statusVehicle";
import TYPE_VEHICLE from "@/enum/typeVehicle";
import { IPage, IParking } from "@/interfaces/IParking";
import handleServiceError from "@/utils/handleServiceError";

export const fetchParkingsPageable = async (
  page: number,
  size: number,
  sort: string,
  status?: string,
  typeVehicle?: string,
): Promise<IPage<IParking>> => {
  try {
    const response = await axios.get<IPage<IParking>>(`/api/parking/pageable`, {
      params: {
        page,
        size,
        sort,
        //ademas del paginado envio opcionalmente el status y el type_vehicle
        status: status !== STATUS_VEHICLE.DEFAULT ? status : undefined,
        typeVehicle:
          typeVehicle !== TYPE_VEHICLE.DEFAULT ? typeVehicle : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    handleServiceError(error);

    return {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      first: true,
      last: false,
      numberOfElements: 0,
      empty: true,
    };
  }
};

export const getParkingByLicencePlate = async (
  licencePlate: string,
  page: number,
  size: number,
  sort: string,
): Promise<IPage<IParking>> => {
  try {
    const response = await axios.get<IPage<IParking>>(
      `/api/parking/licencePlatePageable/${licencePlate}`,
      {
        params: {
          page,
          size,
          sort,
        },
      },
    );
    // console.log("response\n",response.data)
    return response.data;
  } catch (error) {
    handleServiceError(error);
    console.error(error);
    handleServiceError(error);

    return {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      totalPages: 0,
      totalElements: 0,
      size: 0,
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      first: true,
      last: false,
      numberOfElements: 0,
      empty: true,
    };
  }
};
