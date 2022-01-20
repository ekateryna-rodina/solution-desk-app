import React from "react";
import { IPaginatedResult } from "../../../pages/types";

type UsersTableProps = {
  paginatedData: IPaginatedResult;
};

const UsersTable = ({ paginatedData }: UsersTableProps) => {
  const fieldsToIgnore = new Set([
    "avatar",
    "id",
    "_id",
    "first_name",
    "last_name",
  ]);
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
      <table className="table-auto mx-8 bg-white shadow">
        <thead>
          <tr>
            {getColumnNames()?.map((c) => (
              <td className="p-4" key={c}>
                {c}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {getUsers()!.map((user, i) => (
            <tr key={user.name}>
              {Object.values(user).map((c) => (
                <td className="p-4" key={c.toString()}>
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
