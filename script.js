//search icon expanding functionality
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

// console.log("js loaded successfully");

//expand search when clicking the icon
searchIcon.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevents immediate collapse
  searchContainer.classList.toggle('active');


  if (searchContainer.classList.contains('active')) {
    searchInput.focus();
  }
});


//collapse search when clicking outside
document.addEventListener('click', (event) => {
  if (!searchContainer.contains(event.target)) {
    searchContainer.classList.remove('active');
  }
  
});

//collapse when pressing ESC
searchInput.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    searchContainer.classList.remove('active');

  }
  
});

// Searching Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const searchResults = document.getElementById("search-results");
  const dishes = document.querySelectorAll(".indi-dish");

  //function to filter dishes
  searchInput.addEventListener("input", function () {
    let query =searchInput.value.toLowerCase();
    searchResults.innerHTML = ""; // clear previous suggestions

    if (query.trim() === "") return; //Exit if empty

    dishes.forEach(dish => {
      let dishName = dish.dataset.name.toLowerCase();
      if (dishName.includes(query)){
        let suggestion = document.createElement("div");
        suggestion.classList.add("suggestion-item");
        suggestion.textContent = dish.dataset.name;

        //click event to jump to dish
        suggestion.addEventListener("click", function (){
          dish.scrollIntoView({behavior: "smooth", block: "start"});
          searchInput.value = ""; //clear input after selection
          searchResults.innerHTML = ""; //clear suugestion
        });

        searchResults.appendChild(suggestion);
      }
    });

  });
});

// order-now button functionality

document.getElementById("order").addEventListener("click", function(){
  placeOrder("Fried Chicken", 4025, 1 );

});

//add to cart(for all dishes) functionality
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function () {
    const dishElement = this.closest(".indi-dish");
    const name = dishElement.getAttribute("data-name");
    const price = parseFloat(dishElement.getAttribute("data-price"));
    placeOrder(name, price, 1);
  });
});

//placeOrder function to send order to json server

function placeOrder(dishName, price, quantity){
  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name: dishName, price: price, quantity: quantity})
  })
  .then(response => response.json())
  .then(data => console.log("Order added:", data))
  .catch(error => console.log("Error:", error));
}

// //function to fetch orders from json

// function fetchOrders(){
//   fetch("http://localhost:3000/orders", {
//     method: "Get",
//   })
// .then(response => response.json())
// .then(data => console.log("Orders fetched:", data))
// .catch(error => console.log("Error:", error))
  
// }

//function that fetches orders using method when page loads and passes render Orders function to show them on the cart container
function fetchOrders(){
  fetch("http://localhost:3000/orders", {
    method: "Get",
  })
  .then(response => response.json())
  .then(data => {
    console.log("Orders fetched:", data);
    renderOrders(data); // This shows the orders on the page
  })
  .catch(error => console.error ("Error fetching orders:", error));
}

//function to receive the array of orders

function renderOrders(data){
  const cartContainer = document.querySelector(".cart-item");
  cartContainer.innerHTML = "";

  data.forEach(order => {
    //create a container for each ordered dish
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order-entry");

    //Dish Name
    const name = document.createElement("p");
    name.textContent = order.name;

    //Quantity
    const quantity = document.createElement("p");
    quantity.textContent = `Quantity: ${order.quantity}`

    //price
    const price =document.createElement("p");
    price.textContent = `ksh${order.price}`;

    //Buttons
    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.classList.add("increase");

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.classList.add("decrease");

    const deleteBtn = document.createElement("buttton");
    deleteBtn.textContent = "remove";
    deleteBtn.classList.add("delete");

    //appending them all to itemDiv
    itemDiv.appendChild(name);
    itemDiv.appendChild(quantity);
    itemDiv.appendChild(price);
    itemDiv.appendChild(increaseBtn);
    itemDiv.appendChild(decreaseBtn);
    itemDiv.appendChild(deleteBtn);

    // Append itemDiv to the cart container
    cartContainer.appendChild(itemDiv);
    
  });
}



//make it auto-run when the page loads
document.addEventListener("DOMContentLoaded", fetchOrders);








//Adding event listeners to the cart container

const cartContainer = document.querySelector('.cart-item');
cartContainer.addEventListener('click', function(event){
  //Determine which button was clicked and call the appropriate function
})

// use event.target to identify the clicked element
// Handle button clicks- check the class of the clicked elememt and call the corresponding function

cartContainer.addEventListener('click', function(event){
  const target = event.target;
  const itemDiv = target.closest('.order-entry');
  const dishName = itemDiv.querySelector('.dish-name').textContent;

  if(target.classList.contains('increase')) {
    increaseQuantity(dishName);
  }else if (target.classList.contains('decrease')){
    decreaseQuantity(dishName);
  }else if (target.classList.contains('delete')){
    removeDish(dishName)
  }

})


// Define increasing dish, Decreasing dish and remove dish functions

function increaseQuantity(dishName) {
  // Fetch current orders
  fetch("http://localhost:3000/orders")
    .then(response => response.json())
    .then(orders => {
      const order = orders.find(order => order.name === dishName);
      if (order) {
        // Update the quantity
        order.quantity++;
        // Send the updated order to the server
        updateOrder(order);
      }
    })
    .catch(error => console.error("Error:", error));
}

function decreaseQuantity(dishName){
  fetch("http://localhost:3000/orders")
  .then(orders => {
    const order = orders.find(order => order.name ===dishName);
    if (order && order.quantity > 1) {
      order.quantity --;
      updateOrder(order);
    }

  })
  .catch(error => console.log("error:", error));
}

function removeDish(dishName) {
  fetch("http://localhost:3000/orders")
    .then(response => response.json())
    .then(orders => {
      const order = orders.find(order => order.name === dishName);
      if (order) {
        // Send a DELETE request to remove the order
        fetch(`http://localhost:3000/orders/${order.id}`, {
          method: 'DELETE',
        })
        .then(() => {
          // Re-render the cart
          fetchOrders();
        })
        .catch(error => console.error("Error:", error));
      }
    })
    .catch(error => console.error("Error:", error));
}

function updateOrder(dishName){
  fetch("http://localhost:3000/orders", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(order),
  })
  .then(() => {
    //Re-render the cart
    fetchOrders();
  })
  .catch(error => console.log("Error:", error));
  

}
