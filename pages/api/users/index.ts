import { NextApiRequest } from "next";
import { IUser } from "../../../src/types";
import paginated from "../../middlewares/paginatedResult";
import { NextApiResponseWithPagination } from "../../types";

function handler(
  req: NextApiRequest,
  res: NextApiResponseWithPagination<IUser>
) {
  res.status(200).json({ ...res.paginatedResult });
}

export default paginated<IUser>(handler, "users");
