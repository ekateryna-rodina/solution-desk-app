import { NextApiRequest } from "next";
import { User } from "../../../src/types";
import filtered from "../../middlewares/filteredResult";
import paginated from "../../middlewares/paginatedResult";
import { NextApiResponseFilteredPaginated } from "../../types";
import {
  processDelete,
  processGet,
  processPost,
  processPut,
} from "../services/users";

function handler(
  req: NextApiRequest,
  res: NextApiResponseFilteredPaginated<User>
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

export default filtered(paginated(handler, "users"), "users");
