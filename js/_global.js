// --- Scroll Progress Indicator ---
function updateScrollIndicator() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (docHeight > 0) ? (scrollTop / docHeight) * 100 : 0;
    document.getElementById('scrollIndicator').style.width = scrollPercent + '%';
}

// --- Fade in animation on scroll (using Intersection Observer) ---
const fadeInElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Do not unobserve here if elements are reused or might fade back out
            // For one-time fade-in: observer.unobserve(entry.target);
        } else {
            // Optional: remove 'visible' class if element scrolls out of view
            // entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// --- Create floating particles ---
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 50; // Increased particle count
        particlesContainer.innerHTML = ''; // Clear existing particles

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// --- Smooth scrolling for anchor links ---
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for sticky header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Added extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Dynamic glow intensity based on scroll ---
function updateGlowIntensity() {
    const scrollMax = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = scrollMax > 0 ? window.pageYOffset / scrollMax : 0;
    const intensity = 1 + scrollRatio * 0.5; // Max 1.5 intensity
    document.documentElement.style.setProperty('--glow-intensity', intensity);
}

// --- Back to Top Button Logic ---
const backToTopBtn = document.getElementById("backToTopBtn");
if (backToTopBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// --- Parallax effect for hero background (more subtle) ---
function updateHeroParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        // Adjust multiplier for desired parallax effect
        heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
}

// --- Main Initialization Function ---
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initSmoothScrolling();

    // Initial check for fade-in elements
    fadeInElements.forEach(element => observer.observe(element));

    // Set up scroll event listeners for dynamic effects
    window.addEventListener('scroll', () => {
        updateScrollIndicator();
        updateGlowIntensity();
        updateHeroParallax();
    });

    // Trigger initial state for scroll-dependent elements
    updateScrollIndicator();
    updateGlowIntensity();
    updateHeroParallax();
});
