// Inputs
const rent = document.getElementById("rent");
const people = document.getElementById("people");
const token = document.getElementById("token");

// Buttons
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");

// Results
const onlineResult = document.getElementById("onlineResult");
const cashResult = document.getElementById("cashResult");
const brokerageResult = document.getElementById("brokerageResult");

// Errors
const rentError = document.getElementById("rentError");
const peopleError = document.getElementById("peopleError");
const tokenError = document.getElementById("tokenError");

// Count Animation
function animateValue(element, start, end, duration = 700) {

    let startTime = null;

    function animation(currentTime) {

        if (!startTime) startTime = currentTime;

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = Math.floor(progress * (end - start) + start);

        element.innerText = "₹" + value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(animation);
        }

    }

    requestAnimationFrame(animation);

}

// Validation
function validate() {

    let valid = true;

    rentError.innerText = "";
    peopleError.innerText = "";
    tokenError.innerText = "";

    if (rent.value === "") {
        rentError.innerText = "Please enter Rent";
        valid = false;
    }

    if (people.value === "") {
        peopleError.innerText = "Please select How Many People Stay";
        valid = false;
    }

    if (token.value === "") {
        tokenError.innerText = "Please enter Token";
        valid = false;
    }

    return valid;

}

// Main Calculator
function calculateRent() {

    if (!validate()) return;

    const r = Number(rent.value);
    const p = Number(people.value);
    const t = Number(token.value);

    // Hidden Values
    const security = r;
    const documentation = (p * 500) + 500;

    let online = 0;
    let cash = 0;
    let brokerage = r / 2;

    if (r <= 19000) {

        online = r + documentation + (security - t);

        cash = 0;

    } else {

        online = 20000 + (security - t);

        cash = (r - 20000) + documentation;

    }

    animateValue(onlineResult, 0, online);

    animateValue(cashResult, 0, cash);

    animateValue(brokerageResult, 0, brokerage);

}

// Calculate Button
calculateBtn.addEventListener("click", calculateRent);

// Auto Calculate
[rent, people, token].forEach(input => {

    input.addEventListener("input", () => {

        if (
            rent.value !== "" &&
            people.value !== "" &&
            token.value !== ""
        ) {

            calculateRent();

        }

    });

});

// Reset
resetBtn.addEventListener("click", () => {

    rent.value = "";
    people.value = "";
    token.value = "";

    rentError.innerText = "";
    peopleError.innerText = "";
    tokenError.innerText = "";

    onlineResult.innerText = "₹0";
    cashResult.innerText = "₹0";
    brokerageResult.innerText = "₹0";

});

// Copy Result
copyBtn.addEventListener("click", () => {

    const text =
`Rent Calculator

Online : ${onlineResult.innerText}
Cash : ${cashResult.innerText}
Brokerage : ${brokerageResult.innerText}`;

    navigator.clipboard.writeText(text);

    copyBtn.innerText = "✅ Copied";

    setTimeout(() => {

        copyBtn.innerText = "📋 Copy Result";

    }, 2000);

});

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML = "☀️ Light Mode";

    } else {

        themeBtn.innerHTML = "🌙 Dark Mode";

    }

});
