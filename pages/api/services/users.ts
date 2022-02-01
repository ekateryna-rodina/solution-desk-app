import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { IUser, IUserPost } from "../../../src/types";
import { NextApiResponseFilteredPaginated } from "../../types";

export async function processPost(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = await client.db();

  try {
    const data: Record<keyof IUser, string> = req.body;
    const user: IUserPost = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      ipAddress: data.ipAddress,
      avatar: data.avatar,
      username: data.username,
      address: data.address,
      city: data.city,
      country: data.country,
      characteristic: data.characteristic,
      department: data.department,
      dob: new Date(data.dob),
    };
    const result: { insertedId: ObjectId; acknowledged: boolean } = await db
      .collection("users")
      .insertOne(user);
    res.status(200).json({ _id: new ObjectId(result.insertedId).valueOf() });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function processPut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  if (!id) {
    res.status(400).json({ error: "No id provided" });
  }
  const client = await clientPromise;
  const db = await client.db();

  const data: Record<keyof Partial<IUser>, string> = req.body;
  try {
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function processDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  if (!id) {
    res.status(400).json({ error: "No id provided" });
  }
  const client = await clientPromise;
  const db = await client.db();

  try {
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export function processGet(
  req: NextApiRequest,
  res: NextApiResponseFilteredPaginated<IUser>
) {
  const result = {
    ...res.paginatedResult,
    appliedFilters: res.filteredResult?.appliedFilters || [],
  };
  res.status(200).json(result);
}
