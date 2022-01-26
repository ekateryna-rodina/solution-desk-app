import { NextApiResponse } from "next";
import { IFilterProperties } from "../../src/types";

export type IPaginatedResult = {
  data?: {}[] | null;
  page?: string;
  limit?: string;
  totalPages: string;
  appliedFilters?: IFilterProperties | null;
};

export interface NextApiResponseWithPagination<T> extends NextApiResponse {
  paginatedResult: IPaginatedResult;
}
