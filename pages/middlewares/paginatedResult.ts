import { NextApiRequest, NextApiResponse } from "next";
import {
  IPaginatedResult,
  NextApiResponseFilteredSortedPaginated,
} from "../types";

const paginate = async (data: any, limit, startIndex) => {
  const paginated = await data
    .skip(startIndex)
    .limit(+limit)
    .toArray();
  return paginated;
};

const paginated = <T>(handler: any, collectionName: string) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponseFilteredSortedPaginated<T>
  ) => {
    if (req.method !== "GET") return handler(req, res as NextApiResponse);
    let { page, limit } = req.query as { page: string; limit: string };
    const startIndex = (+page - 1) * +limit;
    let currentData;
    let total: number;
    let data = res.sortedResult?.data;
    total = await (data as any).count();
    currentData = await paginate(data, limit, startIndex);
    const paginatedResult: IPaginatedResult<T> = {
      data: currentData,
      page,
      limit,
      totalPages: Math.ceil(total / +limit).toString(),
    };
    res.paginatedResult = paginatedResult;
    return handler(req, res);
  };
};

export default paginated;
