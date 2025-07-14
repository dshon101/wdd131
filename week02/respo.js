// Select the button and menu list
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// Add click event to toggle menu
menuToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});