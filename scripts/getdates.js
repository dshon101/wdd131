// Shows the current years 
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
  const currentYear = new Date().getFullYear();
  currentYearSpan.textContent = currentYear;
}

// Showing the last mpdified date
const lastModifiedPara = document.getElementById('lastModified');
if (lastModifiedPara) {
  lastModifiedPara.textContent = `Last updated: ${document.lastModified}`;
}