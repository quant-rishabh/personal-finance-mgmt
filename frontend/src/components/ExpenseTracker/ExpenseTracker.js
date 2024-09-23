import {useState,useEffect} from "react";

const ExpenseTracker = () => {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [filteredList, setFilteredList] = useState(expenses);

    const addExpense = () => {
        const newExpense = { id: Date.now(),   description, amount, category};
        setExpenses([...expenses, newExpense]);
        setDescription('')
        setAmount('')
    }

    const deleteExpense = (id) => {
        setExpenses(expenses.filter((expense) => expense.id !== id))
    }

    const clearALl = () => {
        setExpenses([])
    }

    // Load expenses from localStorage when the component mounts
    useEffect(() => {
        const storedExpenses = localStorage.getItem("expenses");
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses)); // Load saved expenses from localStorage
        }
    }, []);

    useEffect(() => {
        setFilteredList(expenses);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        console.log("Expenses updated, filtering list...");
    }, [expenses]);



    const filterByCategory = (event) => {
        setCategory(event.target.value)
        setFilteredList(expenses.filter((expense) => event.target.value === 'All'? true : event.target.value === expense.category))
    }

    const [editMode, setEditMode] = useState();

    const editExpense = (id) => {

    }


    return (
        <div>
            <input placeholder={"Description"} value={description} onChange={(e) => {
                setDescription(e.target.value)
            }} type="text"/>
            <input placeholder={"Price"} value={amount} onChange={(e) => {
                setAmount(e.target.value)
            }} type="number"/>
            <select onChange={event => setCategory(event.target.value)}>
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Study">Study</option>
            </select>

            <select onChange={event => filterByCategory(event)}>

                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Study">Study</option>
            </select>
            <button onClick={addExpense}>Add</button>
            <button onClick={clearALl}>Clear all</button>
            <div>
                {
                    filteredList.length === 0 ? (
                            <p>No expenses added yet</p>
                        ) :
                        (
                            <ul>
                                {filteredList.map((expense, index) => (
                                    <li key={expense.id}>
                                        {expense.description} - {expense.amount} - {expense.category}
                                        <button onClick={() => editExpense(expense.id)}>Edit</button>
                                        <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        )
                }
            </div>
        </div>

    )
}


export default ExpenseTracker;
