import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import {
  closeUserInfo,
  openUserInfo,
} from "../../features/userInfo/userInfo-slice";
import CaretDownIcon from "../icons/CaretDownIcon";
import CaretUpIcon from "../icons/CaretUpIcon";
import { Paginator } from "../Paginator";

const fieldsToIgnore = new Set(["avatar", "id", "first_name", "last_name"]);
const responsiveColsMap = {
  0: "",
  1: "hidden",
  2: "",
  3: "hidden lg:table-cell",
  4: "hidden lg:table-cell",
  5: "hidden 2xl:table-cell",
  6: "",
  7: "",
  8: "hidden 2xl:table-cell",
  9: "hidden xl:table-cell",
  10: "hidden xl:table-cell",
};
const UsersTable = () => {
  const { page, limit } = useAppSelector((state) => state.usersPagination);
  const { applied } = useAppSelector((state) => state.filter);
  const { current } = useAppSelector((state) => state.userInfo);
  const { data, isLoading } = useGetAllUsersQuery({
    page: page.toString(),
    limit: limit.toString(),
    filter: encodeURIComponent(JSON.stringify(applied)),
  });

  const [noResults, setNoResults] = useState(false);
  const dispatch = useAppDispatch();
  const getColumnNames = React.useMemo(() => {
    if (!data) return;
    const paginatedData = data.data || [];
    if (!paginatedData.length) return;
    const result = Object.keys(paginatedData[0]).filter(
      (c) => !fieldsToIgnore.has(c)
    );
    // add column name - move it to api
    result.splice(0, 0, "name");
    return result;
  }, [data]);
  const getUsers = React.useMemo(() => {
    const paginatedData = data?.data;
    if (!paginatedData || !paginatedData.length) return;
    const newUsers = paginatedData.map((user) => {
      return Object.keys(user)
        .filter((c) => !fieldsToIgnore.has(c))
        .reduce((ur: any, key) => {
          ur.name = `${user.first_name} ${user.last_name}`;
          return Object.assign(ur, { [key]: user[key] });
        }, {});
    });
    return newUsers;
  }, [data]);

  const onToggleUserInfo = (userId: string) => {
    console.log(userId);
    console.log(current);
    const isOpened = current && current.id === userId;
    if (isOpened) {
      dispatch(closeUserInfo());
    } else {
      dispatch(openUserInfo(userId));
    }
  };
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
                <td className={`p-4 ${responsiveColsMap[i]}`} key={c}>
                  {c}
                </td>
              );
            })}
            <td></td>
          </tr>
        </thead>
        <tbody className=" divide-y divide-slate-300">
          {getUsers?.map((user, i) => (
            <tr key={user.name}>
              {Object.values(user).map((c: any, i) => (
                <td
                  className={`p-4 ${responsiveColsMap[i]}`}
                  key={c.toString()}
                >
                  {c.toString()}
                </td>
              ))}
              <td className="bg-slate-400 w-8 ">
                <button
                  className="w-full h-12 flex justify-center items-center"
                  onClick={() => onToggleUserInfo(user["_id"])}
                >
                  {current && current.id === user["_id"] ? (
                    <CaretUpIcon fill={"fill-slate-600"} />
                  ) : (
                    <CaretDownIcon fill={"fill-slate-600"} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator />
    </div>
  );
};

export default UsersTable;
