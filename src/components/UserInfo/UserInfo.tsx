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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 justify-center items-center">
      <div className="grid grid-cols-1 grid-rows-3 justify-center items-center py-4">
        <div className="row-span-2 rounded-full border w-28 h-28 shadow-lg relative overflow-hidden mr-auto ml-auto">
          <Image
            src={user.avatar}
            alt="avatar"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="">Name</span>
          <span className="">Role</span>
          <span className="">department</span>
        </div>
      </div>
      <div className="grid grid-rows-6 gap-2 px-4">
        <div className="row-span-2">Personal Information</div>
        <div className="flex justify-between">
          <span>Nickname</span>
          <span>nick</span>
        </div>
        <div className="flex justify-between">
          <span>DOB</span>
          <span>13.03.1987</span>
        </div>
        <div className="flex justify-between">
          <span>Gender</span>
          <span>Male</span>
        </div>
        <div className="flex justify-between">
          <span>Employed</span>
          <span>13.03.1987</span>
        </div>
        <div className="flex justify-between">
          <span>Experience</span>
          <span>5 years</span>
        </div>
      </div>
      <div className="grid grid-rows-6 gap-2 px-4">
        <div className="row-span-2">Productivity</div>
        <div className="flex justify-between">
          <span>Response rate</span>
          <span>96%</span>
        </div>
        <div className="flex justify-between">
          <span>Customer support</span>
          <span>5.0</span>
        </div>
        <div className="flex justify-between">
          <span>Tickets in progress</span>
          <span>500(overhelmed)</span>
        </div>
        <div className="flex justify-between">
          <span>Average processing p/months</span>
          <span>398</span>
        </div>
        <div className="flex justify-between">
          <span>Medals</span>
          <span>7</span>
        </div>
      </div>
      <div className="grid grid-rows-6 gap-2 px-4">
        <div className="row-span-2">Contacts</div>
        <div className="flex justify-between">
          <span>Phone</span>
          <span>+198767908689</span>
        </div>
        <div className="flex justify-between">
          <span>Email</span>
          <span>Icon</span>
        </div>
        <div className="flex justify-between">
          <span>IP address</span>
          <span>255.255.255.255</span>
        </div>
        <div className="flex justify-between">
          <span>Country</span>
          <span>Estonia</span>
        </div>
        <div className="flex justify-between">
          <span>City</span>
          <span>Pettgok</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
