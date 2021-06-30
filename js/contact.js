
/* Google Map*/

/*let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.74473143852386, lng: -8.73970498588585},
    zoom: 8,
    });
}*/

// function sendMail(){
//     let emailFrom = document.querySelector("#formName");
//     let emailAddress = document.querySelector("#formMail");
//     let emailMessage = document.querySelector("#formMessage");


//     Email.send({
//         SecureToken : "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",
//         To : 'norbertkorom@gmail.com',
//         From : emailAddress,
//         // Subject : "This is the subject",
//         Body : emailMessage,
//         Attachments : [
//         {
//             name : "smtpjs.png",
//             path : "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
//         }]
//     }).then(
//         message => alert(message)
//     );

// }

"use strict";

window.onload = ()=>{
    let formElements = document.querySelectorAll(".input-field");
    formElements.forEach((item, index)=>{
        // console.log(index, item);
        item.value = "";
    })
}