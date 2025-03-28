
const blurOverlay = document.getElementById('blur-overlay');
    
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        blurOverlay.classList.remove('hidden');
    } else {
        blurOverlay.classList.add('hidden');
    }
});

const mainNav = document.getElementById('mainNav');
const navButton = mainNav.querySelector('button.hidden.lg\\:block'); // Gets the "Get It Now" button

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
            // Changes button to primary color
        navButton.classList.remove('border-white', 'text-white', 'hover:bg-white');
        navButton.classList.add('border-primary', 'text-primary', 'hover:bg-primary', 'hover:text-white');
    } else {
            // Reverts button to white
        navButton.classList.add('border-white', 'text-white', 'hover:bg-white');
        navButton.classList.remove('border-primary', 'text-primary', 'hover:bg-primary','hover:text-white');
    }
});






