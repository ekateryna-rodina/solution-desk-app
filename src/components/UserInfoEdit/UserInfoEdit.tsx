import React from "react";
import { TypeWithDiscriminator, User } from "../../types";

type UserInfoEditProps = {
  user: TypeWithDiscriminator<User>;
};
const UserInfoEdit = ({ user }: UserInfoEditProps) => {
  return <form></form>;
};

export default UserInfoEdit;
