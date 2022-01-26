import { NextApiResponse } from "next";
import { IFilterOptions } from "../../src/types";

export type IPaginatedResult = {
  data?: {}[] | null;
  page?: string;
  limit?: string;
  totalPages: string;
  appliedFilters?: IFilterOptions | null;
};

export interface NextApiResponseWithPagination<T> extends NextApiResponse {
  paginatedResult: IPaginatedResult;
}
