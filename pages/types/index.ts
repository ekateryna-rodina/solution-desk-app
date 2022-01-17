import { NextApiResponse } from "next";

export interface NextApiResponseWithPagination extends NextApiResponse {
  paginatedResult: {
    data: any[];
    page: string;
    limit: string;
  };
}

export type IPaginatedResponse = {
  data?: any[] | null;
  page?: string;
  limit?: string;
  error?: {
    message: string;
  };
};
