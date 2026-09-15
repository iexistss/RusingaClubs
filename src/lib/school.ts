export const TERM_START = "September";
export const TERM_END = "June";

export function schoolYearFor(date = new Date()) {
  const year = date.getFullYear();
  return date.getMonth() >= 7 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
}

// Evaluated on each app/server start, so August begins the next school year.
export const SCHOOL_YEAR = schoolYearFor();
