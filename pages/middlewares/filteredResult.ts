import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import { LevelPropertiesMap, TermSearchFilterType } from "../../src/constants";
import { IFilterApplied } from "../../src/types";
import { SearchColumns } from "../constants";
import { NextApiResponseFilteredSortedPaginated } from "../types";

const QueryMap = {
  [TermSearchFilterType.Is]: "$eq",
  [TermSearchFilterType.Not]: "$ne",
};

const handleSearchQuery = (filter: Record<string, any>, query: string) => {
  if (!query) return;
  const newFilter = JSON.parse(JSON.stringify(filter));
  const orSearch = SearchColumns.reduce((acc: {}[], curr) => {
    acc.push({ [curr]: new RegExp(query, "i") });
    return acc;
  }, []);
  return {
    ...newFilter,
    $or: orSearch,
  };
};
const parsedFilter = (filtersList: IFilterApplied[], search: string) => {
  let filter = filtersList.reduce(
    (accumulator: Record<string, any>, current: IFilterApplied) => {
      const propertyName = current["property"];
      // if not a text search but range of property levels is filtered by
      if (Object.keys(LevelPropertiesMap).includes(propertyName)) {
        const scoreRangeForProperty =
          LevelPropertiesMap[TermSearchFilterType[current["level"]!]];
        const gte = scoreRangeForProperty[0];
        const lte = scoreRangeForProperty[1];
        accumulator[propertyName] = { $and: [{ $gte: gte }, { $lte: lte }] };
      } else {
        // filter by regex
        if (
          TermSearchFilterType[current["termSearchFilterType"]!] ==
          TermSearchFilterType[TermSearchFilterType.Contains]
        ) {
          accumulator[propertyName] = new RegExp(current["term"]!, "i");
        } else {
          // filter by "not" and "is"
          const termSearchFilterType =
            TermSearchFilterType[
              TermSearchFilterType[current["termSearchFilterType"]!]
            ];
          accumulator[propertyName] = {
            [QueryMap[termSearchFilterType]]: current["term"],
          };
        }
      }
      return accumulator;
    },
    {}
  );
  // handle search query
  const filterWithSeachConditions = handleSearchQuery(filter, search);
  return filterWithSeachConditions;
};
const filtered = <T>(handler: any, collectionName: string) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponseFilteredSortedPaginated<T>
  ) => {
    if (req.method !== "GET") return handler(req, res);
    let { filter, search } = req.query as { filter: string; search: string };
    const filtersList = filter ? JSON.parse(filter) : [];
    if (filtersList.length || search) {
      const client = await clientPromise;
      const db = await client.db();
      try {
        const parsed = parsedFilter(filtersList, search);
        const users = await db.collection(collectionName).find(parsed);
        const filteredResult = {
          data: users,
          appliedFilters: filtersList,
        };
        res.filteredResult = filteredResult;
        return handler(req, res);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    } else {
      return handler(req, res);
    }
  };
};

export default filtered;
