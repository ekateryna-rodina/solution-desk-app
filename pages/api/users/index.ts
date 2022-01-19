import { NextApiRequest } from "next";
import paginated from "../../middlewares/paginatedResult";
import { NextApiResponseWithPagination } from "../../types";

function handler(req: NextApiRequest, res: NextApiResponseWithPagination) {
  res.status(200).json({ result: { ...res.paginatedResult } });
}

export default paginated(handler, "users");
