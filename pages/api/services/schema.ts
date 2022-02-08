import { date, object, string, TypeOf } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ipAddressRexExp =
  /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;

// move to config
const genders = [
  "Agender",
  "Bigender",
  "Female",
  "Genderfluid",
  "Genderqueer",
  "Male",
  "Non-binary",
  "Polygender",
];
const departments = ["Adoption", "Deployment", "Expansion", "Sale"];
export const postSchema = object({
  firstName: string().required().min(2),
  lastName: string().required().min(2),
  email: string().required().email(),
  gender: string().required().oneOf(genders),
  ipAddress: string()
    .required()
    .matches(ipAddressRexExp, "Ip address is not valid"),
  avatar: string().required().min(3),
  username: string().optional(),
  address: string().optional(),
  city: string().required().min(2),
  country: string().required().min(2),
  characteristic: string().required().min(7),
  department: string().required().oneOf(departments),
  dob: date().required(),
  employed: date().required(),
  phone: string().required().matches(phoneRegExp, "Phone number is not valid"),
});

export type UserPost = TypeOf<typeof postSchema>;
