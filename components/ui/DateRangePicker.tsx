'use client';

import { DateRange } from "@/types";

interface DateRangePickerProps {
  dateRange: DateRange;
  onChange: (dateRange: DateRange) => void;
}

export default function DateRangePicker({ dateRange, onChange }: DateRangePickerProps) {
  return (
    <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-slate-600 mb-1">From</label>
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => onChange({ ...dateRange, startDate: e.target.value })}
          className="px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900 focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-slate-600 mb-1">To</label>
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => onChange({ ...dateRange, endDate: e.target.value })}
          className="px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900 focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
      </div>
    </div>
  );
} 