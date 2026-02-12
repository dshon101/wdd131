function updateReviewCounter() {
    let reviewCount = localStorage.getItem('reviewCount');

    if (reviewCount === null) {
        reviewCount = 0;
    } else {
        reviewCount = parseInt(reviewCount);
    }

    reviewCount++;

    localStorage.setItem('reviewCount', reviewCount);

    const counterElement = document.getElementById('review-count');
    if (counterElement) {
        counterElement.textContent = reviewCount;
    }
}

document.addEventListener('DOMContentLoaded', updateReviewCounter);