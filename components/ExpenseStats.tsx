import { formatCurrency } from '@/utils/currency';


export default function ExpenseStats() {
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
      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-white dark:bg-slate-800">
        <h3 className="text-sm text-slate-600 dark:text-slate-400">Total</h3>
        <p className="text-2xl font-medium text-slate-900 dark:text-white mt-1">{formatCurrency(stats.total)}</p>
      </div>
      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-white dark:bg-slate-800">
        <h3 className="text-sm text-slate-600 dark:text-slate-400">Average</h3>
        <p className="text-2xl font-medium text-slate-900 dark:text-white mt-1">{formatCurrency(stats.average)}</p>
      </div>
      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-white dark:bg-slate-800">
        <h3 className="text-sm text-slate-600 dark:text-slate-400">Highest</h3>
        <p className="text-2xl font-medium text-slate-900 dark:text-white mt-1">{stats.mostExpensive}</p>
      </div>
      <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-white dark:bg-slate-800">
        <h3 className="text-sm text-slate-600 dark:text-slate-400">Top Category</h3>
        <p className="text-2xl font-medium text-slate-900 dark:text-white mt-1">{stats.topCategory}</p>
      </div>
    </div>
  );
} 