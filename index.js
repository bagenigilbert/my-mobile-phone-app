import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue ,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-database-499b5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
         let itemsArray = Object.entries(snapshot.val())
    
    clearShoppingListEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        appendItemToShoppingListEl(currentItem)
    }

    }else{
        shoppingListEl.innerHTML = "There are no items here... yet"
    }
   
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    
    newEl.addEventListener('click', function(){
        console.log(itemID)
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`) 
        remove(exactLocationOfItemInDB)
    
    })
    
    
    shoppingListEl.append(newEl)
}
 const titleElement = document.querySelector("#container h1");
  
    function changeTitle() {
      const currentTitle = titleElement.textContent;
      if (currentTitle === "Reel Time") {
        titleElement.textContent = "Gilbert-SHOPPING MALL"
        
      } else if (currentTitle === "Gilbert-SHOPPING MALL") {
        titleElement.textContent = "gilley-MALL";
      } else if(currentTitle ==='gilley-MALL'){
        titleElement.textContent= 'myDataBase-SHOPPING'
      } else if(currentTitle === 'myDataBase-SHOPPING'){
        titleElement.textContent = "Reel Time"

      }
    }
  
    setInterval(changeTitle, 4000);
  
