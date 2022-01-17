// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { IUser } from "../../../src/types";

type Data = {
  data: IUser | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query as { id: string };
  const client = await clientPromise;
  const db = await client.db();
  const user = await db.collection("users").find({ id }).toArray()[0];
  if (!user) res.status(200).json({ data: null });
  res.status(200).json({
    data: user,
  });
}
