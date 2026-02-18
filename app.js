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
    let totals = {};
    for (let i =0; i < expensesArr.length; i++){
        let day = expensesArr[i].day;
        let amount = expensesArr[i].amount;

        if (totals[day]== undefined){
            totals[day] = amount;
        }else{
            totals[day] += amount
        }
    }
    let maxTotal = 0;
    let maxDay = "";
    for( let day in totals){
        if (totals[day] > maxTotal){
            maxTotal = totals[day];
            maxDay = day;
        }
    }
    
    return "The day the most was spent was " + maxDay;
}

/* 5) Category breakdown (totals per category) */
function totalsByCategory(expensesArr) {
    return "";
}

/* 6) Purchases per day (counts per day) */
function purchasesPerDay(expensesArr) {
    return "";
}