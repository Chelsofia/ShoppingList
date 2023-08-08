import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

// a reference is any location inside the database
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://grocery-list-2df29-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

// what database its working with and what the reference should be called
const groceryListInDB = ref(database, "groceryList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const groceryListEl = document.getElementById("grocery-list")



addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  // to add to db
  push(groceryListInDB, inputValue);

  clearInputFieldEl()
 

})

onValue(groceryListInDB, function(snapshot) {
    // Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
    
    // turn the snapshot values to an array
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearGroceryListEl()
  //  A for loop to iterate on itemsArray and return each item
  for (let i = 0; i < itemsArray.length; i++) {

    let currentItem = itemsArray[i]
    // Used the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
    // console.log(itemsArray[i])

    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];
     // this code displays the items from the db
        appendItemToGroceryListEl(currentItem)
        }    
    } else {
        groceryListEl.innerHTML = "No items here... yet"
    }
    
});
function clearGroceryListEl() {
  groceryListEl.innerHTML = "";
}

// Clear the input field when button is pressed
function clearInputFieldEl() {
  inputFieldEl.value = " ";
}
  // Append a new <li> with text content inputValue to the 'shopping-list' <ul>
function appendItemToGroceryListEl(item) {
  // groceryListEl.innerHTML += `<li>${itemValue}</li>`;

  // to get item id
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  // so the item name shows
  newEl.textContent = itemValue;
  // Attached an event listener to newEl and make it so you console log the id of the item when it's pressed.
  newEl.addEventListener("click", function () {
    //Made a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.

    let exactLocationOfItemInDB = ref(database, `groceryList/${itemID}`);

    // Challenge: Use the remove function to remove the item from the database
    remove(exactLocationOfItemInDB);
  });

  groceryListEl.append(newEl);
}
