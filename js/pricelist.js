"use strict";

var jsonreadObj;

window.onload = ()=>{
    //generate the images based on the JSON file (gallery.json)
    const gallery = document.querySelector(".gallery");

    const myInit = { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'default'
    };

    let myRequest = new Request("../json/pricelist.json", myInit);
    
    fetch(myRequest)
        .then( response =>{
            if (response.ok){
                return response.json();
            }
            else{
                return 'Error' + response.statusText;
            }
            // console.log(response.headers.get('Content-Type'));
            // console.log(response.headers.get('Date'));
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.type);
            // console.log(response.url);
        })
        .then(data =>{

            let categoryArray = [];
            let categoryDistinctAray = [];
            let objectsArray = data.pricelist;

            objectsArray.forEach(function(value,key){
                categoryArray.push(value.category);
            });

            categoryDistinctAray = [...new Set(categoryArray)];

            generateCategoriesContainers(categoryDistinctAray);
            addLocalStorageCategories(categoryDistinctAray);
            populateLocalStorageCategories(objectsArray);
            addListelements();
            addListLinksForScroll(categoryDistinctAray);

        })
        .catch(err =>{
            console.log('Fetch error :-S', err);
        });

        function generateCategoriesContainers(categories){
            let listsContainer = document.querySelector('#listsContainer');
            for(let i=0; i<categories.length; i++){
                let categoryName = categories[i];
                let listContainer = document.createElement('div');
                listContainer.id = categoryName;
                listContainer.className = "listContainer";
                listsContainer.append(listContainer);
            }
        }

        function addLocalStorageCategories(categories){
            for(let i=0; i<categories.length; i++){
                let emptyArray = [];
                let categoryName = categories[i];
                //add categories to localStorage
                localStorage.setItem(categoryName, JSON.stringify(emptyArray));
            }
        }

        function populateLocalStorageCategories(arr) {
            for(let i=0; i<arr.length; i++){
                //iterate objects in the objects-array
                for (const [key, value] of Object.entries(arr[i])) {
                    // console.log(`${key}: ${value}`);
                    //get the category
                    if( `${key}` === 'category'){
                        // console.log(`${key}`);
                        //make an array to eual with that localStorage values where the 'value' of the object is same than the localstorage's 'key-name'
                        let storedLocalStorageArray = JSON.parse(localStorage.getItem(`${value}`)) || [];
                        //make a 'shrinked' object from the original by deleting the 'category' key and its value
                        delete arr[i].category;
                        //add the "new" object to the storedLocalStorageArray
                        storedLocalStorageArray.push(arr[i]);
                        //finally add it back (overwrite) to localStorage
                        localStorage.setItem(`${value}`, JSON.stringify(storedLocalStorageArray));
                    }
                }
            }
        }
}

function addListelements(){
    //select all 'listContainer'
    let listContainers = document.querySelectorAll('div.listContainer');

    [...listContainers].forEach((container) => {

        let containerId = container.id;

        let unorderedList = document.createElement('ul');
        unorderedList.className = "listContainer".concat(`${containerId}`);
        
        let categoryArrayFromLocalStorage = JSON.parse(localStorage.getItem(containerId));
        let lengthOfCategoryArrayFromLocalStorage = categoryArrayFromLocalStorage.length;

        for(let i=0; i<lengthOfCategoryArrayFromLocalStorage; i++) {

            let titleText = categoryArrayFromLocalStorage[i].title;
            let price = categoryArrayFromLocalStorage[i].price;

            let listElements = document.createElement('li');
            let firstDiv = document.createElement('div');
            firstDiv.className = "dot-div";
            let secondDiv = document.createElement('div');
            secondDiv.className = "text-div";
            let firstSpan = document.createElement('span');
            firstSpan.className = "text-span";
            firstSpan.textContent = titleText;
            let secondSpan = document.createElement('span');
            secondSpan.className = "text-span pull-right";
            secondSpan.textContent = price;

            secondDiv.append(firstSpan);
            secondDiv.append(secondSpan);
            listElements.append(firstDiv);
            listElements.append(secondDiv);
            unorderedList.append(listElements);
        }

        let titleSpan = document.createElement('span');
        titleSpan.className = "listTitleSpan";
        let flispSpan = document.createElement('span');
        flispSpan.className = "flipText";

        let titleSpanText = ("--✂---" + " " + `${containerId}`).toUpperCase() + " ";
        let flispSpanText = ("--✂---");

        titleSpan.textContent = titleSpanText;
        flispSpan.textContent = flispSpanText;

        container.append(unorderedList);
        titleSpan.append(flispSpan);
        container.prepend(titleSpan);
    });
}

function addListLinksForScroll(categoryArray){
    let categories = [...categoryArray];
    let listsContainer = document.querySelector('#listsContainer');
    let categoriesWrapperTopBorder = document.createElement('div');
    categoriesWrapperTopBorder.className = "navBorder";
    let categoriesWrapper = document.createElement('div');
    categoriesWrapper.className = "wrapper";
    let categoriesNav = document.createElement('nav');
    let categoriesItemsContainer = document.createElement('div');
    categoriesItemsContainer.className = "items";
    let extraMessage = document.createElement('div');
    extraMessage.className = "extramessage";
    extraMessage.textContent = "Please note if blowdry is something you don't find a necessity please avail of our deep penetrating take home treatment.";

    categoriesNav.append(categoriesItemsContainer);
    categoriesWrapper.append(categoriesNav);
    listsContainer.append(categoriesWrapper);

    categories.forEach((category)=>{
        let categoryNameCapitalized = capitaliseCategoriesWords(category);
        let listElementSpan = document.createElement('span');
        listElementSpan.textContent = `${categoryNameCapitalized}`;
        //add scrollIntoView function to 'Links'
        listElementSpan.addEventListener('click', function(){
            let element = document.getElementById(`${category}`);
            element.scrollIntoView();
        })
        categoriesItemsContainer.append(listElementSpan);
    });

    categoriesWrapper.prepend(categoriesWrapperTopBorder);
    listsContainer.prepend(categoriesWrapper);
    listsContainer.append(extraMessage);
}

function capitaliseCategoriesWords(word){
    let result = word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return result;
}