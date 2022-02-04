import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import {
  ISortedResult,
  NextApiResponseFilteredSortedPaginated,
} from "../types";

const sort = async (data: any, column: string, order: string) => {
  const sorted = await data.sort({ [column]: parseInt(order) });
  return sorted;
};

const sorted = <T>(handler: any, collectionName: string) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponseFilteredSortedPaginated<T>
  ) => {
    if (req.method !== "GET") return handler(req, res);
    let { order, column } = req.query as { order: string; column: string };

    let sortedData;
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

    sortedData = await sort(data, column, order);
    const sortedResult: ISortedResult<T> = {
      data: sortedData,
      order,
      column,
    };
    res.sortedResult = sortedResult;
    return handler(req, res);
  };
};

export default sorted;
