import React, { useEffect, useState } from "react";
import { ResponsiveColsMap } from "../../../pages/constants";
import { useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import { Paginator } from "../Paginator";
import UserTableRow from "../UserTableRow/UserTableRow";

const UsersTable = () => {
  const { page, limit } = useAppSelector((state) => state.usersPagination);
  const { applied } = useAppSelector((state) => state.filter);

  const { data, isLoading } = useGetAllUsersQuery({
    page: page.toString(),
    limit: limit.toString(),
    filter: encodeURIComponent(JSON.stringify(applied)),
  });

  const [noResults, setNoResults] = useState(false);

  const getColumnNames = React.useMemo(() => {
    if (!data) return;
    const paginatedData = data.data || [];
    if (!paginatedData.length) return;
    return Object.keys(paginatedData[0]);
  }, [data]);
  const getUsers = React.useMemo(() => {
    const paginatedData = data?.data;
    if (!paginatedData || !paginatedData.length) return;
    return paginatedData;
  }, [data]);
  useEffect(() => {
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
                <td className={`p-4 ${ResponsiveColsMap[c]}`} key={i}>
                  {c}
                </td>
              );
            })}
            <td></td>
          </tr>
        </thead>
        <tbody className=" divide-y divide-slate-300">
          {getUsers?.map((user) => (
            <UserTableRow user={user} key={user["_id"]} />
          ))}
        </tbody>
      </table>
      <Paginator />
    </div>
  );
};

export default UsersTable;
