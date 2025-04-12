import { useMemo } from "react";

// Custom hook: useFormattedDate
const useFormattedDate = (dateString?: string, fallback = "Unknown") => {
  return useMemo(() => {
    if (!dateString) return fallback;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return fallback;

    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [dateString, fallback]);
};

export default useFormattedDate;
