import { TypeWithDiscriminator, User } from "../types";
import { formatDynamicValues } from "./string";

export function toTypeWithDiscriminant(
  entity: User
): TypeWithDiscriminator<User> {
  const mapped: TypeWithDiscriminator<User> = Object.keys(entity).reduce(
    (acc, curr) => {
      acc[curr] = {
        __typename: "string",
        isEditable: true,
        value: entity[curr],
      };
      return acc;
    },
    {}
  ) as TypeWithDiscriminator<User>;
  return {
    ...mapped,
    id: {
      __typename: "string",
      isEditable: false,
      value: `${entity._id.slice(0, 3)} ${entity._id.slice(-3)}`,
    },
    name: {
      __typename: "string",
      isEditable: true,
      value: `${entity.firstName} ${entity.lastName}`,
    },
    employed: {
      __typename: "date",
      isEditable: true,
      value: entity.employed ?? new Date().toUTCString(),
    },
    average: {
      __typename: "number",
      isEditable: false,
      value: entity.average ?? 0,
    },
    inProgress: {
      __typename: "number",
      isEditable: false,
      value: entity.inProgress ?? 0,
    },
    username: {
      __typename: "string",
      isEditable: true,
      value: entity.username ?? entity.email.split("@")[0],
    },
    responseRateWithDynamic: {
      __typename: "dynamic",
      isEditable: false,
      value: formatDynamicValues(
        entity.responseRate,
        entity.responseRateDynamic
      ),
    },
    customerServiceWithDynamic: {
      __typename: "dynamic",
      isEditable: false,
      value: formatDynamicValues(
        entity.customerService,
        entity.customerServiceDynamic
      ),
    },
    dob: { __typename: "date", isEditable: true, value: entity.dob },
    medals: {
      __typename: "multipleIcons",
      isEditable: false,
      value: isNaN(entity.medals) ? 0 : entity.medals,
    },
    phone: {
      __typename: "string",
      isEditable: true,
      value: entity.phone ?? "+1(800)345 3555",
    },
    email: { __typename: "email", isEditable: true, value: entity.email },
  };
}
