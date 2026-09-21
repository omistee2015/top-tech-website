// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL =
    "https://schtbejtrgxqpcddjdnv.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_GK3cX-URv0_MxlLK-Zd4ng_urUacyg7";


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
