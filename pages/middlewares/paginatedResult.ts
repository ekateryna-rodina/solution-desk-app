import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import { IPaginatedResult, NextApiResponseWithPagination } from "../types";

const paginated = <T>(handler: any, collectionName: string) => {
  return async (req: NextApiRequest, res: NextApiResponseWithPagination<T>) => {
    let { page, limit } = req.query as { page: string; limit: string };
    const client = await clientPromise;
    const db = await client.db();

    const startIndex = (+page - 1) * +limit;
    let totalPages;
    const endIndex = +page * +limit;
    try {
      const users = await db.collection(collectionName).find({});
      const total = await users.count();
      const current = await users
        .skip(startIndex)
        .limit(+limit)
        .toArray();

      const paginatedResult: IPaginatedResult = {
        data: current,
        page,
        limit,
        totalPages: Math.ceil(total / +limit).toString(),
      };
      res.paginatedResult = paginatedResult;
      return handler(req, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
};

export default paginated;
