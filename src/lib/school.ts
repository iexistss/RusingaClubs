export const SCHOOL_YEAR = "2026/2027";
export const TERM_START = "September";
export const TERM_END = "June";

export function schoolYearFor(date = new Date()) {
  const year = date.getFullYear();
  return date.getMonth() >= 8 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
}
