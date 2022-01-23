import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { CustomerService, ResponseRate } from "../../../src/constants";
import { IFilter } from "../../../src/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = await client.db();

  try {
    const users = await db.collection("users").find({});
    const cities = await users.distinct("city");
    const countries = await users.distinct("country");
    const filterOptions: IFilter = {
      gender: [],
      responseRate: Object.values(ResponseRate) as Array<
        keyof typeof ResponseRate
      >,
      customerService: Object.values(CustomerService) as Array<
        keyof typeof CustomerService
      >,
      city: cities,
      country: countries,
    };
    res.status(200).json(filterOptions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
