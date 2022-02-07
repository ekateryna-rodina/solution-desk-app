import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../src/types";
import filtered from "../../middlewares/filteredResult";
import paginated from "../../middlewares/paginatedResult";
import sorted from "../../middlewares/sortedResult";
import validated from "../../middlewares/validated";
import { NextApiResponseFilteredSortedPaginated } from "../../types";
import { postSchema } from "../services/schema";
import {
  processDelete,
  processGet,
  processPost,
  processPut,
} from "../services/users";

function handler(req: NextApiRequest, res: NextApiResponse) {
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
      processGet(req, res as NextApiResponseFilteredSortedPaginated<User>);
  }
}

const collectionName = "users";
export default filtered(
  sorted(
    paginated(validated(postSchema, handler), collectionName),
    collectionName
  ),
  collectionName
);
