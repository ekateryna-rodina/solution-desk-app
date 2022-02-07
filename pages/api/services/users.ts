import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { User } from "../../../src/types";
import { NextApiResponseFilteredSortedPaginated } from "../../types";

export async function processPost(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = await client.db();

  try {
    const result: { insertedId: ObjectId; acknowledged: boolean } = await db
      .collection("users")
      .insertOne(req.body);
    res.status(200).json({ _id: new ObjectId(result.insertedId).valueOf() });
    // client.close();
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

  const data: Record<keyof Partial<User>, string> = req.body;
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
  res: NextApiResponseFilteredSortedPaginated<User>
) {
  const result = {
    ...res.paginatedResult,
    appliedFilters: res.filteredResult?.appliedFilters || [],
    search: req.query.search,
    order: res.sortedResult?.order,
    column: res.sortedResult?.column,
  };
  res.status(200).json(result);
}
