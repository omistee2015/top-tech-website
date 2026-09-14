// ========================================
// TOP TECH BUSINESS MANAGEMENT SYSTEM
// ========================================


// GET SAVED DATA

let customers =
    JSON.parse(
        localStorage.getItem("topTechCustomers")
    ) || [];


let expenses =
    JSON.parse(
        localStorage.getItem("topTechExpenses")
    ) || [];


// CUSTOMER FORM

const customerForm =
    document.getElementById("customerForm");


customerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // GET INPUTS

        const name =
            document.getElementById("customerName")
                .value.trim();


        const phone =
            document.getElementById("customerPhone")
                .value.trim();


        const service =
            document.getElementById("service")
                .value;


        const quantity =
            Number(
                document.getElementById("quantity")
                    .value
            );


        const unitPrice =
            Number(
                document.getElementById("unitPrice")
                    .value
            );


        const amountPaid =
            Number(
                document.getElementById("amountPaid")
                    .value
            );


        // VALIDATION

        if (name === "") {

            alert("Enter customer name.");

            return;

        }


        if (phone === "") {

            alert("Enter phone number.");

            return;

        }


        if (service === "") {

            alert("Select a service.");

            return;

        }


        if (quantity <= 0) {

            alert("Quantity must be greater than 0.");

            return;

        }


        if (unitPrice < 0) {

            alert("Price cannot be negative.");

            return;

        }


        if (amountPaid < 0) {

            alert("Payment cannot be negative.");

            return;

        }


        // CALCULATE TOTAL

        const total =
            quantity * unitPrice;


        // CALCULATE BALANCE

        const balance =
            total - amountPaid;


        if (amountPaid > total) {

            alert(
                "Amount paid cannot be greater than total."
            );

            return;

        }


        // CREATE CUSTOMER

        const customer = {

            id: Date.now(),

            name: name,

            phone: phone,

            service: service,

            quantity: quantity,

            unitPrice: unitPrice,

            total: total,

            amountPaid: amountPaid,

            balance: balance,

            date:
                new Date()
                    .toLocaleDateString()

        };


        // SAVE CUSTOMER

        customers.push(customer);


        saveData();


        // CLEAR FORM

        customerForm.reset();


        // REFRESH

        displayCustomers();

        updateDashboard();

    }
);


// EXPENSE FORM

const expenseForm =
    document.getElementById("expenseForm");


expenseForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const description =
            document.getElementById(
                "expenseDescription"
            ).value.trim();


        const amount =
            Number(
                document.getElementById(
                    "expenseAmount"
                ).value
            );


        if (description === "") {

            alert("Enter expense description.");

            return;

        }


        if (amount <= 0) {

            alert("Enter a valid expense amount.");

            return;

        }


        const expense = {

            id: Date.now(),

            description: description,

            amount: amount,

            date:
                new Date()
                    .toLocaleDateString()

        };


        expenses.push(expense);


        saveData();


        expenseForm.reset();


        displayExpenses();

        updateDashboard();

    }
);


// SAVE DATA

function saveData() {

    localStorage.setItem(

        "topTechCustomers",

        JSON.stringify(customers)

    );


    localStorage.setItem(

        "topTechExpenses",

        JSON.stringify(expenses)

    );

}


// DISPLAY CUSTOMERS

function displayCustomers(
    searchTerm = ""
) {

    const container =
        document.getElementById(
            "customerRecords"
        );


    container.innerHTML = "";


    const filteredCustomers =
        customers.filter(function (customer) {

            return customer.name
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                );

        });


    if (filteredCustomers.length === 0) {

        container.innerHTML =
            "<p>No customer records found.</p>";

        return;

    }


    filteredCustomers.forEach(
        function (customer) {

            const card =
                document.createElement("div");


            card.className =
                "customer-card";


            card.innerHTML = `

                <h3>
                    ${customer.name}
                </h3>

                <p>
                    <strong>Phone:</strong>
                    ${customer.phone}
                </p>

                <p>
                    <strong>Service:</strong>
                    ${customer.service}
                </p>

                <p>
                    <strong>Quantity:</strong>
                    ${customer.quantity}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₦${customer.total.toLocaleString()}
                </p>

                <p>
                    <strong>Paid:</strong>
                    ₦${customer.amountPaid.toLocaleString()}
                </p>

                <p>
                    <strong>Balance:</strong>
                    ₦${customer.balance.toLocaleString()}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${customer.date}
                </p>

                <button
                    class="delete-button"
                    onclick="deleteCustomer(${customer.id})">

                    Delete

                </button>

            `;


            container.appendChild(card);

        }
    );

}


// DELETE CUSTOMER

function deleteCustomer(id) {

    const confirmDelete =
        confirm(
            "Delete this customer record?"
        );


    if (!confirmDelete) {

        return;

    }


    customers =
        customers.filter(
            function (customer) {

                return customer.id !== id;

            }
        );


    saveData();

    displayCustomers();

    updateDashboard();

}


// DISPLAY EXPENSES

function displayExpenses() {

    const container =
        document.getElementById(
            "expenseRecords"
        );


    container.innerHTML = "";


    if (expenses.length === 0) {

        container.innerHTML =
            "<p>No expense records found.</p>";

        return;

    }


    expenses.forEach(
        function (expense) {

            const card =
                document.createElement("div");


            card.className =
                "expense-card";


            card.innerHTML = `

                <h3>
                    ${expense.description}
                </h3>

                <p>
                    <strong>Amount:</strong>
                    ₦${expense.amount.toLocaleString()}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${expense.date}
                </p>

                <button
                    class="delete-button"
                    onclick="deleteExpense(${expense.id})">

                    Delete

                </button>

            `;


            container.appendChild(card);

        }
    );

}


// DELETE EXPENSE

function deleteExpense(id) {

    const confirmDelete =
        confirm(
            "Delete this expense?"
        );


    if (!confirmDelete) {

        return;

    }


    expenses =
        expenses.filter(
            function (expense) {

                return expense.id !== id;

            }
        );


    saveData();

    displayExpenses();

    updateDashboard();

}


// UPDATE DASHBOARD

function updateDashboard() {


    // CUSTOMER COUNT

    document.getElementById(
        "totalCustomers"
    ).textContent =
        customers.length;


    // TOTAL REVENUE

    const revenue =
        customers.reduce(
            function (total, customer) {

                return total + customer.total;

            },
            0
        );


    // TOTAL EXPENSES

    const totalExpenses =
        expenses.reduce(
            function (total, expense) {

                return total + expense.amount;

            },
            0
        );


    // PROFIT

    const profit =
        revenue - totalExpenses;


    // OUTSTANDING BALANCE

    const balance =
        customers.reduce(
            function (total, customer) {

                return total + customer.balance;

            },
            0
        );


    // DISPLAY

    document.getElementById(
        "totalRevenue"
    ).textContent =
        "₦" + revenue.toLocaleString();


    document.getElementById(
        "totalExpenses"
    ).textContent =
        "₦" + totalExpenses.toLocaleString();


    document.getElementById(
        "totalProfit"
    ).textContent =
        "₦" + profit.toLocaleString();


    document.getElementById(
        "totalBalance"
    ).textContent =
        "₦" + balance.toLocaleString();

}


// SEARCH

const searchCustomer =
    document.getElementById(
        "searchCustomer"
    );


searchCustomer.addEventListener(
    "input",
    function () {

        displayCustomers(
            searchCustomer.value
        );

    }
);


// START APPLICATION

displayCustomers();

displayExpenses();

updateDashboard();
