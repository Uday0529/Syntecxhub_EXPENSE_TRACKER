import './App.css';
import { useEffect, useState } from "react";
import ExpenseFrom from "./components/ExpenseFrom";
import ExpenseList from "./components/ExpenseList";
import { getExpenses } from "./services/expenseApi";


function App() {

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const loadExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
    };

    loadExpenses();
  }, []);

  const addExpenses = (expenses) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      expenses
    ]);
  };

  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    })
  }

  const startEditing = (id) => {
    const expenseToEdit = expenses.find(
      (expense) => expense.id === id
    );

    setEditingExpense(expenseToEdit);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
    setEditingExpense(null);
  };


  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <h2>Total Expense</h2>
      <p>₹{totalExpenses}</p>

      <div className="expense-container">
        <section>
          <ExpenseFrom
            onAddExpenses={addExpenses}
            editingExpense={editingExpense}
            onUpdateExpense={updateExpense} />
        </section>
        <section>
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={deleteExpense}
            onEditExpense={startEditing} />
        </section>
      </div>
    </div>
  );
}

export default App;