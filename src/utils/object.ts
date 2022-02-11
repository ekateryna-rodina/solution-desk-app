import { TypeWithDiscriminator, User } from "../types";
import { formatDynamicValues } from "./string";

export function toTypeWithDiscriminant(entity: User) {
  const mapped: TypeWithDiscriminator<User> = Object.keys(entity).reduce(
    (acc, curr) => {
      acc[curr] = { __typename: "string", value: entity[curr] };
      return acc;
    },
    {}
  ) as TypeWithDiscriminator<User>;
  return {
    ...mapped,
    name: {
      __typename: "string",
      value: `${entity.firstName} ${entity.lastName}`,
    },
    employed: {
      __typename: "date",
      value: entity.employed ?? new Date().toUTCString(),
    },
    average: { __typename: "number", value: entity.average ?? 0 },
    inProgress: { __typename: "number", value: entity.inProgress ?? 0 },
    username: {
      __typename: "string",
      value: entity.username ?? entity.email.split("@")[0],
    },
    responseRateWithDynamic: {
      __typename: "dynamic",
      value: formatDynamicValues(
        entity.responseRate,
        entity.responseRateDynamic
      ),
    },
    customerServiceWithDynamic: {
      __typename: "dynamic",
      value: formatDynamicValues(
        entity.customerService,
        entity.customerServiceDynamic
      ),
    },
    dob: { __typename: "date", value: entity.dob },
    medals: {
      __typename: "multipleIcons",
      value: isNaN(entity.medals) ? 0 : entity.medals,
    },
    phone: { __typename: "string", value: entity.phone ?? "+1(800)345 3555" },
    email: { __typename: "email", value: entity.email },
  };
}
