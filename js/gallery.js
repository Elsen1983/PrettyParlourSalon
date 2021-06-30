"use strict";

var imagesUrlsArray = [];

window.onload = ()=>{
    //generate the images based on the JSON file (gallery.json)
    const gallery = document.querySelector(".gallery");
    const loaderUrl = "../images/loader/loader.gif";
    

    const myInit = { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'default'
    };

    let myRequest = new Request("../json/gallery.json", myInit);
    
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
            data.images.forEach(function(value,key){
                generateImages(value.idNumb, value.title, value.date, value.url, value.dataName);
                addFilteringClick();
                addPreviewClick();
            });
        }).then(function(){
            
        }
        )
        .catch(err =>{
            console.log('Fetch error :-S', err);
        });

    function generateImages(numb, title, date, url, dataName){
        // console.log(numb, title, date, url, dataName);
        // example: <li class="image" data-name="moments"><span><img src="../images/lucy12donate_v2.jpg" alt="" loading="lazy"></span></li>
        //<li>
        let listElem = document.createElement("li");
        let liClassName = document.createAttribute("class");
        liClassName.value = "image";
        let liDataName = document.createAttribute("data-name");
        liDataName.value = dataName;

        let liDataDate = document.createAttribute("data-date");
        liDataDate.value = date;
        let liDataTitle = document.createAttribute("data-title");
        liDataTitle.value = title;

        let liOnclick = document.createAttribute("onclick");
        liOnclick.value = "preview(this)";
        listElem.setAttributeNode(liClassName);
        listElem.setAttributeNode(liDataName);
        listElem.setAttributeNode(liDataDate);
        listElem.setAttributeNode(liDataTitle);
        listElem.setAttributeNode(liOnclick);
        let spanElem = document.createElement("span");
        listElem.append(spanElem);

        let imageElem = document.createElement("img");
        
        let imageLazyLoad = document.createAttribute("loading");
        let imageSource = document.createAttribute("src");
        imageSource.value = url;
        imageLazyLoad.value = "lazy";
        let imageAlt = document.createAttribute("alt");
        imageAlt.value = title;
        imageElem.setAttributeNode(imageSource);
        imageElem.setAttributeNode(imageAlt);
        spanElem.append(imageElem)

        gallery.prepend(listElem);
    }

    function addFilteringClick(){
        //selecting all required elements
        let filterItem = document.querySelectorAll(".item");

        for (let i = 0; i < filterItem.length; i++) {
            // console.log(i);
            filterItem[i].addEventListener("click", filteringImages);
        }
    }

    function addPreviewClick(){
        let filterImgs = document.querySelectorAll(".gallery .image");
        //adding onclick attribute in all available images
        for (let i = 0; i < filterImgs.length; i++) {
            filterImgs[i].setAttribute("onclick", "preview(this)"); 
        }
    }
}

function filteringImages(selectedItem) {
    console.log(selectedItem.target.id);
    if(selectedItem.target.classList.contains("item")){
        //remove the currently active selection(s)
        document.querySelector(".item.active").classList.remove("active");
        //add 'active' class to the selected element
        selectedItem.target.classList.add("active"); 

        //getting data-name value of user selected item and store in a filtername variable
        let filterName = selectedItem.target.getAttribute("data-name"); 
        
        let filterImg = document.querySelectorAll(".gallery .image");
        filterImg.forEach((image) => {
            let filterImges = image.getAttribute("data-name"); 
            //if user selected item data-name value is equal to images data-name value
            if((filterImges == filterName) || (filterName == "all")){
                image.classList.remove("hide");
                image.classList.add("show");
            }
            //or user selected item data-name value is equal to "all"
            else{
                image.classList.add("hide"); 
                image.classList.remove("show");
            }
        });
    }

}


//selecting all required elements
const previewBox = document.querySelector(".preview-box"),
imageText = previewBox.querySelector("#imageText"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
shadow = document.querySelector(".shadow");

//fullscreen image preview function
function preview(selectedItem){
    //once user click on any image then remove the scroll bar of the body, so user cant scroll up or down
    // document.querySelector("body").style.overflowX = "hidden";
    
    let selectedPrevImg = selectedItem.querySelector("img").src; 
    let selectedImgTitle = selectedItem.getAttribute("data-title");
    let selectedImgDate = selectedItem.getAttribute("data-date");
    let closeBtn = document.querySelector(".close");
    previewImg.src = selectedPrevImg;
    // imageText.setAttribute('style', 'white-space: pre;');
    // imageText.textContent = selectedImgDate.concat(`\r\n`).concat(selectedImgTitle);
    imageText.textContent = selectedImgDate.concat(` - `).concat(selectedImgTitle);
    previewBox.classList.add("show"); 
    shadow.classList.add("show"); 

    //if user click on close icon of preview box then hide the preview box + the light grey background and show the scroll bar on body
    closeBtn.onclick = ()=>{ 
        previewBox.classList.remove("show");
        shadow.classList.remove("show");
        // document.querySelector("body").style.overflowX = "auto";
    }
}