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



