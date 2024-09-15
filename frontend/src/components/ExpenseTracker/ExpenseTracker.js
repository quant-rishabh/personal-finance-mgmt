import {useState} from "react";

const ExpenseTracker = () => {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const [expenses, setExpenses] = useState([]);

    const addExpense = () => {
        const newExpense = {description, amount};
        setExpenses([...expenses, newExpense]);
        setDescription('')
        setAmount('')
    }
    return (
           <div>
               <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text"/>
               <input  value={amount} onChange={(e)=>{setAmount(e.target.value)}} type="number"/>
               <button onClick={addExpense} >Add </button>
               <div>
                   {
                       expenses.length===0? (
                           <p>No expenses added yet</p>
                       ):
                           (
                               <ul>
                                   {expenses.map((expense, index) => (
                                       <li key={index}>
                                           {expense.description} - {expense.amount}
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
