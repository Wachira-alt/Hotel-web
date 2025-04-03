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


