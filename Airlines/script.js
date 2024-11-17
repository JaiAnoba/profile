// HOMEPAGE TO WRAP NAVIGATION
window.onload = function () {
    var homeButton = document.querySelector(".home-button");
    var wrapSection = document.querySelector(".wrap");

    wrapSection.style.display = "none";

    // When the .home-button is clicked
    homeButton.onclick = function () {
        wrapSection.style.display = "block";
        wrapSection.scrollIntoView({ behavior: "smooth" });
    };
};


// BUTTONS NAVIGATION

// Function to show and hide forms
function showForm(formId) {
    const forms = document.querySelectorAll(".container > div");
    for (let i = 0; i < forms.length; i++) {
        if (forms[i].id === formId) {
            forms[i].style.display = "block";
        } else {
            forms[i].style.display = "none";
        }
    }
}

// Function to validate the forms
function validateForm(formId) {
    switch (formId) {
        case "book-flight":
            return validateBookFlight();
        case "search-flight":
            return validateBookFlight();
        case "passenger-details":
            return validateSearchFlight();
        case "one-way-summary":
            return validatePassengerDetails(); 
        default:
            return false;
    }
}

// Sidebar navigation
const navItems = document.querySelectorAll(".nav-item");
for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", function () {
        const formIds = ["book-flight", "search-flight", "passenger-details", "one-way-summary"];
        const formId = formIds[i];

        // Validate sa form before ipakita
        if (validateForm(formId)) {
            showForm(formId);
        }
        
        updateSidebarHighlight();
    });
}

updateSidebarHighlight();

// Book Flight Form Validation
function validateBookFlight() {
    const flyingFrom = document.querySelector(".des-from select").value;
    const flyingTo = document.querySelector(".des-to select").value;
    const departureDate = document.querySelector(".depart input").value;
    const returnDate = document.querySelector(".return input").value;
    const tripTypes = document.getElementsByName("trip");
    const seatClasses = document.getElementsByName("class");
    const passengerCount = document.querySelector(".form-group1 input").value;

    let tripTypeSelected = false;
    let seatClassSelected = false;

    // Check if a trip type is selected
    for (let i = 0; i < tripTypes.length; i++) {
        if (tripTypes[i].checked) {
            tripTypeSelected = true;
            break;
        }
    }

    // Check if a seat class is selected
    for (let i = 0; i < seatClasses.length; i++) {
        if (seatClasses[i].checked) {
            seatClassSelected = true;
            break;
        }
    }

    if (flyingFrom === "" || flyingTo === "" || departureDate === "" || returnDate === "" || !tripTypeSelected || !seatClassSelected || passengerCount <= 0) {
        alert("Please fill in all fields in the Book Flight form.");
        return false;
    }

    return true;
}

// Search Flight Validation
function validateSearchFlight() {
    const flightCards = document.querySelectorAll(".ow-flight-card");
    let flightSelected = false;

    for (let i = 0; i < flightCards.length; i++) {
        if (flightCards[i].classList.contains("selected")) {
            flightSelected = true;
            break;
        }
    }

    if (!flightSelected) {
        alert("Please select a flight before continuing.");
        return false;
    }
    return true;
}

// Passenger Details Validation
function validatePassengerDetails() {
    const fullname = document.getElementById("fullname").value;
    const address = document.getElementById("address").value;
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value;
    const genders = document.getElementsByName("sex");

    let genderSelected = false;

    // Check if a gender is selected
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            genderSelected = true;
            break;
        }
    }

    if (fullname === "" || address === "" || dob === "" || phone === "" || !genderSelected) {
        alert("Please fill in all passenger details and select a gender.");
        return false;
    }
    return true;
}

// Book Flight Confirmation
const bookButton = document.querySelector(".book-button");
bookButton.addEventListener("click", function () {
    alert("Your flight has been successfully booked!");
});


// BUTTON VALIDATIONS (for individual buttons)

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Validate Book Flight Form before proceeding to the search flight
    if (validateBookFlight()) {
        showForm("search-flight");
    }  
});

const continueButton = document.querySelector(".continue-btn");
continueButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Validate Search Flight Form before proceeding to passenger details
    if (validateSearchFlight()) {
        showForm("passenger-details");
    }  
});

const viewButton = document.querySelector(".view-button");
viewButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Validate Passenger Details Form before proceeding to summary
    if (validatePassengerDetails()) {
        showForm("one-way-summary");
    }
});



// SIDEBAR HIGHLIGHTING

// Sidebar highlighting based on active form
function updateSidebarHighlight() {
    const navItems = document.querySelectorAll(".nav-item");
    const forms = ["book-flight", "search-flight", "passenger-details", "one-way-summary"];

    let activeFormFound = false;
    
    for (let i = 0; i < navItems.length; i++) {
        const form = document.getElementById(forms[i]);

        // Check if the form is currently displayed
        if (form && form.style.display === "block") {
            navItems[i].classList.add("active");
            activeFormFound = true;
        } else {
            navItems[i].classList.remove("active");
        }
    }

    if (!activeFormFound) {
        navItems[0].classList.add("active");
    }
}
