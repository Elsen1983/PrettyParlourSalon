
const amountInput = document.querySelector('#voucherAmount');
const errorMessageDiv = document.querySelector('#voucherWarning');
const validitySpan = document.querySelector('.validity');
const errorMessageParagraph = errorMessageDiv.querySelector('p');

const numberOfvoucher = document.querySelector('#voucherNumber');
const addVoucherToCart_Btn = document.querySelector('#confirmVoucher');

window.onload = ()=>{
    resetAmount();
    signNotAccepted();
    disableBtn();

    amountInput.addEventListener('focusin', (event) => {
        signNotAccepted();
        disableBtn();
    });

    amountInput.addEventListener('focusout', (event) => {
        //then checking that the amount is filled out with a real number or not
        if( isNumber(amountInput.value) === true ){
            console.log(amountInput.value + " is a valid number");
            
            //if negative amount, then change it to positive
            if(amountInput.value < 0){
                amountInput.value = Math.abs(amountInput.value);
            }
            //if the value is less than 10 euro then ask for higher value
            if(amountInput.value < 10){
                amountError("Please enter a valid number above 10 euro.");
                signNotAccepted();
                disableBtn();
            }
            //valid number with 10 ore more value
            else{
                //round the amount to 2 decimal places
                roundAmount(amountInput.value);

                //remove any earlier error message
                removeAmountError();
                signAccepted();
                enableBtn();
                console.log("Valid amount. Accepted");

            }
        }
        else{
            //invalid amount
            amountError("Please enter a valid number.");
            signNotAccepted();
            disableBtn();
        }
    });


};


//reset amount on (re)load page
function resetAmount(){
    amountInput.value = "";
}

//validate that the input is a number
function isNumber(n) { 
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
} 

//round the amount to 2 decimal places
function roundAmount(input){
    amountInput.value = (Math.round(amountInput.value * 100)/100).toFixed(2);
}

//display error messages
function amountError(input){
    let error = input;
    errorMessageParagraph.innerHTML = error;
    errorMessageDiv.style.display = "block";
}
//remove error messages
function removeAmountError(){
    let message = "Warning message for Voucher.";
    errorMessageParagraph.innerHTML = message;
    errorMessageDiv.style.display = "none";
}

function signAccepted(){
    validitySpan.textContent = "✓";
    validitySpan.style.color = "green";
}
function signNotAccepted(){
    validitySpan.textContent = "✖";
    validitySpan.style.color = "red";
}
function enableBtn() {
    addVoucherToCart_Btn.disabled = false;
}
function disableBtn() {
    addVoucherToCart_Btn.disabled = true;
}

