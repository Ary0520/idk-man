
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    // Function to open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.classList.add('opacity-50');
        mobileMenuOverlay.classList.remove('pointer-events-none');
        document.body.classList.add('overflow-hidden');
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.remove('opacity-50');
        mobileMenuOverlay.classList.add('pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    }

    // Add click event listeners
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);




    