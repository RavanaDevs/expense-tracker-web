export default function ExpenseList() {
  const expenses = [
    { id: 1, amount: 50.00, category: 'food', date: new Date().toLocaleDateString() },
    { id: 2, amount: 2.50, category: 'transport', date: new Date().toLocaleDateString() },
  ];

  const getEmoji = (category: string) => {
    const emojis: {[key: string]: string} = {
      food: '🍕',
      transport: '🚗',
      utilities: '🏠',
      entertainment: '🎮',
      other: '📦'
    };
    return emojis[category] || '📦';
  };

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div key={expense.id} className="flex justify-between items-center p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white">
          <div className="flex items-center space-x-3">
            <span className="text-xl">{getEmoji(expense.category)}</span>
            <div>
              <p className="text-sm text-slate-700 capitalize">{expense.category}</p>
              <p className="text-xs text-slate-500">{expense.date}</p>
            </div>
          </div>
          <span className="font-medium text-slate-900">${expense.amount.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
} 