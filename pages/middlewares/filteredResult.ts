import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import { NextApiResponseFilteredPaginated } from "../types";

const filtered = (handler: any, collectionName: string) => {
  return async (req: NextApiRequest, res: NextApiResponseFilteredPaginated) => {
    let { filter } = req.query as { filter: string };
    const filtersList = JSON.parse(filter);
    if (filtersList.length) {
      const client = await clientPromise;
      const db = await client.db();
      try {
        const users = await db
          .collection(collectionName)
          .find({ gender: "Male" });

        const filteredResult = {
          data: users,
          appliedFilters: filtersList,
        };
        res.filteredResult = filteredResult;
        return handler(req, res);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    } else {
      return handler(req, res);
    }
  };
};

export default filtered;
