import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import { Paginator } from "../Paginator";

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
  7: "hidden 2xl:table-cell",
  8: "hidden xl:table-cell",
  9: "hidden xl:table-cell",
};
const UsersTable = () => {
  const { page, limit } = useAppSelector((state) => state.usersPagination);
  console.log(page, limit);
  const { data, isLoading } = useGetAllUsersQuery({
    page: page.toString(),
    limit: limit.toString(),
  });

  const [noResults, setNoResults] = useState(false);
  const getColumnNames = React.useMemo(() => {
    if (!data) return;
    const paginatedData = data.data;
    const result = Object.keys(paginatedData[0]).filter(
      (c) => !fieldsToIgnore.has(c)
    );
    result.splice(0, 0, "name");
    return result;
  }, [data]);
  const getUsers = React.useMemo(() => {
    if (!data) return;
    const paginatedData = data.data;
    const newUsers = paginatedData.map((user) => {
      return Object.keys(user)
        .filter((c) => !fieldsToIgnore.has(c))
        .reduce((ur, key) => {
          ur.name = `${user.first_name} ${user.last_name}`;
          return Object.assign(ur, { [key]: user[key] });
        }, {});
    });
    return newUsers;
  }, [data]);

  useEffect(() => {
    console.log(data);
    if (!data || !data.data) return;
    setNoResults(!data.data.length);
  }, [data]);
  if (isLoading) return <>Loading</>;
  if (noResults) return <h1>Placehholer for no results</h1>;
  return (
    <div className="relative mx-8">
      <table className="table-auto w-full bg-white shadow">
        <thead className="text-slate-500 bg-slate-200 font-semibold">
          <tr>
            {getColumnNames?.map((c, i) => {
              return (
                <td className={`p-4 ${responsiveColsMap[i]}`} key={c}>
                  {c}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody className=" divide-y divide-slate-300">
          {getUsers.map((user, i) => (
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
      <Paginator />
    </div>
  );
};

export default UsersTable;
