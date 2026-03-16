/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

function maskMobileNumber(mobileNumber) {
if (!mobileNumber) {
return '';
}
const value = mobileNumber.toString();
// Mask first 5 digits and keep the rest
return ` ${'*'.repeat(5)}${value.substring(5)}`;
}

/**
 * Formats a numeric value as Indian Rupee (INR) currency string.
 * @name formatINRCurrency Format Currency
 * @param {number|string} value - numeric value to format as currency
 * @returns {string} Formatted currency string in INR format
 */
function formatINRCurrency(value) {
  return Number(value).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}

function startOtpTimer(duration) {
  setTimeout(() => {
    let timeLeft = duration;
    const timerDisplay = document.getElementById("otp-timer");
    const resendBtn = document.getElementById("resend-btn");

    if (!timerDisplay || !resendBtn) return;
    resendBtn.disabled = true;

    const timer = setInterval(() => {
      timerDisplay.textContent = "Resent OTP in {timeLeft} sec";
      if (timeLeft <= 0) {
        clearInterval(timer);
        timerDisplay.textContent = "You can resend OTP now";
        resendBtn.disabled = false;
      }
      timeLeft--;
    }, 1000);
  }, 300);
}


function setupDobValidation() {
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dob-error'); // optional span
    const form = document.getElementById('my-form');       // or use document.querySelector('form')

    if (!dobInput) return;

    // Set max to today - 18 years (prevents choosing an invalid future-young date)
    (function setMaxDOB() {
      const today = new Date();
      const max = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      dobInput.max = toISODate(max);
    })();

    // Helper: format date to YYYY-MM-DD for input[type=date]
    function toISODate(d) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }

    // Core check: true if dob represents someone 18 or older
    function is18OrOlder(value) {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return false;
      const today = new Date();

      // 18th birthday = dob + 18 years (handles leap years correctly)
      const eighteenth = new Date(d.getFullYear() + 18, d.getMonth(), d.getDate());
      return eighteenth <= new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }

    function showError(message) {
      if (dobError) dobError.textContent = message || '';
      // Also set the browser's validity state
      dobInput.setCustomValidity(message || '');
      // Optional: toggle aria-invalid for accessibility
      dobInput.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    // Validate on change/input
    function validateDob() {
      const value = dobInput.value;
      if (!value) {
        showError('Date of birth is required.');
        return false;
      }
      if (!is18OrOlder(value)) {
        showError('You must be at least 18 years old.');
        return false;
      }
      showError('');
      return true;
    }

    // Hook up events
    dobInput.addEventListener('change', validateDob);
    dobInput.addEventListener('input', validateDob);

    if (form) {
      form.addEventListener('submit', (e) => {
        if (!validateDob()) {
          e.preventDefault();
          dobInput.focus();
        }
      });
    }
  };

 

// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, submitFormArrayToString, maskMobileNumber, startOtpTimer,formatINRCurrency,setupDobValidation };
