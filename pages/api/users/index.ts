import { NextApiRequest } from "next";
import { IUser } from "../../../src/types";
import paginated from "../../middlewares/paginatedResult";
import { NextApiResponseWithPagination } from "../../types";

function handler(
  req: NextApiRequest,
  res: NextApiResponseWithPagination<IUser>
) {
  const result = { ...res.paginatedResult };
  console.log(result);
  res.status(200).json(result);
}

export default paginated<IUser>(handler, "users");
