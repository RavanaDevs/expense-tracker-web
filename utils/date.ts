export const getDefaultDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const dateAsInput = (date: Date) => {
  const d = date.toLocaleDateString();
  if (d === "Invalid Date") {
    return new Date().toISOString().split("T")[0];
  }
  return date.toISOString().split("T")[0];
};

export const dateAsIsoString = (date: Date) => {
  const d = date.toLocaleDateString();
  if (d === "Invalid Date") {
    return new Date().toISOString();
  }
  return date.toISOString();
};

export const getDateString = (date: Date): string => {
  const str = date.toISOString().split("T")[0];
  return str;
};

export const getDateOnly = (date: Date): Date => {
  const d = new Date(date.setHours(0, 0, 0, 0));
  return d;
};
