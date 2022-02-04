import { NextApiRequest } from "next";
import { User } from "../../../src/types";
import filtered from "../../middlewares/filteredResult";
import paginated from "../../middlewares/paginatedResult";
import sorted from "../../middlewares/sortedResult";
import { NextApiResponseFilteredSortedPaginated } from "../../types";
import {
  processDelete,
  processGet,
  processPost,
  processPut,
} from "../services/users";

function handler(
  req: NextApiRequest,
  res: NextApiResponseFilteredSortedPaginated<User>
) {
  switch (req.method) {
    case "POST":
      processPost(req, res);
      break;
    case "PUT":
      processPut(req, res);
      break;
    case "DELETE":
      processDelete(req, res);
      break;
    default:
      processGet(req, res);
  }
}
const collectionName = "users";
export default filtered(
  sorted(paginated(handler, collectionName), collectionName),
  collectionName
);
