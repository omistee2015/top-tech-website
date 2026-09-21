// ==========================================
// TOP TECH SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";

const SUPABASE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// HTML ELEMENTS
// ==========================================

const customerForm =
    document.getElementById("customerForm");

const expenseForm =
    document.getElementById("expenseForm");

const searchCustomer =
    document.getElementById("searchCustomer");


// ==========================================
// CUSTOMER FORM
// ==========================================

customerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const service =
        document.getElementById("service").value;

    const quantity =
        Number(document.getElementById("quantity").value);

    const unitPrice =
        Number(document.getElementById("unitPrice").value);

    const amountPaid =
        Number(document.getElementById("amountPaid").value);


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


    // CALCULATIONS

    const total =
        quantity * unitPrice;

    const balance =
        total - amountPaid;


    if (amountPaid > total) {
        alert("Amount paid cannot be greater than total.");
        return;
    }


    // SEND CUSTOMER TO SUPABASE

    const { error } = await db
        .from("customers")
        .insert([
            {
                name: name,
                phone: phone,
                service: service,
                quantity: quantity,
                unit_price: unitPrice,
                total: total,
                amount_paid: amountPaid,
                balance: balance
            }
        ]);


    if (error) {

        console.error(error);

        alert(
            "Customer could not be saved.\n\n" +
            error.message
        );

        return;
    }


    alert("Customer saved successfully!");

    customerForm.reset();

    loadCustomers();

    updateDashboard();

});


// ==========================================
// ADD EXPENSE
// ==========================================

expenseForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const description =
        document
            .getElementById("expenseDescription")
            .value
            .trim();

    const amount =
        Number(
            document.getElementById("expenseAmount").value
        );


    if (description === "") {
        alert("Enter expense description.");
        return;
    }

    if (amount <= 0) {
        alert("Enter a valid expense amount.");
        return;
    }


    const { error } = await db
        .from("expenses")
        .insert([
            {
                description: description,
                amount: amount
            }
        ]);


    if (error) {

        console.error(error);

        alert(
            "Expense could not be saved.\n\n" +
            error.message
        );

        return;
    }


    alert("Expense saved successfully!");

    expenseForm.reset();

    loadExpenses();

    updateDashboard();

});


// ==========================================
// LOAD CUSTOMERS
// ==========================================

async function loadCustomers() {

    const { data, error } = await db
        .from("customers")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(error);

        document.getElementById("customerRecords").innerHTML =
            "<p>Unable to load customers.</p>";

        return;
    }


    displayCustomers(data);
}


// ==========================================
// DISPLAY CUSTOMERS
// ==========================================

function displayCustomers(customers) {

    const container =
        document.getElementById("customerRecords");

    container.innerHTML = "";


    if (!customers || customers.length === 0) {

        container.innerHTML =
            "<p>No customer records found.</p>";

        return;
    }


    customers.forEach(function (customer) {

        const card =
            document.createElement("div");

        card.className =
            "customer-card";


        card.innerHTML = `

            <h3>${customer.name}</h3>

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
                <strong>Unit Price:</strong>
                ₦${Number(customer.unit_price).toLocaleString()}
            </p>

            <p>
                <strong>Total:</strong>
                ₦${Number(customer.total).toLocaleString()}
            </p>

            <p>
                <strong>Paid:</strong>
                ₦${Number(customer.amount_paid).toLocaleString()}
            </p>

            <p>
                <strong>Balance:</strong>
                ₦${Number(customer.balance).toLocaleString()}
            </p>

            <p>
                <strong>Date:</strong>
                ${new Date(customer.created_at).toLocaleDateString()}
            </p>

            <button
                class="delete-button"
                onclick="deleteCustomer(${customer.id})">
                Delete
            </button>

        `;

        container.appendChild(card);

    });

}


// ==========================================
// DELETE CUSTOMER
// ==========================================

async function deleteCustomer(id) {

    const confirmDelete =
        confirm("Delete this customer record?");

    if (!confirmDelete) {
        return;
    }


    const { error } = await db
        .from("customers")
        .delete()
        .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Customer could not be deleted.\n\n" +
            error.message
        );

        return;
    }


    alert("Customer deleted.");

    loadCustomers();

    updateDashboard();

}


// ==========================================
// LOAD EXPENSES
// ==========================================

async function loadExpenses() {

    const { data, error } = await db
        .from("expenses")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(error);

        document.getElementById("expenseRecords").innerHTML =
            "<p>Unable to load expenses.</p>";

        return;
    }


    displayExpenses(data);
}


// ==========================================
// DISPLAY EXPENSES
// ==========================================

function displayExpenses(expenses) {

    const container =
        document.getElementById("expenseRecords");

    container.innerHTML = "";


    if (!expenses || expenses.length === 0) {

        container.innerHTML =
            "<p>No expense records found.</p>";

        return;
    }


    expenses.forEach(function (expense) {

        const card =
            document.createElement("div");

        card.className =
            "expense-card";


        card.innerHTML = `

            <h3>${expense.description}</h3>

            <p>
                <strong>Amount:</strong>
                ₦${Number(expense.amount).toLocaleString()}
            </p>

            <p>
                <strong>Date:</strong>
                ${new Date(expense.created_at).toLocaleDateString()}
            </p>

            <button
                class="delete-button"
                onclick="deleteExpense(${expense.id})">
                Delete
            </button>

        `;

        container.appendChild(card);

    });

}


// ==========================================
// DELETE EXPENSE
// ==========================================

async function deleteExpense(id) {

    const confirmDelete =
        confirm("Delete this expense?");

    if (!confirmDelete) {
        return;
    }


    const { error } = await db
        .from("expenses")
        .delete()
        .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Expense could not be deleted.\n\n" +
            error.message
        );

        return;
    }


    alert("Expense deleted.");

    loadExpenses();

    updateDashboard();

}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

async function updateDashboard() {

    const { data: customers, error: customerError } =
        await db
            .from("customers")
            .select("total, amount_paid, balance");


    if (customerError) {

        console.error(customerError);

        return;
    }


    const { data: expenses, error: expenseError } =
        await db
            .from("expenses")
            .select("amount");


    if (expenseError) {

        console.error(expenseError);

        return;
    }


    // TOTAL CUSTOMERS

    const totalCustomers =
        customers.length;


    // TOTAL REVENUE

    const revenue =
        customers.reduce(function (sum, customer) {

            return sum +
                Number(customer.total);

        }, 0);


    // TOTAL EXPENSES

    const totalExpenses =
        expenses.reduce(function (sum, expense) {

            return sum +
                Number(expense.amount);

        }, 0);


    // PROFIT

    const profit =
        revenue - totalExpenses;


    // OUTSTANDING BALANCE

    const balance =
        customers.reduce(function (sum, customer) {

            return sum +
                Number(customer.balance);

        }, 0);


    document.getElementById(
        "totalCustomers"
    ).textContent =
        totalCustomers;


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


// ==========================================
// CUSTOMER SEARCH
// ==========================================

searchCustomer.addEventListener(
    "input",
    async function () {

        const searchTerm =
            searchCustomer.value.trim();


        const { data, error } =
            await db
                .from("customers")
                .select("*")
                .ilike(
                    "name",
                    "%" + searchTerm + "%"
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {

            console.error(error);

            return;
        }


        displayCustomers(data);

    }
);


// ==========================================
// START APPLICATION
// ==========================================

loadCustomers();

loadExpenses();

updateDashboard();
