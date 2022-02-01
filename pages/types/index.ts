import { NextApiResponse } from "next";
import { IFilterApplied } from "../../src/types";

export type IPaginatedResult<T> = {
  data: T[] | undefined;
  page?: string;
  limit?: string;
  totalPages: string;
};

export type IFilteredResult<T> = {
  data: T[] | undefined;
  appliedFilters: Array<IFilterApplied> | null | [];
};

export interface IWithPagination<T> {
  paginatedResult: IPaginatedResult<T>;
}
export interface IWithFilter<T> {
  filteredResult?: IFilteredResult<T>;
}

export interface NextApiResponseFilteredPaginated<T>
  extends NextApiResponse,
    IWithPagination<T>,
    IWithFilter<T> {}
