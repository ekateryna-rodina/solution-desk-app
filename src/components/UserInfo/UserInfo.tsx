import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import { TypeWithDiscriminator, User } from "../../types";
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
  return isEditMode ? (
    <UserInfoEdit user={user} />
  ) : (
    <UserInfoView user={user} />
  );
};

export default React.memo(UserInfo);
