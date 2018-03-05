"use strict";
var firebase = require('./../lib/node_modules/firebase');

var config = {
    apiKey: "AIzaSyBourPSbkCAALEBJLro568lRdFR-wdt6x8",
    authDomain: "foodielist-2ae33.firebaseapp.com",
    databaseURL: "https://foodielist-2ae33.firebaseio.com",
    projectId: "foodielist-2ae33",
    storageBucket: "foodielist-2ae33.appspot.com",
    messagingSenderId: "1021787294177"
};

firebase.initializeApp(config);
  

var ref = firebase.database().ref();


var applicationState = {
    cities:[],
    restaurants:[],
    favorites:[]
}


function showAllRestaurants(){
    clearHTML("restaurants-list");

    applicationState.restaurants.forEach(function(restaurant){
        const elementProps = {
            type:"div",
            attributes:{
                class:"dropdown-item",
            },
            innerText:restaurant.restaurant
        }
        
        const restaurantHtml = createHtmlElement(elementProps);
    
    
        addItemToElementWithId("restaurants-list", restaurantHtml);
    });
}


function filterRestaurantByCity(cityIdSearchingBy){
    var restaurantsByCity = [];

    applicationState.restaurants.forEach(function(restaurant){
        if(restaurant.city_id === parseInt(cityIdSearchingBy)){
            restaurantsByCity.push(restaurant)
        }
    });

    return restaurantsByCity;
}


function convertSnapshotToArray(items){
    var dataToReturn = [];

    items.forEach(function(item){
        dataToReturn.push(item.val());
    });

    return dataToReturn;
}


function getData(table){
    return ref.child(table).once("value", function(result){
        return result;
    });
}

function addItemToElementWithId(elementId, item){
    let element = document.getElementById(elementId);
    element.appendChild(item);
}


function createHtmlElement(options){
    let elementBeingCreated = document.createElement(options.type);
    let elementsInnerText = (options.innerText) ? document.createTextNode(options.innerText) : null;
    
    if(elementsInnerText !== null){
        elementBeingCreated.appendChild(elementsInnerText);
    }

    if(options.attributes){
        Object.keys(options.attributes).forEach(function(attributeName){
            return elementBeingCreated.setAttribute(attributeName, options.attributes[attributeName]);
        });
    
    }

    return elementBeingCreated;
}




getData("cities").then(function(data){
    var cities = convertSnapshotToArray(data);

    applicationState.cities = cities;

    cities.forEach(function(city){
        const elementProps = {
            type:"div",
            attributes:{
                class:"dropdown-item",
                "data-city-id":city.id
            },
            innerText:city.city
        }
        
        const menuItem = createHtmlElement(elementProps);
    
    
        addItemToElementWithId("city-dropdown", menuItem);
    });
});


getData("restaurants").then(function(data){
    var restaurants = convertSnapshotToArray(data);

    applicationState.restaurants = restaurants;

    restaurants.forEach(function(restaurant){
        const elementProps = {
            type:"div",
            attributes:{
                class:"dropdown-item",
                "data-restaurant-id":restaurant.id
            },
            innerText:restaurant.restaurant
        }

        const restaurantItem = createHtmlElement(elementProps);
    
    
        addItemToElementWithId("restaurants-list", restaurantItem);

    });
});



function clearHTML(id){
    var elementToClear = document.getElementById(id);

    while(elementToClear.firstChild) {
        elementToClear.removeChild(elementToClear.firstChild);
    }
}


function updateRestaurantUI(restaurants){
    var restaurantList = document.getElementById("restaurants-list");
    clearHTML("restaurants-list") //aka id
   

    restaurants.forEach(function(restaurant){
        const elementProps = {
            type:"div",
            attributes:{
                class:"dropdown-item",
                "data-restaurant-id":restaurant.id
            },
            innerText:restaurant.restaurant
        }

        const restaurantItem = createHtmlElement(elementProps);
    
    
        addItemToElementWithId("restaurants-list", restaurantItem);
    });

}


var cityDropDown = document.getElementById("city-dropdown");

cityDropDown.addEventListener("click",function(event){
   
    if(event.target.hasAttribute("data-city-id")){
        var cityId = event.target.getAttribute("data-city-id")
        console.log("the city id is: ", cityId);
        var filteredRestaurantsByCity = filterRestaurantByCity(cityId);

        updateRestaurantUI(filteredRestaurantsByCity) 

    }

    if(event.target.id === "all-cities"){
        showAllRestaurants();
    }
});




$("#city-nav").click(function(){

});






  



