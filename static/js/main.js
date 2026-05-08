// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-cyber-lime';
    document.body.className = savedTheme;
}

function setTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem('selectedTheme', themeName);
}

// Initialize theme on page load
initializeTheme();

// Theme switcher
document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        const theme = this.getAttribute('data-theme');
        setTheme(theme);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection animations for pre-marked elements
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -20px 0px'
};

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animate__animated');
        const hasFade = [...entry.target.classList].some(cls => cls.startsWith('animate__fadeIn'));
        if (!hasFade) {
            entry.target.classList.add('animate__fadeInUp');
        }
        obs.unobserve(entry.target);
    });
}, observerOptions);

document.querySelectorAll('.animate__animated').forEach(el => revealObserver.observe(el));

// Toggle project details
function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = 'Less';
    } else {
        details.style.display = 'none';
        button.textContent = 'More';
    }
}