import ExpenseForm from './components/ExpenseForm';

export default function Home() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Add Expense</h2>
        <ExpenseForm />
      </div>
    </div>
  );
}
