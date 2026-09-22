const SUPABASE_URL =
    "PASTE_YOUR_SUPABASE_URL_HERE";

const SUPABASE_KEY =
    "PASTE_YOUR_PUBLISHABLE_KEY_HERE";


const { createClient } =
    supabase;


const authClient =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


async function protectDashboard() {

    const {
        data: {
            session
        }
    } = await authClient.auth.getSession();


    if (!session) {

        window.location.href =
            "login.html";

        return;
    }

}


protectDashboard();


// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            const { error } =
                await authClient.auth.signOut();


            if (error) {

                alert(
                    "Logout failed: " +
                    error.message
                );

                return;
            }


            window.location.href =
                "login.html";

        }
    );

}
