import Image from "next/image";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useGetAllUsersQuery } from "../../app/solutionDeskApi";
import { IUser } from "../../types";

const UserInfo = () => {
  const {
    current: { id },
  } = useAppSelector((state) => state.userInfo);
  const { page, limit } = useAppSelector((state) => state.usersPagination);
  const { applied } = useAppSelector((state) => state.filter);

  const { user, isLoading }: { user: IUser; isLoading: boolean } =
    useGetAllUsersQuery(
      {
        page: page.toString(),
        limit: limit.toString(),
        filter: encodeURIComponent(JSON.stringify(applied)),
      },
      {
        selectFromResult: ({ data, error, isLoading }) => ({
          user: data?.data.filter((u) => u["_id"] === id)[0],
          error,
          isLoading,
        }),
      }
    );

  if (isLoading || !user) return <h1>Loading</h1>;
  return (
    <div className="grid">
      <div>
        {id}
        <Image src={user.avatar} width={30} height={30} />
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
