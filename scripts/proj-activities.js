// Activities data
const activities = [
    {
        id: 1,
        name: "White Water Rafting",
        type: "adventure",
        price: "moderate",
        difficulty: "challenging",
        cost: 125,
        duration: "Full day",
        icon: "🚣",
        description: "Experience the thrill of navigating the mighty Zambezi River through Grade 5 rapids in the Batoka Gorge. One of the world's best rafting destinations."
    },
    {
        id: 2,
        name: "Devil's Pool Swim",
        type: "adventure",
        price: "premium",
        difficulty: "moderate",
        cost: 180,
        duration: "Half day",
        icon: "🏊",
        description: "Swim at the edge of Victoria Falls in this natural infinity pool during low water season (August-December). An unforgettable bucket list experience."
    },
    {
        id: 3,
        name: "Helicopter Flight",
        type: "scenic",
        price: "premium",
        difficulty: "easy",
        cost: 165,
        duration: "15 minutes",
        icon: "🚁",
        description: "Soar above the falls for breathtaking aerial views. See the full curtain of water and the Batoka Gorge from a unique perspective."
    },
    {
        id: 4,
        name: "Guided Falls Tour",
        type: "scenic",
        price: "budget",
        difficulty: "easy",
        cost: 30,
        duration: "2-3 hours",
        icon: "👣",
        description: "Walk along the rainforest paths with an expert guide who shares the history, geology, and wildlife of Victoria Falls. Entry fee and guide included."
    },
    {
        id: 5,
        name: "Sunset River Cruise",
        type: "scenic",
        price: "moderate",
        difficulty: "easy",
        cost: 65,
        duration: "2-3 hours",
        icon: "⛵",
        description: "Enjoy a peaceful cruise on the Zambezi River with drinks and snacks while watching hippos, elephants, and a stunning African sunset."
    },
    {
        id: 6,
        name: "Bungee Jumping",
        type: "adventure",
        price: "moderate",
        difficulty: "challenging",
        cost: 160,
        duration: "2-3 hours",
        icon: "🪂",
        description: "Take a 111-meter plunge from the Victoria Falls Bridge. One of the highest commercial bungee jumps in the world with spectacular views."
    },
    {
        id: 7,
        name: "Mosi-oa-Tunya National Park Safari",
        type: "wildlife",
        price: "moderate",
        difficulty: "easy",
        cost: 85,
        duration: "Half day",
        icon: "🦏",
        description: "Guided game drive in the national park to see white rhinos, elephants, giraffes, zebras, and various antelope species in their natural habitat."
    },
    {
        id: 8,
        name: "Village Cultural Tour",
        type: "cultural",
        price: "budget",
        difficulty: "easy",
        cost: 45,
        duration: "Half day",
        icon: "🏘️",
        description: "Visit a traditional Zambian village to learn about local customs, traditional crafts, and daily life. Meet locals and support community tourism."
    },
    {
        id: 9,
        name: "Livingstone Island Tour",
        type: "scenic",
        price: "moderate",
        difficulty: "moderate",
        cost: 95,
        duration: "Half day",
        icon: "🏝️",
        description: "Visit the historic island in the middle of the falls where David Livingstone first viewed the falls. Includes brunch and stunning photo opportunities."
    },
    {
        id: 10,
        name: "Zip Lining",
        type: "adventure",
        price: "budget",
        difficulty: "moderate",
        cost: 70,
        duration: "2-3 hours",
        icon: "🪁",
        description: "Fly across the Batoka Gorge on multiple zip lines with incredible views of the falls and river below. Perfect for adventure seekers."
    },
    {
        id: 11,
        name: "Chobe Day Trip",
        type: "wildlife",
        price: "premium",
        difficulty: "easy",
        cost: 210,
        duration: "Full day",
        icon: "🐘",
        description: "Full-day safari to Chobe National Park in Botswana including game drive, river cruise, and lunch. See massive elephant herds and diverse wildlife."
    },
    {
        id: 12,
        name: "Mukuni Village Experience",
        type: "cultural",
        price: "budget",
        difficulty: "easy",
        cost: 35,
        duration: "2-3 hours",
        icon: "🎭",
        description: "Explore the historic Mukuni village with a local guide. Learn about Leya traditions, see traditional dancing, and visit the local market."
    }
];

// State management
let currentFilters = {
    type: 'all',
    price: 'all',
    difficulty: 'all'
};

let favorites = [];

// Initialize activities page
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    displayActivities(activities);
    initializeFilters();
    displayFavorites();
});

/**
 * Load favorites from localStorage
 */
function loadFavorites() {
    favorites = getLocalStorage('victoriafalls-favorites') || [];
}

/**
 * Save favorites to localStorage
 */
function saveFavorites() {
    setLocalStorage('victoriafalls-favorites', favorites);
}

/**
 * Display activities in the grid
 * @param {Array} activitiesToDisplay - Array of activity objects to display
 */
function displayActivities(activitiesToDisplay) {
    const grid = document.getElementById('activities-grid');
    const noResults = document.getElementById('no-results');

    if (!grid) return;

    if (activitiesToDisplay.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (noResults) noResults.style.display = 'none';

    grid.innerHTML = activitiesToDisplay.map(activity => createActivityCard(activity)).join('');

    // Add event listeners to favorite buttons
    const favoriteButtons = grid.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.dataset.id));
        });
    });
}

/**
 * Create HTML for an activity card
 * @param {Object} activity - Activity object
 * @returns {string} - HTML string for the activity card
 */
function createActivityCard(activity) {
    const isFavorited = favorites.includes(activity.id);

    return `
        <div class="activity-card" data-type="${activity.type}" data-price="${activity.price}" data-difficulty="${activity.difficulty}">
            <div class="activity-image">
                ${activity.icon}
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
                        data-id="${activity.id}"
                        aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFavorited ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="activity-content">
                <span class="activity-type">${activity.type}</span>
                <h3>${activity.name}</h3>
                <p>${activity.description}</p>
                <div class="activity-details">
                    <span class="detail-item">
                        <span class="detail-icon">💰</span>
                        $${activity.cost}
                    </span>
                    <span class="detail-item">
                        <span class="detail-icon">⏱️</span>
                        ${activity.duration}
                    </span>
                    <span class="detail-item">
                        <span class="detail-icon">📊</span>
                        ${capitalizeFirst(activity.difficulty)}
                    </span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Initialize filter controls
 */
function initializeFilters() {
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const resetButton = document.getElementById('reset-filters');

    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            currentFilters.type = e.target.value;
            filterActivities();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            currentFilters.price = e.target.value;
            filterActivities();
        });
    }

    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', (e) => {
            currentFilters.difficulty = e.target.value;
            filterActivities();
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetFilters);
    }
}

/**
 * Filter activities based on current filter settings
 */
function filterActivities() {
    let filtered = activities;

    if (currentFilters.type !== 'all') {
        filtered = filtered.filter(activity => activity.type === currentFilters.type);
    }

    if (currentFilters.price !== 'all') {
        filtered = filtered.filter(activity => activity.price === currentFilters.price);
    }

    if (currentFilters.difficulty !== 'all') {
        filtered = filtered.filter(activity => activity.difficulty === currentFilters.difficulty);
    }

    displayActivities(filtered);
}

/**
 * Reset all filters to default
 */
function resetFilters() {
    currentFilters = {
        type: 'all',
        price: 'all',
        difficulty: 'all'
    };

    document.getElementById('type-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('difficulty-filter').value = 'all';

    displayActivities(activities);
}

/**
 * Toggle favorite status of an activity
 * @param {number} activityId - ID of the activity
 */
function toggleFavorite(activityId) {
    const index = favorites.indexOf(activityId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(activityId);
    }

    saveFavorites();

    // Update the display
    const currentDisplay = activities.filter(activity => {
        const typeMatch = currentFilters.type === 'all' || activity.type === currentFilters.type;
        const priceMatch = currentFilters.price === 'all' || activity.price === currentFilters.price;
        const difficultyMatch = currentFilters.difficulty === 'all' || activity.difficulty === currentFilters.difficulty;
        return typeMatch && priceMatch && difficultyMatch;
    });

    displayActivities(currentDisplay);
    displayFavorites();
}

/**
 * Display favorite activities
 */
function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');

    if (!favoritesList) return;

    if (favorites.length === 0) {
        favoritesList.innerHTML = `<p class="empty-favorites">You haven't saved any activities yet. Click the heart icon on activities to add them here!</p>`;
        return;
    }

    const favoriteActivities = activities.filter(activity => favorites.includes(activity.id));

    favoritesList.innerHTML = favoriteActivities.map(activity => `
        <div class="activity-card">
            <div class="activity-image">
                ${activity.icon}
            </div>
            <div class="activity-content">
                <span class="activity-type">${activity.type}</span>
                <h3>${activity.name}</h3>
                <div class="activity-details">
                    <span class="detail-item">
                        <span class="detail-icon">💰</span>
                        $${activity.cost}
                    </span>
                    <span class="detail-item">
                        <span class="detail-icon">⏱️</span>
                        ${activity.duration}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}