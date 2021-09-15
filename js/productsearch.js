
// "use strict";

var webWorker;

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


function onPageLoaded() {

     /*  If browser supports WebWorkers then add web-worker  */
 if (window.Worker) {
    console.log("Your browser support WebWorkers! 2");

    /*  Start a Web Worker. */
    startWorker();

    let input = document.getElementById("searchField");

    /*  Add eventListener to the input field.   */
    input.addEventListener("input", function (evt) {
        
        if (evt.inputType === "deleteContentBackward" || evt.inputType === "deleteContentForward") {
            
            if(this.value.trim() === ""){
                document.getElementById("content_div").innerHTML = "";
                document.getElementById("percentage").textContent = "0";
                document.getElementById("progressBar").value = "0";
            }else{
                searchMovie(this.value);
            }
        }
        /*  if the input is not empty after .trim() then call the searchMovie() function. */
        /*  .trim() is not supported in Internet Explorer 8 and earlier versions. */
        if (this.value.trim() !== "") {
            searchMovie(this.value);
        }
    });
} else {
    alert("Your browser not support WebWorkers!");
}

}



function searchMovie(searchText) {

    console.log("The input was: " + searchText);

    /*  Delaying the function execute */
    if (this.timer) {
        window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(function() {
        /*  Execute the function 500 millisecond after when user stop typing.   */

            /*  Clear the content area.  */
            document.getElementById("content_div").innerHTML = "";

            webWorker.postMessage(searchText);

            webWorker.onmessage = function (e) {
                if(typeof e.data === "number"){
                    // console.log("Percentage: " + e.data);
                    document.getElementById("percentage").textContent = e.data;
                    document.getElementById("progressBar").value = e.data;
                }
                else{
                    if(e.data === "finished"){
                        document.getElementById("percentage").textContent = "100";
                        document.getElementById("progressBar").value = 100;
                    }
                    else{
                        for(let i =0; i < e.data.length; i++){
                            let button = document.createElement("button");
                            button.setAttribute("class", "openLinkButton");
                            button.innerHTML = e.data[i].title;
                            button.addEventListener("click", function () {
                                window.open(e.data[i].url);
                            });
                            document.getElementById("content_div").appendChild(button);
                        }
                    }
                }
            }
        
    }, 500);
}

function startWorker() {
    if (typeof(webWorker) == "undefined") {
        webWorker = new Worker("../../js/web_worker.js");
    }
}

function stopWorker() {
    webWorker.terminate();
    webWorker = undefined;
}

