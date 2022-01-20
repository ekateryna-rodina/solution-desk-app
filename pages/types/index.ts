import { NextApiResponse } from "next";

export type IPaginatedResult = {
  data?: {}[] | null;
  page?: string;
  limit?: string;
};

export interface NextApiResponseWithPagination<T> extends NextApiResponse {
  paginatedResult: IPaginatedResult;
}
