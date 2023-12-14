import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-89d33-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'ShoppingList');

const button = document.getElementById('add-button');
const input = document.getElementById('input-field');
const shoppingList = document.getElementById('shopping-list');

// Add an event listener to the button
button.addEventListener('click', function() {
 
  let inputText = input.value;
  if (inputText != '') {
    push(shoppingListInDB, inputText);
    clearInputText();

  } else {
    console.log('Input field is empty.');
  }
});

onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()){

    
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingList()
    
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i];
        appendItemToShoppingList(currentItem);
    }
    } else {
        shoppingList.innerHTML = 'No items here... yet';
    }
})



function clearShoppingList() {
    shoppingList.innerHTML = "";
}
function clearInputText() {
    input.value = '';
}

function appendItemToShoppingList(item) {

    let itemID = item[0];
    let itemValue = item[1];
    let newEl = document.createElement('li');
    newEl.textContent = itemValue;
    shoppingList.append(newEl);

    newEl.addEventListener('dblclick', function(){
        let exactLocationOfItemInDB = ref(database, `ShoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })
}