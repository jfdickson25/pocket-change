import * as React from "react";
import confetti from "canvas-confetti";
import { v4 as uuidv4 } from 'uuid';

const fashion = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/fashion.png?v=1683264925541";
const book = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/book.png?v=1683264924773";
const plant = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/plant.png?v=1686971984474";
const shirt = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/shirt.png?v=1683264977653";
const gaming = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/gaming.png?v=1683264926675";
const kitchen = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/kitchen.png?v=1683264927195";
const gadget = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/gadget.png?v=1683264926366";
const furniture = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/furniture.png?v=1683264925868";
const bathroom = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/bathroom.png?v=1683264924414";
const coin = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/coin.png?v=1683264925223";
const edit = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/edit.png?v=1683380186211";
const editActive = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/edit-active.png?v=1683380186525";
const remove = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/close.png?v=1683382087375";
const boardGame = "https://cdn.glitch.global/41b7f33a-06f1-410f-8174-9b6b9cbc6c5d/board-game.png?v=1683383328006";

export default function Home() {

  const [amount, setAmount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [expenses, setExpenses] = React.useState([]);
  const [active, setActive] = React.useState('book');
  const [editMode, setEditMode] = React.useState(false);
  const [editCategoryId, setEditCategoryId] = React.useState(null);
  const [incrementAmount, setIncrementAmount] = React.useState(0);
  const [itemEditId, setItemEditId] = React.useState(null);

  React.useEffect(() => {
    // Check to see if there is a value in local storage
    const amount = localStorage.getItem("amount");
    const expenses = localStorage.getItem("expenses");
    const incrementAmount = localStorage.getItem("incrementAmount");

    // If there is a value, set the amount to that value
    if (amount) {
      // Pare value to an float
      const amountInt = parseFloat(localStorage.getItem("amount"));
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

      // If the expense doesn't have an ID set it to 
      expensesArr.forEach((expense, index) => {
        if (!expense.id) {
          expensesArr[index].id = uuidv4();
        }

        if (!expense.date) {
          let date = new Date();

          // Create a string mm/dd/yyyy
          let dateString = `${date.getMonth() + 1}/${date.getDate()}`;
          expensesArr[index].date = dateString;
        }

        if (index !== 0) {
          // Check if there was a month change from the last expense
          if(expense.date.split('/')[0] !== expensesArr[index - 1].date.split('/')[0]) {
            expensesArr[index].dateChange = true;
          }
        }
      });

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

    // If there is a value, set the increment amount to that value
    if (incrementAmount) {
      // Parse value to an float
      const incrementAmountInt = parseFloat(localStorage.getItem("incrementAmount"));
      setIncrementAmount(incrementAmountInt);
    } else {
      // If there is no value, set the increment amount to 0
      setIncrementAmount(50);
      // Set the value in local storage to 0
      localStorage.setItem("incrementAmount", 50);
    }
  }, []);

  const addIncrement = () => {
    // Add 50 to the amount
    const newAmount = amount + incrementAmount;
    // Set the amount to the new amount
    setAmount(newAmount);
    // Set the value in local storage to the new amount
    localStorage.setItem("amount", newAmount);

    let date = new Date();
    // Create a string mm/dd/yyyy
    let dateString = `${date.getMonth() + 1}/${date.getDate()}`;

    // Add expense to the expenses array
    const newExpenses = [...expenses, {
      id: uuidv4(),
      name: "Payday!",
      amount: incrementAmount,
      expense: false,
      date: dateString
    }];

    // Set the expenses to the new expenses array
    setExpenses(newExpenses);
    // Set the value in local storage to the new expenses array
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const addExpense = () => {
    // Get the expense name
    const expenseName = document.getElementById("expense-name").value;
    // Get the expense amount
    const expenseAmount = document.getElementById("expense-amount").value;

    if(true === editMode && itemEditId === null) {
      alert("Please select an expense to edit.");
      // Set name and amount to empty strings
      document.getElementById("expense-name").value = "";
      document.getElementById("expense-amount").value = "";
      setActive('book');
      return;
    }

    if (false === editMode && itemEditId === null) {
      const id = uuidv4();

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

      let date = new Date();
      // Create a string mm/dd/yyyy
      let dateString = `${date.getMonth() + 1}/${date.getDate()}`;

      // Check if there is a localStorage object for expenses
      if (localStorage.getItem("expenses")) {
        // Add this expense to the localStorage object
        const expenses = JSON.parse(localStorage.getItem("expenses"));
        expenses.push({
          id: id,
          name: expenseName,
          amount: expenseAmount,
          category: active,
          expense: true,
          date: dateString
        });
        localStorage.setItem("expenses", JSON.stringify(expenses));
      } else {
        // Create a localStorage object for expenses
        const expenses = [{
          id: id,
          name: expenseName,
          amount: expenseAmount,
          category: active,
          expense: true,
          date: dateString
        }];
        localStorage.setItem("expenses", JSON.stringify(expenses));
      }

      // Add expense to the expenses array
      const newExpenses = [...expenses, {
        id: id,
        name: expenseName,
        amount: expenseAmount,
        category: active,
        expense: true,
        date: dateString
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
    } else if (editMode && itemEditId !== null) {
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
        // Find the expense in the expenses array
        const expense = expenses.find((expenseItem) => expenseItem.id === itemEditId);
        if (expense) {
          let newAmount;
          if (expenseAmount > expense.amount) {
            newAmount = amount - (expenseAmount - parseFloat(expense.amount));
            // Set local storage to the new amount
            localStorage.setItem("amount", newAmount);
          } else {
            newAmount = amount + (parseFloat(expense.amount) - expenseAmount);
            // Set local storage to the new amount
            localStorage.setItem("amount", newAmount);
          }

          setAmount(newAmount);

          // Update the expense in the expenses array
          const newExpenses = expenses.map((expenseItem) => {
            if (expenseItem.id === itemEditId) {
              expenseItem.name = expenseName;
              expenseItem.amount = expenseAmount;
              expenseItem.category = active;
              expenseItem.expense = true;
            }
            return expenseItem;
          });

          // Set the expenses to the new expenses array
          setExpenses(newExpenses);
          // Set the value in local storage to the new expenses array
          localStorage.setItem("expenses", JSON.stringify(newExpenses));

          // Clear the input fields
          document.getElementById("expense-name").value = "";
          document.getElementById("expense-amount").value = "";
          // Clear the item edit id
          setItemEditId(null);
        }
    }
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditCategoryId(null);

    // Clear the input fields
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
    // Clear the item edit id
    setItemEditId(null);
    // If we are not in edit mode, clear the active category
    setActive('book');
  }

  const categoryHandler = (expense) => {
    // Check expense is not an expense
    if (expense.expense) {
      // Set the active category to the category of the expense
      setActive(expense.category);
      // Set the edit category id to the id of the expense
      setEditCategoryId(expense.id);
    }
  }

  const categoryChangeHandler = (category) => {
    // Set the active category to the category
    setActive(category);

    if(editActive !== null) {
      // Set the category of the expense to the category
      const newExpenses = expenses.map((expense) => {
        if (expense.id === editCategoryId) {
          expense.category = category;
        }
        return expense;
      });

      // Set the expenses to the new expenses array
      setExpenses(newExpenses);
      // Set the value in local storage to the new expenses array
      localStorage.setItem("expenses", JSON.stringify(newExpenses));
    }
  }

  const removeItemHandler = (id) => {
    // Remove the expense from the expenses array
    const newExpenses = expenses.filter((expenseItem) => {
      if(expenseItem.id == id) {
        let newAmount;
        if(expenseItem.expense) {
          newAmount = amount + parseFloat(expenseItem.amount);
        } else {
          // Subtract the amount from the amount
          newAmount = amount - parseFloat(expenseItem.amount);
        }

        // Set the value in local storage to the new amount
        localStorage.setItem("amount", newAmount);
        // Set the amount to the new amount
        setAmount(newAmount);

      }
      return expenseItem.id !== id;
    });

    // Set the value in local storage to the new expenses array
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    // Set the expenses to the new expenses array
    setExpenses(newExpenses);
  }

  const changeItemHandler = (id) => {
    // check if we are in edit mode
    if (editMode) {
      // Find the expense in the expenses array and change it to be an input
      const expense = expenses.find((expenseItem) => expenseItem.id === id);
      if (expense) {
        // Change the expense name to an input
        const expenseNameInput = document.getElementById("expense-name");
        expenseNameInput.value = expense.name;
        // Change the expense amount to an input
        const expenseAmountInput = document.getElementById("expense-amount");
        expenseAmountInput.value = expense.amount;
        // Set the active category to the category of the expense
        setActive(expense.category);
        // Set the edit category id to the id of the expense
        setEditCategoryId(expense.id);
        // Set the item edit id to the id of the expense
        setItemEditId(expense.id);
      }
    }
  }

  return (
    <div id="content">
      {
        loading ? <p>Loading...</p>
        : 
        (
          <>
            <img src={editMode ? editActive : edit} id="edit" onClick={toggleEditMode} />
            { 
              editMode ? (
                <input type="number" id="amount-input" value={amount.toFixed(2)} onChange={(e) => {
                  // Convert value to an float
                  const amountInt = parseFloat(e.target.value);
                  setAmount(amountInt);
                  localStorage.setItem("amount", amountInt);
                }} />
              ) : (<div id="amount">${amount.toFixed(2)}</div>)
            }
            {
              editMode ? (
                <input type="number" id="increment-amount-input" value={incrementAmount} onChange={(e) => {
                  // Convert value to an float
                  const incrementAmountInt = parseFloat(e.target.value);
                  setIncrementAmount(incrementAmountInt);
                  localStorage.setItem("incrementAmount", incrementAmountInt);
                }} />
              ) : (<button id="add" onClick={addIncrement}>+{incrementAmount}</button>)
            }
            <div id="expense-input">
              <input type="text" id="expense-name" placeholder="Item Name" />
              <input type="number" id="expense-amount" placeholder="$" />
              <button id="add-expense" onClick={addExpense}>
                { editMode ? "Edit" : "Add" }
              </button>
            </div>
            <div className="categories">
              <img onClick={() => { categoryChangeHandler('book') }} style={ active === 'book' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={book} alt="book" />
              <img onClick={() => { categoryChangeHandler('plant') }} style={ active === 'plant' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={plant} alt="plant" />
              <img onClick={() => { categoryChangeHandler('fashion') }} style={ active === 'fashion' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={fashion} alt="Fashion" />
              <img onClick={() => { categoryChangeHandler('shirt') }} style={ active === 'shirt' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={shirt} alt="shirt" />
              <img onClick={() => { categoryChangeHandler('gaming') }} style={ active === 'gaming' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={gaming} alt="gaming" />
              <img onClick={() => { categoryChangeHandler('gadget') }} style={ active === 'gadget' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={gadget} alt="gadget" />
              <img onClick={() => { categoryChangeHandler('bathroom') }} style={ active === 'bathroom' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={bathroom} alt="bathroom" />
              <img onClick={() => { categoryChangeHandler('kitchen') }} style={ active === 'kitchen' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={kitchen} alt="kitchen" />
              <img onClick={() => { categoryChangeHandler('furniture') }} style={ active === 'furniture' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={furniture} alt="furniture" />
              <img onClick={() => { categoryChangeHandler('boardGame') }} style={ active === 'boardGame' ? {backgroundColor: '#ffc107'} : null } className="category-img" src={boardGame} alt="board game" />
            </div>
            <div id="expenses-list">
              {
                expenses.slice(0).reverse().map((expense, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="expense"
                        style={ editCategoryId === expense.id ? {borderBottom: 'solid 1px #ffc107'} : null}
                        onClick={editMode ? () => { changeItemHandler(expense.id) } : undefined }
                      >
                        <img 
                          className="expense-img" 
                          src={ expense.expense ? eval(expense.category) : coin} 
                          alt={expense.category}
                        />
                        <div className="expense-name">
                            {expense.name}
                        </div>
                        { editMode ? 
                          (
                            <img className="expense-remove" src={remove} onClick={() => { removeItemHandler(expense.id) } } /> 
                          )
                          :
                          (
                            <div className="expense-amount" style={ expense.expense ? {color: '#dc3545'} : {color: '#198754' }}>
                              {expense.expense ? "-" : "+"}
                              ${expense.amount}
                            </div>
                          ) 
                        }
                        <div className="expense-date">{expense.date}</div>
                      </div>
                      { expense.dateChange ? <div className="month-divider"></div> : null }
                    </React.Fragment>
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
