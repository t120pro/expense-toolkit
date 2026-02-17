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
    let total = 0;

    for (let i = 0; i < expensesArr.length; i++) {
        const ex = expensesArr[i];
        if (ex && typeof ex.amount === "number" && ex.amount >= 0) {
            total += ex.amount;
        }
    }

    return "Total spending: $" + total.toFixed(2);
}

/* 2) Average purchase */
function calcAverage(expensesArr) {
    let total = 0;
    let count = 0;

    for (let i = 0; i < expensesArr.length; i++) {
        const ex = expensesArr[i];
        if (ex && typeof ex.amount === "number" && ex.amount >= 0) {
            total += ex.amount;
            count++;
        }
    }

    if (count === 0) return "No valid expenses.";
    return "Average purchase: $" + (total / count).toFixed(2);
}

/* 3) Largest purchase (with details) */
function findLargest(expensesArr) {
    let largest = null;

    for (let i = 0; i < expensesArr.length; i++) {
        const ex = expensesArr[i];
        if (ex && typeof ex.amount === "number" && ex.amount >= 0) {
            if (largest === null || ex.amount > largest.amount) largest = ex;
        }
    }

    if (!largest) return "No valid expenses.";

    const cat = largest.category ? largest.category : "unknown";
    const day = largest.day ? largest.day : "unknown day";
    const note = largest.note ? " - " + largest.note : "";

    return "Largest purchase: $" + largest.amount.toFixed(2) + " (" + cat + ", " + day + ")" + note;
}

/* 4) Day you spent the most (by total dollars) */
function daySpentMost(expensesArr) {
    const totals = {}; // day -> total

    for (let i = 0; i < expensesArr.length; i++) {
        const ex = expensesArr[i];
        if (ex && typeof ex.amount === "number" && ex.amount >= 0 && ex.day) {
            const day = ex.day;

            if (totals[day] === undefined) totals[day] = 0;
            totals[day] += ex.amount;
        }
    }

    let bestDay = null;
    let bestTotal = -1;

    for (const day in totals) {
        if (totals[day] > bestTotal) {
            bestTotal = totals[day];
            bestDay = day;
        }
    }

    if (bestDay === null) return "No valid days found.";
    return "You spent the most on " + bestDay + ": $" + bestTotal.toFixed(2);
}

/* 5) Category breakdown (totals per category) */
function totalsByCategory(expensesArr) {
    const totals = {}; // category -> total

    for (let i = 0; i < expensesArr.length; i++) {
        const ex = expensesArr[i];
        if (ex && typeof ex.amount === "number" && ex.amount >= 0 && ex.category) {
            const cat = ex.category;

            if (totals[cat] === undefined) totals[cat] = 0;
            totals[cat] += ex.amount;
        }
    }

    let result = "Totals by category:\n";
    let found = false;

    for (const cat in totals) {
        found = true;
        result += cat + ": $" + totals[cat].toFixed(2) + "\n";
    }

    if (!found) return "No valid categories found.";
    return result.trim();
}

/* 6) Purchases per day (counts per day) */
function purchasesPerDay(expensesArr) {
    const counts = {}; // day -> count

    for (let i = 0; i < expensesArr.length; i++) {
        const ex = expensesArr[i];
        if (ex && typeof ex.amount === "number" && ex.amount >= 0 && ex.day) {
            const day = ex.day;

            if (counts[day] === undefined) counts[day] = 0;
            counts[day] += 1;
        }
    }

    let result = "Purchases per day:\n";
    let found = false;

    for (const day in counts) {
        found = true;
        result += day + ": " + counts[day] + "\n";
    }

    if (!found) return "No valid days found.";
    return result.trim();
}