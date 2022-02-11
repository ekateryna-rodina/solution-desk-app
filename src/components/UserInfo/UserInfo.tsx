import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import { TypeWithDiscriminator, User } from "../../types";
import { UserInfoActions } from "../UserInfoActions";
import { UserInfoEdit } from "../UserInfoEdit";
import { UserInfoView } from "../UserInfoView";

const UserInfo = () => {
  const {
    current: { id },
  } = useAppSelector((state) => state.userInfo);
  const { page, limit } = useAppSelector((state) => state.usersPagination);
  const { applied } = useAppSelector((state) => state.filter);
  const { order, column } = useAppSelector((state) => state.usersSorting);
  const { search } = useAppSelector((state) => state.usersSearch);
  const { isEditMode } = useAppSelector((state) => state.userInfo);

  const {
    user,
    isLoading,
  }: { user: TypeWithDiscriminator<User>; isLoading: boolean } =
    useGetAllUsersQuery(
      {
        page: page.toString(),
        limit: limit.toString(),
        filter: encodeURIComponent(JSON.stringify(applied)),
        order: order.toString(),
        column: column.toString(),
        search,
      },
      {
        selectFromResult: ({ data, error, isLoading }) => {
          // const
          return {
            user: data?.data.filter((u) => u["_id"].value === id)[0],
            error,
            isLoading,
          };
        },
      }
    );

  if (isLoading || !user) return <h1>Loading</h1>;
  return (
    <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 justify-center items-center">
      {isEditMode ? <UserInfoEdit user={user} /> : <UserInfoView user={user} />}
      <UserInfoActions />
    </div>
  );
};

export default React.memo(UserInfo);
