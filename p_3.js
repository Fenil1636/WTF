/*
    Secure Bank Ltd.
    Banking Utilities Application

    This program demonstrates:
    1. Variables: var, let, const
    2. Operators
    3. Conditional statements
    4. Loops
    5. Functions
    6. User input and dynamic output
*/


// --------------------------------------------------
// VARIABLE DECLARATION AND SCOPE
// --------------------------------------------------

// var - function scoped
var bankName = "Secure Bank Ltd.";

// let - block scoped
let totalCustomers = 1000;

// const - cannot be reassigned
const GST_RATE = 0.18;


// Function to demonstrate variable scope
function demonstrateScope() {

    var functionVariable = "I am declared using var";

    if (true) {

        let blockVariable = "I am declared using let";

        console.log(blockVariable);
    }

    console.log(functionVariable);

    // blockVariable cannot be accessed here
}


// --------------------------------------------------
// LOAN ELIGIBILITY
// --------------------------------------------------

function checkLoanEligibility() {

    let name = document.getElementById("customerName").value;

    let income = Number(
        document.getElementById("income").value
    );

    let loanAmount = Number(
        document.getElementById("loanAmount").value
    );


    // Validation
    if (name === "" || income <= 0 || loanAmount <= 0) {

        displayResult(
            "Please enter valid customer and financial information."
        );

        return;
    }


    // Loan eligibility using relational and logical operators

    let eligible = false;

    if (income >= 25000 && loanAmount <= income * 20) {

        eligible = true;

    } else {

        eligible = false;
    }


    // Nested if statement
    if (eligible) {

        if (income >= 50000) {

            displayResult(
                "<h4>Loan Status: Eligible</h4>" +
                "Customer: " + name +
                "<br>Eligible for higher loan category."
            );

        } else {

            displayResult(
                "<h4>Loan Status: Eligible</h4>" +
                "Customer: " + name +
                "<br>Eligible for standard loan category."
            );
        }

    } else {

        displayResult(
            "<h4>Loan Status: Not Eligible</h4>" +
            "Customer: " + name +
            "<br>Please increase your income or reduce the loan amount."
        );
    }
}


// --------------------------------------------------
// EMI CALCULATION FUNCTION
// --------------------------------------------------

function calculateEMI() {

    let principal = Number(
        document.getElementById("loanAmount").value
    );

    let annualRate = Number(
        document.getElementById("interestRate").value
    );

    let years = Number(
        document.getElementById("loanYears").value
    );


    if (principal <= 0 || annualRate <= 0 || years <= 0) {

        displayResult(
            "Please enter valid loan details."
        );

        return;
    }


    // Monthly interest rate
    const monthlyRate = annualRate / 12 / 100;

    // Total number of monthly installments
    const months = years * 12;


    // EMI Formula
    const emi =
        (principal * monthlyRate *
        Math.pow(1 + monthlyRate, months))
        /
        (Math.pow(1 + monthlyRate, months) - 1);


    // Assignment operator
    let totalPayment = emi * months;

    let totalInterest = totalPayment - principal;


    displayResult(
        "<h4>EMI Calculation</h4>" +
        "Loan Amount: ₹" + principal.toFixed(2) +
        "<br>Monthly EMI: ₹" + emi.toFixed(2) +
        "<br>Total Payment: ₹" +
        totalPayment.toFixed(2) +
        "<br>Total Interest: ₹" +
        totalInterest.toFixed(2)
    );
}


// --------------------------------------------------
// SIMPLE INTEREST CALCULATION
// --------------------------------------------------

function calculateSimpleInterest() {

    let principal = Number(
        document.getElementById("loanAmount").value
    );

    let rate = Number(
        document.getElementById("interestRate").value
    );

    let years = Number(
        document.getElementById("loanYears").value
    );


    if (principal <= 0 || rate <= 0 || years <= 0) {

        displayResult(
            "Please enter valid values."
        );

        return;
    }


    // Function call
    let interest =
        calculateInterest(principal, rate, years);


    displayResult(
        "<h4>Simple Interest Calculation</h4>" +
        "Principal Amount: ₹" + principal +
        "<br>Interest: ₹" +
        interest.toFixed(2) +
        "<br>Total Amount: ₹" +
        (principal + interest).toFixed(2)
    );
}


// --------------------------------------------------
// USER-DEFINED FUNCTION WITH PARAMETERS
// AND RETURN VALUE
// --------------------------------------------------

function calculateInterest(principal, rate, years) {

    let interest =
        (principal * rate * years) / 100;

    return interest;
}


// --------------------------------------------------
// SWITCH STATEMENT
// --------------------------------------------------

function displayAccountInfo() {

    let accountType =
        document.getElementById("accountType").value;

    let message = "";


    switch (accountType) {

        case "savings":

            message =
                "Savings Account selected.<br>" +
                "Suitable for personal savings.";

            break;


        case "current":

            message =
                "Current Account selected.<br>" +
                "Suitable for businesses and frequent transactions.";

            break;


        case "fixed":

            message =
                "Fixed Deposit selected.<br>" +
                "Provides higher interest for fixed tenure.";

            break;


        default:

            message =
                "Please select a valid account type.";
    }


    displayResult(message);
}


// --------------------------------------------------
// FOR LOOP
// GENERATING INTEREST TABLE
// --------------------------------------------------

function generateInterestTable() {

    let amount = Number(
        document.getElementById("depositAmount").value
    );


    if (amount <= 0) {

        displayResult(
            "Please enter a valid deposit amount."
        );

        return;
    }


    let output =
        "<h4>Interest Table (5% Annual Interest)</h4>";

    output += "<table border='1'>";

    output +=
        "<tr>" +
        "<th>Year</th>" +
        "<th>Interest</th>" +
        "<th>Total Amount</th>" +
        "</tr>";


    // for loop
    for (let year = 1; year <= 5; year++) {

        let interest =
            calculateInterest(amount, 5, year);

        let total = amount + interest;


        output +=
            "<tr>" +
            "<td>" + year + "</td>" +
            "<td>₹" + interest.toFixed(2) + "</td>" +
            "<td>₹" + total.toFixed(2) + "</td>" +
            "</tr>";
    }


    output += "</table>";

    displayResult(output);
}


// --------------------------------------------------
// WHILE LOOP
// --------------------------------------------------

function demonstrateWhileLoop() {

    let balance = 1000;

    let year = 1;


    while (year <= 3) {

        balance = balance + 500;

        console.log(
            "Year " + year +
            " Balance: ₹" + balance
        );

        year++;
    }
}


// --------------------------------------------------
// DO-WHILE LOOP
// --------------------------------------------------

function demonstrateDoWhileLoop() {

    let transaction = 1;

    do {

        console.log(
            "Processing transaction " + transaction
        );

        transaction++;

    } while (transaction <= 3);
}


// --------------------------------------------------
// DISPLAY RESULT
// --------------------------------------------------

function displayResult(message) {

    document.getElementById("output").innerHTML =
        message;
}


// --------------------------------------------------
// CONDITIONAL OPERATOR (TERNARY OPERATOR)
// --------------------------------------------------

function checkBalance(balance) {

    let message =
        balance >= 1000
        ? "Sufficient Balance"
        : "Low Balance";

    return message;
}


// --------------------------------------------------
// CALL DEMONSTRATION FUNCTIONS
// --------------------------------------------------

demonstrateScope();

demonstrateWhileLoop();

demonstrateDoWhileLoop();