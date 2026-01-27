// Static weather values (matching the HTML content)
const temperature = 28; // Celsius
const windSpeed = 12; // km/h

// Function to calculate wind chill
function calculateWindChill(temp, wind) {
    // Wind chill formula for Celsius
    // Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// Check conditions and display wind chill
function displayWindChill() {
    const windchillElement = document.getElementById('windchill');

    // Check if conditions are viable for wind chill calculation
    // Metric: Temperature <= 10°C and Wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windchill = calculateWindChill(temperature, windSpeed);
        windchillElement.textContent = `${windchill.toFixed(1)}°C`;
    } else {
        windchillElement.textContent = 'N/A';
    }
}

// Display current year in footer
function displayCurrentYear() {
    const yearElement = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
}

// Display last modified date in footer
function displayLastModified() {
    const modifiedElement = document.getElementById('lastModified');
    const lastModified = document.lastModified;
    modifiedElement.textContent = lastModified;
}

// Run functions when page loads
displayWindChill();
displayCurrentYear();
displayLastModified();