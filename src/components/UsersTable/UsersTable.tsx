import React from "react";
import { IPaginatedResult } from "../../../pages/types";

type UsersTableProps = {
  paginatedData: IPaginatedResult;
};
const fieldsToIgnore = new Set([
  "avatar",
  "id",
  "_id",
  "first_name",
  "last_name",
]);
const responsiveColsMap = {
  0: "",
  1: "",
  2: "hidden lg:table-cell",
  3: "hidden lg:table-cell",
  4: "hidden lg:table-cell",
  5: "",
  6: "",
  7: "hidden xl:table-cell",
  8: "hidden xl:table-cell",
  9: "hidden xl:table-cell",
};
const UsersTable = ({ paginatedData }: UsersTableProps) => {
  const getColumnNames = () => {
    if (!paginatedData || !paginatedData.data) return;
    const result = Object.keys(paginatedData.data![0]).filter(
      (c) => !fieldsToIgnore.has(c)
    );
    result.splice(0, 0, "name");
    console.log(result);
    return result;
  };
  const getUsers = () => {
    if (!paginatedData || !paginatedData.data) return;
    const newUsers = paginatedData.data.map((user) => {
      return Object.keys(user)
        .filter((c) => !fieldsToIgnore.has(c))
        .reduce((ur, key) => {
          ur.name = `${user.first_name} ${user.last_name}`;
          return Object.assign(ur, { [key]: user[key] });
        }, {});
    });
    console.log(newUsers);
    return newUsers;
  };
  if (!paginatedData || !paginatedData.data)
    return <h1>Placehholer for no results</h1>;
  return (
    <div>
      <table className="table-auto w-[calc(100%-4rem)] mx-8 bg-white shadow">
        <thead>
          <tr>
            {getColumnNames()?.map((c, i) => {
              return (
                <td className={`p-4 ${responsiveColsMap[i]}`} key={c}>
                  {c}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {getUsers()!.map((user, i) => (
            <tr key={user.name}>
              {Object.values(user).map((c, i) => (
                <td
                  className={`p-4 ${responsiveColsMap[i]}`}
                  key={c.toString()}
                >
                  {c.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
