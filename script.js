// Inputs
const rent = document.getElementById("rent");
const people = document.getElementById("people");
const token = document.getElementById("token");

// Buttons
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");

// Result Elements
const onlineResult = document.getElementById("onlineResult");
const cashResult = document.getElementById("cashResult");
const brokerageResult = document.getElementById("brokerageResult");

// Error Elements
const rentError = document.getElementById("rentError");
const peopleError = document.getElementById("peopleError");
const tokenError = document.getElementById("tokenError");

// Results Container
const results = document.querySelector(".results");

// Number Animation
function animateValue(element, end) {

    let start = 0;

    const step = Math.ceil(end / 40);

    function update() {

        start += step;

        if (start >= end) {
            start = end;
        }

        element.innerText = "₹" + start.toLocaleString();

        if (start < end) {
            requestAnimationFrame(update);
        }

    }

    update();

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

// Calculate Button
calculateBtn.addEventListener("click", function () {

    if (!validate()) return;

    const r = Number(rent.value);
    const p = Number(people.value);
    const t = Number(token.value);

    // Hidden Calculations
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

    // Show Results
    results.style.display = "block";

    animateValue(onlineResult, online);
    animateValue(cashResult, cash);
    animateValue(brokerageResult, brokerage);

});

// Reset Button
resetBtn.addEventListener("click", function () {

    rent.value = "";
    people.value = "";
    token.value = "";

    rentError.innerText = "";
    peopleError.innerText = "";
    tokenError.innerText = "";

    onlineResult.innerText = "₹0";
    cashResult.innerText = "₹0";
    brokerageResult.innerText = "₹0";

    results.style.display = "none";

});

// Copy Button
copyBtn.addEventListener("click", function () {

    const text = `Rent Calculator

Online : ${onlineResult.innerText}
Cash : ${cashResult.innerText}
Brokerage : ${brokerageResult.innerText}`;

    navigator.clipboard.writeText(text);

    copyBtn.innerText = "✅ Copied";

    setTimeout(function () {

        copyBtn.innerText = "📋 Copy Result";

    }, 2000);

});