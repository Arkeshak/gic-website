/**
 * swipe-nav.js
 * Handles horizontal swipe navigation between main pages of the GIC Website.
 */

document.addEventListener('DOMContentLoaded', () => {
    let touchstartX = 0;
    let touchendX = 0;
    let touchstartY = 0;
    let touchendY = 0;

    const minSwipeDistance = 100; // Minimum distance to be considered a swipe
    const maxVerticalVariance = 50; // Maximum vertical variance allowed for a horizontal swipe

    const pages = [
        'index.html',
        'faq.html',
        'complaints.html',
        'contact.html'
    ];

    // Get current page filename
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let currentIndex = pages.indexOf(currentPage);

    if (currentIndex === -1) currentIndex = 0;

    function handleGesture() {
        const deltaX = touchendX - touchstartX;
        const deltaY = Math.abs(touchendY - touchstartY);

        // Check if swipe is primarily horizontal
        if (Math.abs(deltaX) > minSwipeDistance && deltaY < maxVerticalVariance) {
            if (deltaX < 0) {
                // Swiped Left -> Go to Next Page
                if (currentIndex < pages.length - 1) {
                    window.location.href = pages[currentIndex + 1];
                }
            } else {
                // Swiped Right -> Go to Previous Page
                if (currentIndex > 0) {
                    window.location.href = pages[currentIndex - 1];
                }
            }
        }
    }

    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        handleGesture();
    }, { passive: true });
});
