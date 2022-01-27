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
    let current;
    let total;
    if (res.filteredResult) {
      current = paginate(res.filteredResult.data, limit, startIndex);
      total = ((await res.filteredResult.data!) as any).count();
    } else {
      const client = await clientPromise;
      const db = await client.db();

      try {
        const users = await db.collection(collectionName).find({});
        total = await users.count();
        current = await paginate(users, limit, startIndex);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
    const paginatedResult: IPaginatedResult = {
      data: current,
      page,
      limit,
      totalPages: Math.ceil(total / +limit).toString(),
    };
    res.paginatedResult = paginatedResult;
    return handler(req, res);
  };
};

export default paginated;
