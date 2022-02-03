import moment from "moment";

export const formatTitle = (title) =>
  title
    .split(/(?=[A-Z])/)
    .map((w) => `${w[0].toUpperCase()}${w.substring(1)}`)
    .filter((w) => !["With", "Dynamic"].includes(w))
    .join(" ");

export const formatDate = (date: string | Date) =>
  moment(date).format("MM/DD/YYYY");
