

const slideShowContainer = document.querySelector('#slideshow-container');
var slideIndex = 1;


window.onload = ()=>{    
    //generate the images based on the JSON file (gallery.json)
    //const selectedProducts = document.querySelector(".gallery");

    const myInit = { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'default'
    };

    let myRequest = new Request("content/json/selectedProducts.json", myInit);
    
    fetch(myRequest)
        .then( response =>{
            if (response.ok){
                return response.json();
            }
            else{
                return 'Error' + response.statusText;
            }
        })
        .then(data =>{

            // console.log(data)
            let productsObjectArray = data.selectedProducts;
            let imagesUrlArray = [];
            let imagesAltArray = [];
            let imagesDescriptionArray = [];

            productsObjectArray.forEach(function(value,key){
                imagesUrlArray.push(value.url);
                imagesAltArray.push(value.alt);
                imagesDescriptionArray.push(value.description);
            });

            // console.log(imagesUrlArray);

            generateSlides(imagesUrlArray, imagesAltArray, imagesDescriptionArray);
            generatePrevNextButtons();
            generateDotButtons(imagesUrlArray.length);

            showSlides(slideIndex);

        }).then(function(){
            
        }
        )
        .catch(err =>{
            console.log('Fetch error :-S', err);
        });
    
}

function generateSlides(urlArray, altArray, descriptionArray){
    /*
    Example
    <div class="mySlides fade">
        <div class="numbertext">1 / 3</div>
        <img class="prodImg" src="content/images/products/120764133_665528840764937_6575419796982621978_n.jpg" style="width:100%">
        <div class="text">Caption Text</div>
    </div>
    */

    let index = 1;
    for(let i=0; i<urlArray.length; i++){
        let mySlidesFadeDiv = document.createElement('div');
        mySlidesFadeDiv.className = "mySlides fade";

        let numberTextDiv = document.createElement('div');
        numberTextDiv.className = "numbertext";
        numberTextDiv.textContent = index + "/" + urlArray.length;

        let imageElem = document.createElement("img");
        let imageLazyLoad = document.createAttribute("loading");
        let imageSource = document.createAttribute("src");
        imageSource.value = urlArray[i];
        imageLazyLoad.value = "lazy";
        let imageAlt = document.createAttribute("alt");
        imageAlt.value = altArray[i];
        imageElem.setAttributeNode(imageSource);
        imageElem.setAttributeNode(imageAlt);
        imageElem.className = "prodImg";

        let textDiv = document.createElement('div');
        textDiv.className = "text";
        textDiv.textContent = descriptionArray[i];

        mySlidesFadeDiv.append(numberTextDiv);
        mySlidesFadeDiv.append(imageElem);
        mySlidesFadeDiv.append(textDiv);
        slideShowContainer.append(mySlidesFadeDiv);

        index++;
    }
}

function generatePrevNextButtons(){
    /*
    Sample
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
    */

    let prevButton = document.createElement('a');
    prevButton.className = "prev";
    prevButton.textContent = "<";
    let prevButtonOnclick = document.createAttribute("onclick");
    prevButtonOnclick.value = "plusSlides(-1)";
    prevButton.setAttributeNode(prevButtonOnclick);

    let nextButton = document.createElement('a');
    nextButton.className = "next";
    nextButton.textContent = ">"
    let nextButtonOnclick = document.createAttribute("onclick");
    nextButtonOnclick.value = "plusSlides(1)";
    nextButton.setAttributeNode(nextButtonOnclick);

    slideShowContainer.append(prevButton);
    slideShowContainer.append(nextButton);


}

function generateDotButtons(dotsNumber){
    console.log(dotsNumber)
    /*
    Sample
    <div style="text-align:center">
        <span class="dot" onclick="currentSlide(1)"></span> 
        <span class="dot" onclick="currentSlide(2)"></span> 
        <span class="dot" onclick="currentSlide(3)"></span> 
    </div>
    */

    let dotsDiv = document.createElement('div');
    dotsDiv.className = "dotsContainer";
    dotsDiv.style.textAlign = "center";
    for(let i = 1; i < dotsNumber+1; i++){
        let dotSpan = document.createElement('span');
        dotSpan.className = "dot";
        // dotSpan.addEventListener('clisk', currentSlide(i));
        let dotOnclick = document.createAttribute("onclick");
        dotOnclick.value = `currentSlide(${i})`;
        dotSpan.setAttributeNode(dotOnclick);
        dotsDiv.append(dotSpan);
    }
    slideShowContainer.append(dotsDiv);
}



function plusSlides(n) {
    console.log("clicked plusdot")
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    console.log("clicked")
    var i;
    var slides = document.getElementsByClassName('mySlides fade');
    console.log(slides.length)
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }    
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}