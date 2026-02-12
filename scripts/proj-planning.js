// Trip planner state
let itinerary = [];

// Initialize planning page
document.addEventListener('DOMContentLoaded', () => {
    loadItinerary();
    initializeTripPlanner();
    initializeContactForm();
    displayItinerary();
});

/**
 * Load itinerary from localStorage
 */
function loadItinerary() {
    itinerary = getLocalStorage('victoriafalls-itinerary') || [];
}

/**
 * Save itinerary to localStorage
 */
function saveItinerary() {
    setLocalStorage('victoriafalls-itinerary', itinerary);
}

/**
 * Initialize trip planner form
 */
function initializeTripPlanner() {
    const tripForm = document.getElementById('trip-form');
    const clearButton = document.getElementById('clear-itinerary');

    if (tripForm) {
        tripForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addToItinerary();
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearItinerary);
    }
}

/**
 * Add activity to itinerary
 */
function addToItinerary() {
    const nameInput = document.getElementById('activity-name');
    const costInput = document.getElementById('activity-cost');
    const durationInput = document.getElementById('activity-duration');
    const notesInput = document.getElementById('activity-notes');

    // Validate inputs
    if (!nameInput.value.trim() || !costInput.value || !durationInput.value) {
        alert('Please fill in all required fields');
        return;
    }

    const newItem = {
        id: Date.now(),
        name: nameInput.value.trim(),
        cost: parseFloat(costInput.value),
        duration: durationInput.value,
        notes: notesInput.value.trim()
    };

    itinerary.push(newItem);
    saveItinerary();
    displayItinerary();

    // Reset form
    nameInput.value = '';
    costInput.value = '';
    durationInput.value = '';
    notesInput.value = '';

    // Show success feedback
    showFormFeedback('Activity added to your itinerary!');
}

/**
 * Display itinerary items
 */
function displayItinerary() {
    const itineraryList = document.getElementById('itinerary-list');
    const totalBudget = document.getElementById('total-budget');

    if (!itineraryList) return;

    if (itinerary.length === 0) {
        itineraryList.innerHTML = `<p class="empty-itinerary">Your itinerary is empty. Add activities to get started!</p>`;
        if (totalBudget) totalBudget.textContent = '$0.00';
        return;
    }

    itineraryList.innerHTML = itinerary.map(item => createItineraryItem(item)).join('');

    // Calculate and display total budget
    const total = calculateTotalBudget();
    if (totalBudget) totalBudget.textContent = `$${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    const removeButtons = itineraryList.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromItinerary(parseInt(btn.dataset.id));
        });
    });
}

/**
 * Create HTML for itinerary item
 * @param {Object} item - Itinerary item object
 * @returns {string} - HTML string for the item
 */
function createItineraryItem(item) {
    return `
        <div class="itinerary-item">
            <button class="remove-btn" data-id="${item.id}" aria-label="Remove from itinerary">×</button>
            <h4>${item.name}</h4>
            <div class="itinerary-details">
                <span>💰 $${item.cost.toFixed(2)}</span>
                <span>⏱️ ${item.duration}</span>
            </div>
            ${item.notes ? `<p class="itinerary-notes">Notes: ${item.notes}</p>` : ''}
        </div>
    `;
}

/**
 * Remove item from itinerary
 * @param {number} itemId - ID of the item to remove
 */
function removeFromItinerary(itemId) {
    itinerary = itinerary.filter(item => item.id !== itemId);
    saveItinerary();
    displayItinerary();
    showFormFeedback('Activity removed from itinerary');
}

/**
 * Clear entire itinerary
 */
function clearItinerary() {
    if (itinerary.length === 0) {
        return;
    }

    if (confirm('Are you sure you want to clear your entire itinerary?')) {
        itinerary = [];
        saveItinerary();
        displayItinerary();
        showFormFeedback('Itinerary cleared');
    }
}

/**
 * Calculate total budget from itinerary
 * @returns {number} - Total cost
 */
function calculateTotalBudget() {
    return itinerary.reduce((total, item) => total + item.cost, 0);
}

/**
 * Initialize contact form
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactSubmit();
        });
    }
}

/**
 * Handle contact form submission
 */
function handleContactSubmit() {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    // Validate form
    if (!nameInput.value.trim() || !emailInput.value.trim() ||
        !subjectInput.value || !messageInput.value.trim()) {
        alert('Please fill in all required fields');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        alert('Please enter a valid email address');
        return;
    }

    // Create contact data object
    const contactData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value,
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    };

    // In a real application, this would send the data to a server
    // For now, we'll just store it locally and show success message
    const contacts = getLocalStorage('victoriafalls-contacts') || [];
    contacts.push(contactData);
    setLocalStorage('victoriafalls-contacts', contacts);

    // Show success message
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Reset form
    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';

    // Scroll to success message
    if (successMessage) {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Show temporary feedback message
 * @param {string} message - Message to display
 */
function showFormFeedback(message) {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(feedback);

    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);