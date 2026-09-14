// ================================
// TOP TECH JAVASCRIPT
// ================================


// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


// CLOSE MOBILE MENU AFTER CLICKING A LINK

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// QUOTE FORM

const quoteForm = document.getElementById("quoteForm");

quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const service =
        document.getElementById("serviceRequired").value;

    const message =
        document.getElementById("customerMessage").value.trim();


    // VALIDATION

    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    if (phone === "") {

        alert("Please enter your phone number.");

        return;

    }


    if (service === "") {

        alert("Please select a service.");

        return;

    }


    if (message === "") {

        alert("Please tell us what you need.");

        return;

    }


    // CREATE WHATSAPP MESSAGE

    const whatsappMessage =
        "Hello Top Tech,%0A%0A" +

        "I would like to request a quote.%0A%0A" +

        "Name: " + encodeURIComponent(name) +

        "%0APhone: " + encodeURIComponent(phone) +

        "%0AService: " + encodeURIComponent(service) +

        "%0ADetails: " + encodeURIComponent(message);


    // TOP TECH WHATSAPP NUMBER

    const whatsappNumber = "2348052778828";


    // OPEN WHATSAPP

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        whatsappMessage;


    window.open(whatsappURL, "_blank");


    // CLEAR FORM

    quoteForm.reset();

});


// CURRENT YEAR

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// SCROLL REVEAL

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {

            element.classList.add("show");

        }

    });

}


window.addEventListener("scroll", revealOnScroll);


// RUN ON PAGE LOAD

revealOnScroll();
