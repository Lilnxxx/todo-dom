"use strict";

// extract form 
let expense_form = document.getElementById("expense-tracker-form");

// unique id for local storage key
var uniqueKey = 500;

// show all expense list items on dom content load / on page load
window.addEventListener("DOMContentLoaded", ()=> {
    // Object.keys(localStorage).forEach((key) => {
    if(localStorage.getItem("keyis"))
        uniqueKey=localStorage.getItem("keyis")
    for(var i=500;i<=1000;i++){
        if(!localStorage.getItem(i))continue;
        let expense_obj = JSON.parse(localStorage.getItem(i));
        // console.log(i)
        showExpenses(expense_obj);
    }
})


// add functionality
expense_form.addEventListener("submit", (e) => {
    e.preventDefault();

    let description = e.target.description.value;
    let expence = e.target.expence.value;
    let category = e.target.category.value;

    let expense_obj = {
        id: uniqueKey,
        description,
        expence,
        category
    }

    // serialise this obj and store to local storage (i.e., convert it into a string)
    let serialise_expense = JSON.stringify(expense_obj);
    console.log(uniqueKey)
    localStorage.setItem(uniqueKey, serialise_expense);
    uniqueKey++;
    localStorage.setItem("keyis",uniqueKey)
    // show newly added user on screen
    showExpenses(expense_obj);


    // clear input fields
    e.target.description.value = "", e.target.expence.value = "", e.target.category.value = "";

})

// show expense list items by passing actual expense object
function showExpenses(expense_obj) {

    let parentnode = document.getElementById("users");


    let childHtml = `
<li class="expense-list-item" id=${expense_obj.id.toString()}> Category: ${expense_obj.category}, Description: ${expense_obj.description} -----> Expense: ₹${expense_obj.expence} 

<button onclick = deleteExpense('${JSON.stringify(parseInt(expense_obj.id))}')>Delete</button>
<button onclick=editExpense('${JSON.stringify(parseInt(expense_obj.id))}')>Edit</button>

</li>
`;
    parentnode.innerHTML += childHtml;
}

// edit functionality
function editExpense(key){
    // var key=parseInt(ke)
    let expense_obj = JSON.parse( localStorage.getItem(key));

    document.getElementById("exp").value = expense_obj.expence;
    document.getElementById("desc").value = expense_obj.description;
    document.getElementById("cate").value = expense_obj.category;

    deleteExpense(key);
}


// delete functionality
function deleteExpense(key) {
    // var key=parseInt(ke)
    console.log(key)
    localStorage.removeItem(key);

    // remove from ui
    const parentnode = document.getElementById("users");
    const nodeToBeDeleted = document.getElementById(key.toString());
    if(nodeToBeDeleted) parentnode.removeChild(nodeToBeDeleted);

}
