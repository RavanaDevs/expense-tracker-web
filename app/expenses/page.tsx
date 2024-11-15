import ExpenseList from '../components/ExpenseList';
import ExpenseStats from '../components/ExpenseStats';

export default function ExpensesPage() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Statistics</h2>
        <ExpenseStats />
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Expenses</h2>
        <ExpenseList />
      </div>
    </div>
  );
} 