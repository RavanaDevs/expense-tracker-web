export default function ExpenseStats() {
  const stats = {
    total: 52.50,
    average: 26.25,
    mostExpensive: 'Food',
    topCategory: 'Food'
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
        <h3 className="text-sm text-slate-600">Total</h3>
        <p className="text-2xl font-medium text-slate-900 mt-1">${stats.total.toFixed(2)}</p>
      </div>
      <div className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
        <h3 className="text-sm text-slate-600">Average</h3>
        <p className="text-2xl font-medium text-slate-900 mt-1">${stats.average.toFixed(2)}</p>
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