// Array of Temple Objects
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg"
  },
  {
    templeName: "Manila Philippines",
    location: "Quezon City, Metro Manila, Philippines",
    dedicated: "1984, September, 25",
    area: 26683,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manila-philippines/400x250/manila-philippines-temple-lds-129585-wallpaper.jpg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple-lds-83476-wallpaper.jpg"
  },
  {
    templeName: "Hong Kong China",
    location: "Kowloon Tong, Hong Kong",
    dedicated: "1996, May, 26",
    area: 21744,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/hong-kong-china/400x250/hong-kong-china-temple-lds-279625-wallpaper.jpg"
  }
];

// Function to create temple cards
function createTempleCard(temple) {
  const figure = document.createElement('figure');

  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = 'lazy';

  const figcaption = document.createElement('figcaption');
  figcaption.innerHTML = `
    <strong>${temple.templeName}</strong><br>
    Location: ${temple.location}<br>
    Dedicated: ${temple.dedicated}<br>
    Area: ${temple.area.toLocaleString()} sq ft
  `;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}

// Function to display temples
function displayTemples(templesToDisplay) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  templesToDisplay.forEach(temple => {
    const card = createTempleCard(temple);
    gallery.appendChild(card);
  });
}

// Filter functions
function filterOldTemples() {
  const oldTemples = temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year < 1900;
  });
  displayTemples(oldTemples);
}

function filterNewTemples() {
  const newTemples = temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year > 2000;
  });
  displayTemples(newTemples);
}

function filterLargeTemples() {
  const largeTemples = temples.filter(temple => temple.area > 90000);
  displayTemples(largeTemples);
}

function filterSmallTemples() {
  const smallTemples = temples.filter(temple => temple.area < 10000);
  displayTemples(smallTemples);
}

function showAllTemples() {
  displayTemples(temples);
}

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
    document.getElementById('hamburger').textContent = '☰';
  } else {
    menu.style.display = 'flex';
    document.getElementById('hamburger').textContent = '×';
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

// Event listeners for navigation
document.getElementById('home').addEventListener('click', (e) => {
  e.preventDefault();
  showAllTemples();
});

document.getElementById('old').addEventListener('click', (e) => {
  e.preventDefault();
  filterOldTemples();
});

document.getElementById('new').addEventListener('click', (e) => {
  e.preventDefault();
  filterNewTemples();
});

document.getElementById('large').addEventListener('click', (e) => {
  e.preventDefault();
  filterLargeTemples();
});

document.getElementById('small').addEventListener('click', (e) => {
  e.preventDefault();
  filterSmallTemples();
});

// Hamburger menu event listener
hamburger.addEventListener('click', toggleMenu);
window.addEventListener('resize', updateMenuDisplay);

// Initialize menu and display all temples on load
window.addEventListener('DOMContentLoaded', () => {
  updateMenuDisplay();
  showAllTemples();
});