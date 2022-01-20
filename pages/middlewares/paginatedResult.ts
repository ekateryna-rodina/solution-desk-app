import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import { IUser } from "../../src/types";
import { IPaginatedResult, NextApiResponseWithPagination } from "../types";

const paginated = <T>(handler: any, collectionName: string) => {
  return async (req: NextApiRequest, res: NextApiResponseWithPagination<T>) => {
    let { page, limit } = req.query as { page: string; limit: string };
    const client = await clientPromise;
    const db = await client.db();
    let users: IUser[] = [];
    const startIndex = (+page - 1) * +limit;
    const endIndex = +page * +limit;
    try {
      users = await db
        .collection(collectionName)
        .find({})
        .skip(startIndex)
        .limit(+limit)
        .toArray();
      const paginatedResult: IPaginatedResult = {
        data: users,
        page,
        limit,
      };
      res.paginatedResult = paginatedResult;
      return handler(req, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
};

export default paginated;
