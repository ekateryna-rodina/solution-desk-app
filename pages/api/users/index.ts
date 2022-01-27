import { NextApiRequest } from "next";
import filtered from "../../middlewares/filteredResult";
import paginated from "../../middlewares/paginatedResult";
import { NextApiResponseFilteredPaginated } from "../../types";

function handler(req: NextApiRequest, res: NextApiResponseFilteredPaginated) {
  const result = {
    ...res.paginatedResult,
    appliedFilters: res.filteredResult?.appliedFilters || [],
  };
  res.status(200).json(result);
}

export default filtered(paginated(handler, "users"), "users");
