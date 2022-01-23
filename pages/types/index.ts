import { NextApiResponse } from "next";
import { IFilter } from "../../src/types";

export type IPaginatedResult = {
  data?: {}[] | null;
  page?: string;
  limit?: string;
  totalPages: string;
  appliedFilters?: IFilter | null;
};

export interface NextApiResponseWithPagination<T> extends NextApiResponse {
  paginatedResult: IPaginatedResult;
}
