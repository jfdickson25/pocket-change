import * as React from "react";

const fashion = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/fashion.png?v=1683264925541";
const book = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/book.png?v=1683264924773";
const shirt = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/shirt.png?v=1683264977653";
const gaming = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/gaming.png?v=1683264926675";
const kitchen = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/kitchen.png?v=1683264927195";
const gadget = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/gadget.png?v=1683264926366";
const furniture = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/furniture.png?v=1683264925868";
const bathroom = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/bathroom.png?v=1683264924414";
const coin = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/coin.png?v=1683264925223";

export default function Home() {

  const [amount, setAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [expenses, setExpenses] = React.useState([]);
  const [active, setActive] = React.useState('book');

  React.useEffect(() => {
    // Check to see if there is a value in local storage
    const amount = localStorage.getItem("amount");
    const expenses = localStorage.getItem("expenses");

    // If there is a value, set the amount to that value
    if (amount) {
      // Pare value to an integer
      const amountInt = parseInt(localStorage.getItem("amount"));
      setAmount(amountInt);
      setLoading(false);
    } else {
      // If there is no value, set the amount to 0
      setAmount(0);
      setLoading(false);
      // Set the value in local storage to 0
      localStorage.setItem("amount", 0);
    }

    // If there is a value, set the expenses to that value
    if (expenses) {
      // Parse value to an array
      const expensesArr = JSON.parse(localStorage.getItem("expenses"));
      // If there is no category for a given item in the expenses array, set it to book
      for (let i = 0; i < expensesArr.length; i++) {
        if (!expensesArr[i].category) {
          expensesArr[i].category = "book";
        }
      }
      // Set the expenses to the expenses array
      setExpenses(expensesArr);
      // Set the value in local storage to the expenses array
      localStorage.setItem("expenses", JSON.stringify(expensesArr));
    } else {
      // If there is no value, set the expenses to an empty array
      setExpenses([]);
      // Set the value in local storage to an empty array
      localStorage.setItem("expenses", JSON.stringify([]));
    }
  }, []);

  const addOneHundred = () => {
    // Add 1 to the amount
    const newAmount = amount + 100;
    // Set the amount to the new amount
    setAmount(newAmount);
    // Set the value in local storage to the new amount
    localStorage.setItem("amount", newAmount);

    // Add expense to the expenses array
    const newExpenses = [...expenses, {
      name: "Payday!",
      amount: 100,
      expense: false
    }];

    // Set the expenses to the new expenses array
    setExpenses(newExpenses);
    // Set the value in local storage to the new expenses array
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  }

  const addExpense = () => {
    // Get the expense name
    const expenseName = document.getElementById("expense-name").value;
    // Get the expense amount
    const expenseAmount = document.getElementById("expense-amount").value;

    // Check to see if the expense name is not empty
    if (expenseName === "") {
      alert("Please enter an expense name.");
      return;
    }
    // Check to see if the expense amount is not empty
    if (expenseAmount === "") {
      alert("Please enter an expense amount.");
      return;
    }

    // Check to see if the expense amount is a number
    if (isNaN(expenseAmount)) {
      alert("Please enter a number for the expense amount.");
      return;
    }
    // Check to see if the expense amount is a positive number
    if (expenseAmount < 0) {
      alert("Please enter a positive number for the expense amount.");
      return;
    }
    // Check to see if the expense amount is greater than the amount
    if (expenseAmount > amount) {
      // set amount to 0
      setAmount(0);
      // set the value in local storage to 0
      localStorage.setItem("amount", 0);
      // Add expense to the expenses array
      const newExpenses = [...expenses, {
        name: expenseName,
        amount: expenseAmount,
        category: active,
        expense: true
      }];
      // Set the expenses to the new expenses array
      setExpenses(newExpenses);
      // alert the user that they have no more money
      alert("You have no more money.");
      return;
    }

    // Check if there is a localStorage object for expenses
    if (localStorage.getItem("expenses")) {
      // Add this expense to the localStorage object
      const expenses = JSON.parse(localStorage.getItem("expenses"));
      expenses.push({
        name: expenseName,
        amount: expenseAmount,
        category: active,
        expense: true
      });
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } else {
      // Create a localStorage object for expenses
      const expenses = [{
        name: expenseName,
        amount: expenseAmount,
        category: active,
        expense: true
      }];
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Add expense to the expenses array
    const newExpenses = [...expenses, {
      name: expenseName,
      amount: expenseAmount,
      category: active,
      expense: true
    }];

    // Set the expenses to the new expenses array
    setExpenses(newExpenses);

    // Subtract the expense amount from the amount
    const newAmount = amount - expenseAmount;
    // Set the amount to the new amount
    setAmount(newAmount);
    // Set the value in local storage to the new amount
    localStorage.setItem("amount", newAmount);
    // Clear the expense name
    document.getElementById("expense-name").value = "";
    // Clear the expense amount
    document.getElementById("expense-amount").value = "";
  }

  return (
    <div id="content">
      {
        loading ? <p>Loading...</p>
        : 
        (
          <>
            <div id="amount">${amount}</div>
            <button id="add" onClick={addOneHundred}>+100</button>
            <div className="categories">
              <img onClick={() => { setActive('book') }} style={ active === 'book' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={book} alt="book" />
              <img onClick={() => { setActive('fashion') }} style={ active === 'fashion' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={fashion} alt="Fashion" />
              <img onClick={() => { setActive('shirt') }} style={ active === 'shirt' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={shirt} alt="shirt" />
              <img onClick={() => { setActive('gaming') }} style={ active === 'gaming' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={gaming} alt="gaming" />
              <img onClick={() => { setActive('gadget') }} style={ active === 'gadget' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={gadget} alt="gadget" />
              <img onClick={() => { setActive('bathroom') }} style={ active === 'bathroom' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={bathroom} alt="bathroom" />
              <img onClick={() => { setActive('kitchen') }} style={ active === 'kitchen' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={kitchen} alt="kitchen" />
              <img onClick={() => { setActive('furniture') }} style={ active === 'furniture' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={furniture} alt="furniture" />
            </div>
            <div id="expense-input">
              <input type="text" id="expense-name" placeholder="Expense Name" />
              <input type="number" id="expense-amount" placeholder="Expense Amount" />
              <button id="add-expense" onClick={addExpense}>Add Expense</button>
            </div>
            <div id="expenses-list">
              {
                expenses.slice(0).reverse().map((expense, index) => {
                  return (
                    <div key={index} className="expense">
                      <img className="expense-img" src={ expense.expense ? eval(expense.category) : coin} alt={expense.category} />
                      <div className="expense-name">{expense.name}</div>
                      <div className="expense-amount" style={ expense.expense ? {color: '#dc3545'} : {color: '#198754' }}>
                        {expense.expense ? "-" : "+"}
                        ${expense.amount}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>

        )
      }

    </div>
  );
}
