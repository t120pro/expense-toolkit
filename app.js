import { expenses } from "./expenses.js";

console.log("app.js loaded", expenses);

document.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tool]");
    if (!btn) return;

    const tool = btn.getAttribute("data-tool");
    let result = "";

    try {
        if (tool === "calcTotal") result = calcTotal(expenses);
        else if (tool === "calcAverage") result = calcAverage(expenses);
        else if (tool === "findLargest") result = findLargest(expenses);
        else if (tool === "daySpentMost") result = daySpentMost(expenses);
        else if (tool === "totalsByCategory") result = totalsByCategory(expenses);
        else if (tool === "purchasesPerDay") result = purchasesPerDay(expenses);
        else result = "Unknown tool: " + tool;
    } catch (err) {
        result = "Error: " + (err && err.message ? err.message : String(err));
    }

    setCardOutput(tool, result);
});

function setCardOutput(toolId, text) {
    const element = document.getElementById(`out-${toolId}`);

    if (element) {
        element.textContent = text;
    }
}


/* 1) Total spending */
function calcTotal(expensesArr) {
    return "";
}

/* 2) Average purchase */
function calcAverage(expensesArr) {
    return "";
}

/* 3) Largest purchase (with details) */
function findLargest(expensesArr) {
    return "";
}

/* 4) Day you spent the most (by total dollars) */
function daySpentMost(expensesArr) {
    return "";
}

/* 5) Category breakdown (totals per category) */
function totalsByCategory(expensesArr) {
    return "";
}

/* 6) Purchases per day (counts per day) */
function purchasesPerDay(expensesArr) {
    let sun=0;
    let mon=0;
    let tues=0;
    let wed=0;
    let thurs=0;
    let fri=0;
    let sat=0;
    console.log(expensesArr);
    for(let expense of expensesArr){
        console.log(expense.day);
    switch (expense.day) {
    case "Sun":
        sun+=expense.amount;    
    case "Mon":
        mon+=expense.amount;
    case "Tue":
        tues+=expense.amount;
    case "Wed":
        wed+=expense.amount;
    case "Thu":
        thurs+=expense.amount;
    case "Fri":
        fri+=expense.amount;
    case "Sat":
        sat+=expense.amount;
    
    }   
    }
    return("Sunday: $"+Math.round(sun)+" Monday: $"+Math.round(mon)+" Tuesday: $"+Math.round(tues)+" Wensday: $"+Math.round(wed)+" Thursday: $"+Math.round(thurs)+" Friday: $"+Math.round(fri)+" Satarday: $"+Math.round(sat))
}