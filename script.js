const button = document.getElementById("button");
const blankAnswer = document.getElementById("answer-empty");
const answerComplete = document.getElementById("answer-complete");
const mortgageAmount = document.getElementById("amount");
const monthlyAnswer = document.getElementById("monthlyanswer");
const totalAnswer = document.getElementById("totalanswer");
const mortgageTerm = document.getElementById("term");
const mortgageRate = document.getElementById("rate");
const repaymentCheck = document.getElementById("repayment");
const interestCheck = document.getElementById("interest-only");
const amountError = document.getElementById("amount-error");
const termError = document.getElementById("term-error");
const rateError = document.getElementById("rate-error");
const interestError = document.getElementById("interest-error");
const repaymentError = document.getElementById("repayment-error");
const clearAll = document.getElementById("clearall");

const amount = parseFloat(mortgageAmount.value);
const term = parseInt(mortgageTerm.value);
const rate = parseFloat(mortgageRate.value);

function validation() {
  let isValid;

  //amount validation
  if (mortgageAmount.value === "") {
    amountError.style.display = "block";
    document.getElementById("inputBuild1").style.borderColor = "red";
    document.getElementById("pdiv").style.backgroundColor = "red";
    isValid = false;
  } else {
    amountError.style.display = "none";
    document.getElementById("inputBuild1").style.borderColor =
      "rgb(68, 68, 68)";
    document.getElementById("pdiv").style.backgroundColor =
      "rgba(0, 128, 128, 0.356)";
    isValid = true;
  }

  //term validation
  if (mortgageTerm.value === "") {
    termError.style.display = "block";
    document.getElementById("inputBuild2").style.borderColor = "red";
    document.getElementById("termdiv").style.backgroundColor = "red";
    isValid = false;
  } else {
    termError.style.display = "none";
    document.getElementById("inputBuild2").style.borderColor =
      "rgb(68, 68, 68)";
    document.getElementById("termdiv").style.backgroundColor =
      "rgba(0, 128, 128, 0.356)";
    isValid = true;
  }

  //rate validation
  if (mortgageRate.value === "") {
    rateError.style.display = "block";
    document.getElementById("inputBuild3").style.borderColor = "red";
    document.getElementById("termdiv2").style.backgroundColor = "red";
    isValid = false;
  } else {
    rateError.style.display = "none";
    document.getElementById("inputBuild3").style.borderColor =
      "rgb(68, 68, 68)";
    document.getElementById("termdiv2").style.backgroundColor =
      "rgba(0, 128, 128, 0.356)";
    isValid = true;
  }

  //checkbox validation
  if (!repaymentCheck.checked && !interestCheck.checked) {
    interestError.style.display = "block";
    document.getElementById("repay").style.borderColor = "red";
    document.getElementById("interest").style.borderColor = "red";
  } else {
    interestError.style.display = "none";
    document.getElementById("repay").style.borderColor = "rgb(68, 68, 68)";
    document.getElementById("interest").style.borderColor = "rgb(68, 68, 68)";
  }

  return isValid;
}

function displayAnswer() {
  if (!validation()) {
    blankAnswer.style.display = "block";
    answerComplete.style.display = "none";
    return;
  } else {
    blankAnswer.style.display = "none";
    answerComplete.style.display = "block";
  }
}

function getMortgagePayment() {
  if (!validation()) {
    return;
  }

  const amount = parseFloat(mortgageAmount.value);
  const term = parseInt(mortgageTerm.value);
  const rate = parseFloat(mortgageRate.value) / 100;

  // Repayment formula for regular mortgage
  const repaymentFormula = () => {
    const r = rate / 12; // Monthly interest rate
    const n = term * 12; // Total number of months
    const topBtm = 1 + r;
    const topBtmRaised = topBtm ** n;
    const topCompleted = r * topBtmRaised;
    const bottom = topBtmRaised - 1;
    const TBdivision = topCompleted / bottom;
    const m = amount * TBdivision;

    // Total repayment over the term
    const totalRepayment = m * n;

    console.log({ m, topBtm, topBtmRaised, topCompleted, totalRepayment });

    return { m, totalRepayment };
  };

  // Display results
  const { m, totalRepayment } = repaymentFormula();
  monthlyAnswer.innerText = m.toFixed(2);
  totalAnswer.innerText = totalRepayment.toFixed(2);
}

// Interest only formula
function interestOnlyFormula() {
  if (!validation()) {
    return;
  }

  const amount = parseFloat(mortgageAmount.value);
  const term = parseInt(mortgageTerm.value);
  const rate = parseFloat(mortgageRate.value) / 100;

  const interestFormula = () => {
    const monthlyInterestRate = rate / 12;
    const monthlyInterest = amount * monthlyInterestRate;

    return monthlyInterest;
  };

  const totalInterestRepayment = () => {
    const monthlyInterest = interestFormula();
    const totalInterest = monthlyInterest * term * 12;

    console.log(totalInterest);
    return totalInterest;
  };

  const monthlyInterest = interestFormula();
  const totalInterest = totalInterestRepayment();

  monthlyAnswer.innerText = monthlyInterest.toFixed(2);
  totalAnswer.innerText = totalInterest.toFixed(2);
  // displayAnswer();
}

// Event listeners for the checkboxes
repaymentCheck.addEventListener("change", () => {
  if (repaymentCheck.checked) {
    interestCheck.checked = false; // Uncheck the other checkbox
  }
});

interestCheck.addEventListener("change", () => {
  if (interestCheck.checked) {
    repaymentCheck.checked = false; // Uncheck the other checkbox
  }
});

// Button to calculate mortgage
button.addEventListener("click", () => {
  if (repaymentCheck.checked) {
    getMortgagePayment();
  } else if (interestCheck.checked) {
    interestOnlyFormula();
  }
  displayAnswer();
});

//clear all inputs
resetInputs = () => {
  blankAnswer.style.display = "block";
  answerComplete.style.display = "none";
  mortgageAmount.value = "";
  mortgageRate.value = "";
  mortgageTerm.value = "";
  repaymentCheck.checked = false;
  interestCheck.checked = false;
};

clearAll.addEventListener("click", resetInputs);
