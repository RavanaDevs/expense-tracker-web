import { create } from "zustand";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangeStore {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setDateRange: (range: DateRange) => void;
}

export const useDateRangeStore = create<DateRangeStore>((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setDateRange: (range) =>
    set({ startDate: range.startDate, endDate: range.endDate }),
}));
