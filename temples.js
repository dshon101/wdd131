// Set current year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = lastModified.toLocaleString();

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

function toggleMenu() {
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  }
}

// Show hamburger button only on small screens
function updateMenuDisplay() {
  if (window.innerWidth < 768) {
    document.getElementById('hamburger').style.display = 'block';
    menu.style.display = 'none'; 
  } else {
    document.getElementById('hamburger').style.display = 'none';
    menu.style.display = 'flex'; 
  }
}

// Show the X when the user wanna collapse the menu
function toggleMenu() {
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
    // Show hamburger icon
    document.getElementById('hamburger').textContent = '☰'; // Hamburger icon
  } else {
    menu.style.display = 'flex';
    // Show close "X" icon
    document.getElementById('hamburger').textContent = '×'; // X icon
  }
}


// Event listeners
hamburger.addEventListener('click', toggleMenu);
window.addEventListener('resize', updateMenuDisplay);

// Initialize menu on load
window.addEventListener('DOMContentLoaded', updateMenuDisplay);