import { NextApiResponse } from "next";
import { IFilterApplied } from "../../src/types";

export type IPaginatedResult = {
  data?: {}[] | null;
  page?: string;
  limit?: string;
  totalPages: string;
};

export type IFilteredResult = {
  data?: {}[] | null;
  appliedFilters: Array<IFilterApplied> | null | [];
};

// export interface NextApiResponseWithPagination<T> extends NextApiResponse {
//   paginatedResult: IPaginatedResult;
// }
export interface IWithPagination {
  paginatedResult: IPaginatedResult;
}
export interface IWithFilter {
  filteredResult?: IFilteredResult;
}
// export interface NextApiResponseWithFilter extends NextApiResponse {
//   filteredResult?: IFilteredResult;
// }

export interface NextApiResponseFilteredPaginated
  extends NextApiResponse,
    IWithPagination,
    IWithFilter {}
