import { formatCurrency } from '@/app/utils/currency';

interface ExpenseStatsProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export default function ExpenseStats({ dateRange }: ExpenseStatsProps) {
  const calculateStats = () => {
    return {
      total: 97.50,
      average: 24.38,
      mostExpensive: 'Food',
      topCategory: 'Food'
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
        <h3 className="text-sm text-slate-600">Total</h3>
        <p className="text-2xl font-medium text-slate-900 mt-1">{formatCurrency(stats.total)}</p>
      </div>
      <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
        <h3 className="text-sm text-slate-600">Average</h3>
        <p className="text-2xl font-medium text-slate-900 mt-1">{formatCurrency(stats.average)}</p>
      </div>
      <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
        <h3 className="text-sm text-slate-600">Highest</h3>
        <p className="text-2xl font-medium text-slate-900 mt-1">{stats.mostExpensive}</p>
      </div>
      <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
        <h3 className="text-sm text-slate-600">Top Category</h3>
        <p className="text-2xl font-medium text-slate-900 mt-1">{stats.topCategory}</p>
      </div>
    </div>
  );
} 