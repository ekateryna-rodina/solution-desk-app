import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import { IPaginatedResult, NextApiResponseFilteredPaginated } from "../types";

const paginate = async (data: any, limit, startIndex) => {
  const paginated = await data
    .skip(startIndex)
    .limit(+limit)
    .toArray();
  return paginated;
};

const paginated = (handler: any, collectionName: string) => {
  return async (req: NextApiRequest, res: NextApiResponseFilteredPaginated) => {
    let { page, limit } = req.query as { page: string; limit: string };
    const startIndex = (+page - 1) * +limit;
    let currentData;
    let total: number;
    let data;
    if (res.filteredResult) {
      data = res.filteredResult.data;
    } else {
      const client = await clientPromise;
      const db = await client.db();

      try {
        data = await db.collection(collectionName).find({});
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
    total = await (data as any).count();
    currentData = await paginate(data, limit, startIndex);
    const paginatedResult: IPaginatedResult = {
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
