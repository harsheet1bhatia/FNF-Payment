/* ==========================================
   Rent Calculator - JavaScript Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const rentInput = document.getElementById('rent');
  const peopleSelect = document.getElementById('people');
  const tokenInput = document.getElementById('token');

  const rentError = document.getElementById('rentError');
  const peopleError = document.getElementById('peopleError');
  const tokenError = document.getElementById('tokenError');

  const onlineOutput = document.getElementById('onlineResult');
  const cashOutput = document.getElementById('cashResult');
  const brokerageOutput = document.getElementById('brokerageResult');

  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const copyBtn = document.getElementById('copyBtn');
  const themeToggleBtn = document.getElementById('themeToggle');

  // Animated Count-Up Function
  function animateValue(element, start, end, duration = 400) {
    if (isNaN(end)) {
      element.textContent = '₹0';
      return;
    }
    const range = end - start;
    let current = start;
    const increment = end > start ? Math.ceil(range / (duration / 16)) : Math.floor(range / (duration / 16));
    const stepTime = 16;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = '₹' + current.toLocaleString('en-IN');
    }, stepTime);
  }

  // Current calculated numerical values for copying
  let currentResults = {
    online: 0,
    cash: 0,
    brokerage: 0
  };

  // Validation Logic
  function validateInputs() {
    let isValid = true;

    // Rent Validation
    if (!rentInput.value.trim() || parseFloat(rentInput.value) < 0) {
      rentError.style.display = 'block';
      rentError.textContent = 'Please enter Rent';
      isValid = false;
    } else {
      rentError.style.display = 'none';
    }

    // People Validation
    if (!peopleSelect.value) {
      peopleError.style.display = 'block';
      peopleError.textContent = 'Please select How Many People Stay';
      isValid = false;
    } else {
      peopleError.style.display = 'none';
    }

    // Token Validation
    if (!tokenInput.value.trim() || parseFloat(tokenInput.value) < 0) {
      tokenError.style.display = 'block';
      tokenError.textContent = 'Please enter Token';
      isValid = false;
    } else {
      tokenError.style.display = 'none';
    }

    return isValid;
  }

  // Calculate Logic
  function calculateRent() {
    if (!validateInputs()) {
      return;
    }

    const rent = parseFloat(rentInput.value) || 0;
    const people = parseInt(peopleSelect.value) || 0;
    const token = parseFloat(tokenInput.value) || 0;

    // Hidden Backend Calculations
    const security = rent;
    const documentation = (people * 500) + 500;

    let online = 0;
    let cash = 0;

    // Formula Implementation
    if (rent <= 19000) {
      online = rent + documentation + (security - token);
      cash = 0;
    } else {
      online = 20000 + (security - token);
      cash = (rent - 20000) + documentation;
    }

    const brokerage = rent / 2;

    // Animate Output Numbers
    animateValue(onlineOutput, currentResults.online, online);
    animateValue(cashOutput, currentResults.cash, cash);
    animateValue(brokerageOutput, currentResults.brokerage, brokerage);

    // Save state
    currentResults.online = online;
    currentResults.cash = cash;
    currentResults.brokerage = brokerage;
  }

  // Auto-Calculate on Input Change
  [rentInput, peopleSelect, tokenInput].forEach(input => {
    input.addEventListener('input', () => {
      if (rentInput.value && peopleSelect.value && tokenInput.value) {
        calculateRent();
      }
    });
  });

  // Calculate Button Click
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateRent);
  }

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      rentInput.value = '';
      peopleSelect.value = '';
      tokenInput.value = '';

      rentError.style.display = 'none';
      peopleError.style.display = 'none';
      tokenError.style.display = 'none';

      animateValue(onlineOutput, currentResults.online, 0);
      animateValue(cashOutput, currentResults.cash, 0);
      animateValue(brokerageOutput, currentResults.brokerage, 0);

      currentResults = { online: 0, cash: 0, brokerage: 0 };
    });
  }

  // Copy Result Button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const summaryText = `--- Rent Breakdown ---\nOnline: ₹${currentResults.online.toLocaleString('en-IN')}\nCash: ₹${currentResults.cash.toLocaleString('en-IN')}\nBrokerage: ₹${currentResults.brokerage.toLocaleString('en-IN')}`;

      navigator.clipboard.writeText(summaryText).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }

  // Dark Mode Toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', targetTheme);
      themeToggleBtn.textContent = targetTheme === 'dark' ? '☀️' : '🌙';
    });
  }
});
