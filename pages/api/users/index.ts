// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../lib/mongodb";

// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   let { page, limit } = req.query as { page: string; limit: string };
//   console.log(page, limit);
//   const client = await clientPromise;
//   const db = await client.db();
//   let users = [];
//   const startIndex = (+page - 1) * +limit;
//   const endIndex = +page * +limit;
//   try {
//     users = await db
//       .collection("users")
//       .find({})
//       .skip(startIndex)
//       .limit(+limit)
//       .toArray();
//     const paginatedResult = {
//       data: users,
//       page,
//       limit,
//     };
//     res.status(200).json(paginatedResult);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest } from "next";
import paginated from "../../middlewares/paginatedResult";
import { NextApiResponseWithPagination } from "../../types";

function handler(req: NextApiRequest, res: NextApiResponseWithPagination) {
  res.status(200).json({ result: res.paginatedResult });
}

export default paginated(handler, "users");
