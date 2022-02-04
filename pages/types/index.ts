import { NextApiResponse } from "next";
import { IFilterApplied } from "../../src/types";

export type IPaginatedResult<T> = {
  data: T[] | undefined;
  page?: string;
  limit?: string;
  totalPages: string;
};

export type ISortedResult<T> = {
  data: T[] | undefined;
  order: string;
  column: string;
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
export interface IWithSorting<T> {
  sortedResult?: ISortedResult<T>;
}

export interface NextApiResponseFilteredSortedPaginated<T>
  extends NextApiResponse,
    IWithPagination<T>,
    IWithSorting<T>,
    IWithFilter<T> {}
