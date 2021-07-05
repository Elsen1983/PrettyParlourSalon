
const amountInput = document.querySelector('#amountVoucher');
const fromWho = document.querySelector('#fromVoucher');
const toWho = document.querySelector('#toVoucher');

const errorMsgAmountDiv = document.querySelector('#amountWarning');
const errorMessageAmountParagraph = errorMsgAmountDiv.querySelector('p');

const errorMsgFromDiv = document.querySelector('#fromWhoWarning');
const errorMessageFromParagraph = errorMsgFromDiv.querySelector('p');

const errorMsgToDiv = document.querySelector('#toWhoWarning');
const errorMessageToParagraph = errorMsgToDiv.querySelector('p');

const fromValiditySpan = document.querySelector('#fromValidity');
const toValiditySpan = document.querySelector('#toValidity');
const amountValiditySpan = document.querySelector('#amountValidity');


const numberOfvoucher = document.querySelector('#voucherNumber');
const addVoucherToCart_Btn = document.querySelector('#confirmVoucher');

let timeout = null;



window.onload = ()=>{
    // test();
    resetInputs();
    allSignNotAccepted();
    disableElement(toWho);
    disableElement(amountInput);
    disableBtn();

    fromWho.addEventListener('input', () =>{

        if(fromWho && fromWho.value !== ""){
            
            removeFromWhoError();
            fromSignAccepted();
            enableElement(toWho);

            if(toWho.disabled === false && toWho.value !== ""){
                enableElement(amountInput);
            }else{
                enableElement(toWho);
            }
            
        }else{
            fromWhoError("Type a valid Name.");
            fromSignNotAccepted();
            disableElement(toWho);
            disableElement(amountInput);
            disableElement(addVoucherToCart_Btn);
        }
    });


    toWho.addEventListener('input', () =>{
        if(toWho && toWho.value !== ""){
            removeToWhoError();
            toSignAccepted();
            enableElement(amountInput);

            console.log(isNumber(amountInput.value))
            console.log(amountInput.disabled)
            if(amountInput.disabled === true && isNumber(amountInput.value) === false){
                enableBtn();
            }else{
                console.log("hmmm")
            }
        }else{
            toWhoError("Type a valid Name.");
            toSignNotAccepted();
            disableElement(amountInput);
            disableElement(addVoucherToCart_Btn);
        }
    });

    amountInput.addEventListener('keyup', function (e) {
        if(isNumber(e.key) || e.key === "Backspace"){
            disableBtn();
            clearTimeout(timeout);
            timeout = setTimeout(function () {
            console.log('Value:', amountInput.value);
            roundAmount(amountInput.value);
            //checkValidityOfAmount();
            updateValue();
        }, 1000);
        }
        else{
            console.log("wrong key:" + e.key)
        }
        
        
        
    });

    amountInput.addEventListener('focusin', () => {
        amountInput.value = "";
        amountSignNotAccepted();
        disableBtn();
    });

    // amountInput.addEventListener('input', updateValue);

    // amountInput.addEventListener('focusout', () => {
    //     //round the amount to 2 decimal places
    //     roundAmount(amountInput.value);
    //     checkValidityOfAmount();
    // });


};




function updateValue() {
    disableBtn();
    checkValidityOfAmount();
    
}

function checkValidityOfAmount(){
    //then double checking that the amount is filled out with a real number or not
    if( isNumber(amountInput.value) === true ){
        //console.log(amountInput.value + " is a valid number");

        //if negative amount, then change it to positive
        if(amountInput.value < 0){
            amountInput.value = Math.abs(amountInput.value);
        }
        //if the value is less than 10 euro then ask for higher value
        if(amountInput.value < 10){
            amountError("Please enter a valid number above 10 euro.");
            amountSignNotAccepted();
            // disableElement(addVoucherToCart_Btn);
            checkHowMany(false);
        }
        //valid number with 10 ore more value
        else{
           //round the amount to 2 decimal places
           //roundAmount(amountInput.value);

            //remove any earlier error message
            removeAmountError();
            amountSignAccepted();
            // enableElement();
            checkHowMany(true);
            console.log("Valid amount. Accepted");

        }
    }
    else{
       //invalid amount
        amountError("Please enter a valid number.");
        amountSignNotAccepted();
        disableElement(addVoucherToCart_Btn);
        checkHowMany(false);
    }
}

//reset amount on (re)load page
function resetInputs(){
    fromWho.value = "";
    toWho.value = "";
    numberOfvoucher.value = 1;
    amountInput.value = "";
}

//validate that the input is a number
function isNumber(n) { 
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
} 

//round the amount to 2 decimal places
function roundAmount(input){
    amountInput.value = (Math.round(input * 100)/100).toFixed(2);
}



/* Handling error messages */
//display error messages
function fromWhoError(input){
    let error = input;
    errorMessageFromParagraph.innerHTML = error;
    errorMsgFromDiv.style.display = "block";
}
//remove error messages
function removeFromWhoError(){
    let message = "Warning message for Voucher.";
    errorMessageFromParagraph.innerHTML = message;
    errorMsgFromDiv.style.display = "none";
}
//display error messages
function toWhoError(input){
    let error = input;
    errorMessageToParagraph.innerHTML = error;
    errorMsgToDiv.style.display = "block";
}
//remove error messages
function removeToWhoError(){
    let message = "Warning message for Voucher.";
    errorMessageToParagraph.innerHTML = message;
    errorMsgToDiv.style.display = "none";
}



//display error messages
function amountError(input){
    let error = input;
    errorMessageAmountParagraph.innerHTML = error;
    errorMsgAmountDiv.style.display = "block";
}
//remove error messages
function removeAmountError(){
    let message = "Warning message for Voucher.";
    errorMessageAmountParagraph.innerHTML = message;
    errorMsgAmountDiv.style.display = "none";
}


function fromSignAccepted(){
    fromValiditySpan.textContent = "✓";
    fromValiditySpan.style.color = "green";
}
function fromSignNotAccepted(){
    fromValiditySpan.textContent = "✖";
    fromValiditySpan.style.color = "red";
}
function toSignAccepted(){
    toValiditySpan.textContent = "✓";
    toValiditySpan.style.color = "green";
}
function toSignNotAccepted(){
    toValiditySpan.textContent = "✖";
    toValiditySpan.style.color = "red";
}

function amountSignAccepted(){
    amountValiditySpan.textContent = "✓";
    amountValiditySpan.style.color = "green";
}
function amountSignNotAccepted(){
    amountValiditySpan.textContent = "✖";
    amountValiditySpan.style.color = "red";
}

function allSignNotAccepted(){
    fromValiditySpan.textContent = "✖";
    fromValiditySpan.style.color = "red";
    toValiditySpan.textContent = "✖";
    toValiditySpan.style.color = "red";
    amountValiditySpan.textContent = "✖";
    amountValiditySpan.style.color = "red";
}

function disableElement(element){
    element.disabled = true;
}
function enableElement(element){
    element.disabled = false;
}


function checkHowMany(booleanValue){
    if(numberOfvoucher.value !=0 && fromWho.disabled === false && toWho.disabled=== false && booleanValue === true){
        enableBtn();
    }
    else{
        disableBtn();
    }
}
function enableBtn() {
    addVoucherToCart_Btn.disabled = false;
}
function disableBtn() {
    addVoucherToCart_Btn.disabled = true;
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }
        

    return true;
}







/* test */
function test(){
    //https://codekila.com/how-to-loop-through-an-array-in-javascript/?utm_source=rss&utm_medium=rss&utm_campaign=how-to-loop-through-an-array-in-javascript

    //Numeric array
    // let arrayA = [2,"a",34.5, "huha"];

    //Associative Array
    // let arrayA = [];
    // arrayA['first'] = 'AB';
    // arrayA['second'] = 'CD';

    //Array of Object
    let arrayObj = [
                    {
                        name:"ABC",
                        age: 16
                    },
                    {
                        name:"DEF",
                        age: 30
                    },
                    {
                        name:"GHI",
                        age: 20
                    },
                    {
                        name:"JKL",
                        age: 24
                    }
    ];


    // console.log(arrayA);
    console.table(arrayObj);

    // arrayA.forEach(function(value, key){
    //     console.log(key + " : " + value);
    // });
    // for(let key in arrayA){
    //     console.log(arrayA[key]);
    // }

    // let newArray = arrayA.map(function(elem, index, array){
    //     return typeof elem;
    // });

    // let newArray = arrayObj.map(function(e,k){
    //     if(e.age > 18){
    //         return e.age;
    //     } 
    // });

    // let newArray = arrayA.filter(function(elem,key){
    //     return typeof elem === "string";
    // })

    let newArray = arrayObj.filter((elem, index)=>{
        return elem.age > 16;
    });

    //.reduce()
    
    console.table(newArray);
    console.dirxml(newArray[0])


}