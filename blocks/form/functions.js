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

 

// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, submitFormArrayToString, maskMobileNumber, startOtpTimer };
