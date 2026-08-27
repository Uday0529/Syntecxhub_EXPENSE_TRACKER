import { useEffect, useRef, useState } from "react";


function ExpenseFrom({ onAddExpenses, editingExpense, onUpdateExpense }) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState("");

    const titleInputRef = useRef(null);

    useEffect(() => {
        if (editingExpense) {
            setTitle(editingExpense.title);
            setAmount(editingExpense.amount);
            setCategory(editingExpense.category);
            setDate(editingExpense.date);
        }
    }, [editingExpense]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !amount) {
            alert("Please enter title and amount");
            return;
        }
        if (editingExpense) {
            const updatedExpense = {
                ...editingExpense,
                title,
                amount: Number(amount),
                category,
                date
            };

            onUpdateExpense(updatedExpense);
        }
        else {
            const newExpenses = {
                id: Date.now(),
                title,
                amount: Number(amount),
                category,
                date
            };

            onAddExpenses(newExpenses);
        }


        setTitle("");
        setAmount("");
        setCategory("Food");

        titleInputRef.current?.focus();
    };

    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <lable>Title</lable>

            <input
                ref={titleInputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter expense title"
            />

            <lable>Amount</lable>

            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount" />

            <lable>Category</lable>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
            </select>

            <lable>Date</lable>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button type="submit">
                {editingExpense ? "Update Expense" : "Add Expense"}
            </button>

        </form>
    );
}

export default ExpenseFrom;