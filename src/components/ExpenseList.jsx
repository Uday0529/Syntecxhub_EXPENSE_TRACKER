function ExpenseList({
    expenses,
    onDeleteExpense,
    onEditExpense
}) {

    return (
        <div>
            <h2>Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses yet.</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id}>
                        <h3>{expense.title}</h3>
                        <p>₹{expense.amount}</p>
                        <p>{expense.category}</p>

                        <button onClick={()=> onEditExpense(expense.id)}>
                            Edit
                        </button>
                        
                        <button onClick={() => onDeleteExpense(expense.id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ExpenseList;