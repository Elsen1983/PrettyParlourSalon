"use strict";

var removeArea = document.querySelector('#scrollingtext');
var messageArea = document.querySelector('#messageDivBlack');
var closeBtn = document.querySelector("#close");

window.addEventListener( 'load', onPageLoaded, false );
window.addEventListener("pageshow", onPageShown, false);

/*https://code.falk-m.de/loading/* */
/* special event handler for ios Safari */
function onPageShown(evt) {
    // check if the page has been loaded from cache entirely
    if (evt.persisted) {
        // emulate the page loaded event
        onPageLoaded();
    }
}

/* */
function onPageLoaded() {

  /*
  Redirect the site to index.html when the localstorage 'lastSelectedPage' key has no value. 
  For example if the user delete cache from the browser but he/she reloads a bookmarked sub-page (contact, about) then it could be solve some possible bugs.
  */
  // if(localStorage.getItem('lastSelectedPage') === null){
  //   window.location.replace("../../index.html");
  //   localStorage.setItem('lastSelectedPage', "home");
  //   colorMenuElem();
  // }
  
  let loadingscreen = document.getElementById("loadingscreen");
    
  setTimeout(function(){
    loadingscreen.style.animation = "fadeOut 1s";
    loadingscreen.style.animationDelay = "1s";
    loadingscreen.style.animationFillMode = "forwards";
  }, 1000);

  setTimeout(function(){   
    let hiddenTags = document.querySelectorAll('.hiddenElems');
                
    hiddenTags.forEach( function(item){
      item.style.display = "block";
      item.setAttribute("class", "loaded");
    });
        
    colorMenuElem();
    loadDocFetch();
    loadDoc();
    //check that the message are must be visible or not (based on earlier actions)
    hideOrShowMessage();

    loadingscreen.remove();

  }, 1500);
}

/* */
function menuOpenClose() {
  var x = document.getElementById("navBar");
  if (x.className === "navigationBar") {
    x.className += " responsive";
  }
  else {
    x.className = "navigationBar";
  }
}

/* */
function colorMenuElem(){
  let allMenuElem = document.querySelectorAll('.menuElem');
  //re-color all menu element to the original
  allMenuElem.forEach( function(items) {
      items.setAttribute("class", "menuElem");
  });
  let pageName = document.body.dataset.pagename;
  let selectedMenu = document.querySelector(`#${pageName}`);
  selectedMenu.setAttribute("class", "menuElem active");
  }

/* */
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("mdbtext").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "http://127.0.0.1:5500/content/contents/scrollingmessage.txt", true);
    xhttp.send();
}

/* */
function loadDocFetch(){
  //With JSON, use the Fetch API & ES6
  fetch('http://127.0.0.1:5500/content/contents/dailyMessage.txt')
    .then(response => response.text())
    .then(data => {
    // Do something with your data
    // console.log(data);
    document.querySelector("#mdtext").textContent = data;
  });
}

/* A button click function which changing the second message line to visible or invisible */
function hideShowMessage(){
  let displayOrHideMessage = localStorage.getItem('messageDisplay');
  let buttonOpenSource, buttonCloseSource;

  //based on the page data attribute in <bod> tag change the root for the icon's source
  if(document.body.dataset.pagename == "home"){
    buttonOpenSource = "./content/images/icons/open-news-64.png";
    buttonCloseSource = "./content/images/icons/close-news-64.png";
  }
  else{
    buttonOpenSource = "../images/icons/open-news-64.png";
    buttonCloseSource = "../images/icons/close-news-64.png";
  }

  //possible null value when page loaded first time or had a hard-reset with deleted cache on the current page
  if( displayOrHideMessage !== null){
    //when message area was visible
    if(displayOrHideMessage == "true"){
      //change to false in localStorageand hide the message area
      localStorage.setItem('messageDisplay', "false");
      closeBtn.src = buttonOpenSource;
      removeArea.style.display = "none";
      messageArea.style.border = "none";  
    }
    else{
      localStorage.setItem('messageDisplay', "true");
      closeBtn.src = buttonCloseSource;
      removeArea.style.display = "block";
      messageArea.style.border = "1px solid white";
    }
  }
  else{
    localStorage.setItem('messageDisplay', "true");
  }
  // console.log(closeBtn.src);
}
  
/* A page onload function which changing the second message line to visible or invisible based on the value of the 'messageDisplay' key in the localStorage*/
function hideOrShowMessage(){
  let displayOrHideMessage = localStorage.getItem('messageDisplay');
  let buttonOpenSource, buttonCloseSource;

  if(document.body.dataset.pagename == "home"){
    buttonOpenSource = "./content/images/icons/open-news-64.png";
    buttonCloseSource = "./content/images/icons/close-news-64.png";
  }
  else{
    buttonOpenSource = "../images/icons/open-news-64.png";
    buttonCloseSource = "../images/icons/close-news-64.png";
  }

  if( displayOrHideMessage !== null){
    if(displayOrHideMessage == "true"){
      closeBtn.src = buttonCloseSource;
      removeArea.style.display = "block";
      messageArea.style.border = "none";  
    }
    else{
      closeBtn.src = buttonOpenSource;
      removeArea.style.display = "none";
      messageArea.style.border = "1px solid white";
    }

  }
  else{
    console.log("empty messageDisplay")
    localStorage.setItem('messageDisplay', "true");
    closeBtn.src = buttonCloseSource;
    removeArea.style.display = "block";
    messageArea.style.border = "none";
  }
  // console.log(closeBtn.src);
  }