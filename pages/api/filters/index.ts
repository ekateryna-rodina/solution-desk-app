import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { CustomerService, ResponseRate } from "../../../src/constants";
import { IFilterOptions } from "../../../src/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = await client.db();

  try {
    const users = await db.collection("users");
    const [gender, countries, cities] = await Promise.all([
      users.distinct("gender"),
      users.distinct("country"),
      users.distinct("city"),
    ]);
    const filterOptions: IFilterOptions = {
      gender,
      responseRate: Object.values(ResponseRate).filter(
        (v) => !isNaN(ResponseRate[v])
      ) as Array<keyof typeof ResponseRate>,
      customerService: Object.values(CustomerService).filter(
        (v) => !isNaN(CustomerService[v])
      ) as Array<keyof typeof CustomerService>,
      city: cities,
      country: countries,
    };
    console.log(filterOptions);
    res.status(200).json(filterOptions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default handler;
