import './App.css';
import { useEffect, useMemo, useState } from "react";
import ExpenseFrom from "./components/ExpenseFrom";
import ExpenseList from "./components/ExpenseList";
import { getExpenses } from "./services/expenseApi";


function App() {

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchExpenses = async () => {

      try {
        setLoading(true);
        setError("");

        const data = await getExpenses();

        setExpenses(data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    };

    fetchExpenses();

  }, []);

  const addExpenses = (expenses) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      expenses
    ]);
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {

      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "All" ||
        expense.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, filterCategory]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
  }, [expenses]);

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
        <div className="filters">

          <input
            type="text"
            placeholder="Search expense..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>

        </div>

        <section>
          {loading && <p>Loading expenses...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && expenses.length === 0 && (
            <p>No expenses found.</p>
          )}

          {!loading && !error && expenses.length > 0 && (
            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={deleteExpense}
              onEditExpense={startEditing}
            />
          )}

        </section>
      </div>
    </div>
  );
}

export default App;