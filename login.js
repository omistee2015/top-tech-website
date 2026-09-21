// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL =
    "PASTE_YOUR_SUPABASE_URL_HERE";

const SUPABASE_KEY =
    "PASTE_YOUR_PUBLISHABLE_KEY_HERE";


const { createClient } =
    supabase;


const db =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// LOGIN FORM
// ==========================================

const loginForm =
    document.getElementById("loginForm");

const message =
    document.getElementById("message");


loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        message.textContent =
            "Logging in...";


        const { data, error } =
            await db.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            console.error(error);

            message.textContent =
                "Login failed: " +
                error.message;

            return;
        }


        if (data.session) {

            window.location.href =
                "dashboard.html";

        }

    }
);
