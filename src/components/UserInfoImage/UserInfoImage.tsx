import Image from "next/image";
import React from "react";
import { CloudImage } from "../CloudImage";

type UserInfoImageProps = {
  avatar: string;
};
const UserInfoImage = ({ avatar }: UserInfoImageProps) => {
  return (
    <div className="row-span-2 rounded-full border w-28 h-28 shadow-lg relative overflow-hidden mr-auto ml-auto">
      {avatar.includes("robohash") ? (
        <Image src={avatar} alt="avatar" layout="fill" objectFit="contain" />
      ) : (
        <CloudImage publicId={avatar} />
      )}
    </div>
  );
};

export default UserInfoImage;
