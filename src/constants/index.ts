export enum ResponseRate {
  Low,
  Medium,
  High,
}
export enum CustomerService {
  Low,
  Medium,
  High,
}

export enum TermSearchFilterType {
  Is,
  Not,
  Contains,
}

export const LevelPropertiesMap = {
  customerService: {
    low: [0, 1.7],
    medium: [1.8, 3.4],
    high: [3.5, 5],
  },
  responseRate: {
    low: [0, 34],
    medium: [35, 75],
    high: [76, 100],
  },
};

export const TermSearchFilterStringsMap = {
  [TermSearchFilterType.Is]: "is",
  [TermSearchFilterType.Not]: "is not",
  [TermSearchFilterType.Contains]: "includes",
};

export const FieldsToIgnore = new Set([
  "avatar",
  "id",
  "first_name",
  "last_name",
]);
export const ResponsiveColsMap = {
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
