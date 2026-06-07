// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-cyber-blue';
    const savedMode = localStorage.getItem('selectedMode') || 'dark';
    
    document.documentElement.setAttribute('data-mode', savedMode);
    document.body.className = savedTheme;
    
    updateThemeIcon(savedMode);
    updateTheme();
}

function setTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem('selectedTheme', themeName);
    updateTheme();
}

function toggleThemeMode() {
    const currentMode = document.documentElement.getAttribute('data-mode') || 'dark';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-mode', newMode);
    localStorage.setItem('selectedMode', newMode);
    
    updateThemeIcon(newMode);
    updateTheme();
}

function updateThemeIcon(mode) {
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) {
        icon.className = mode === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

function updateTheme() {
    const theme = document.body.className;
    const mode = document.documentElement.getAttribute('data-mode') || 'dark';
    
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--accent-soft');

    let rgbaSoft = 'rgba(215, 255, 63, 0.16)';

    if (theme === 'theme-dynamic' && window.dynamicThemeColors) {
        document.documentElement.style.setProperty('--accent', window.dynamicThemeColors.rgb);
        document.documentElement.style.setProperty('--accent-soft', window.dynamicThemeColors.rgba);
        rgbaSoft = window.dynamicThemeColors.rgba;
    } else if (theme === 'theme-cyber-blue') {
        rgbaSoft = 'rgba(0, 217, 255, 0.16)';
    } else if (theme === 'theme-cyber-pink') {
        rgbaSoft = 'rgba(255, 0, 110, 0.16)';
    } else if (theme === 'theme-cyber-green') {
        rgbaSoft = 'rgba(57, 255, 20, 0.16)';
    } else if (theme === 'theme-cyber-yellow') {
        rgbaSoft = 'rgba(255, 255, 0, 0.16)';
    }

    if (mode === 'light') {
        document.body.style.background = 'var(--bg)';
    } else {
        document.body.style.background = `radial-gradient(circle at 10% 10%, ${rgbaSoft}, transparent 16%), radial-gradient(circle at 80% 18%, ${rgbaSoft}, transparent 16%), linear-gradient(180deg, #05080f 0%, #09111e 100%)`;
    }
    
    document.body.style.backgroundAttachment = 'fixed';
}

// Initialize theme
initializeTheme();
// Hamburger Menu - Override Bootstrap's default behavior
document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');
    
    if (toggler && collapse) {
        // Prevent Bootstrap's default collapse behavior
        toggler.removeAttribute('data-bs-toggle');
        toggler.removeAttribute('data-bs-target');
        
        // Custom toggle handler
        toggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            collapse.classList.toggle('show');
        });
        
        // Close menu when clicking on the overlay (pseudo-element)
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.site-nav') && collapse.classList.contains('show')) {
                collapse.classList.remove('show');
            }
        });
        
        // Close menu when a link is clicked
        const navLinks = collapse.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Close for all links
                collapse.classList.remove('show');
            });
        });
        
        // Prevent event bubbling when clicking inside menu
        collapse.addEventListener('click', function(e) {
            if (e.target === collapse) {
                collapse.classList.remove('show');
            }
        });
    }
});

// Theme switcher
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleThemeMode();
        });
    }

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
        });
    });
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('theme-option')) {
        e.preventDefault();
        e.stopPropagation();
        const theme = e.target.getAttribute('data-theme');
        setTheme(theme);
    }
});

// Lenis Smooth Scroll Setup
let lenis;
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical'
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// GSAP Animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Prepare Hero text reveal (Split characters into spans for cool effect)
    const heroTitle = document.querySelector('.hero-copy h1');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.innerHTML = '';
        const words = text.split(' ');
        words.forEach((word, wordIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            
            word.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.classList.add('hero-char');
                wordSpan.appendChild(charSpan);
            });
            
            heroTitle.appendChild(wordSpan);
            if (wordIdx < words.length - 1) {
                const space = document.createTextNode(' ');
                heroTitle.appendChild(space);
            }
        });
    }

    // 1. Hero Reveal Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    if (document.querySelector('.hero-section')) {
        gsap.set('.hero-visual .portrait-card', { scale: 0.85, opacity: 0 });
        gsap.set('.hero-copy .eyebrow-text', { y: 40, opacity: 0 });
        gsap.set('.hero-char', { y: '120%', opacity: 0, rotate: 12 });
        gsap.set('.hero-copy__text', { y: 40, opacity: 0 });
        gsap.set('.hero-actions', { y: 30, opacity: 0 });

        heroTl.to('.hero-visual .portrait-card', {
            scale: 1,
            opacity: 1,
            duration: 1.6
        })
        .to('.hero-copy .eyebrow-text', {
            y: 0,
            opacity: 1
        }, '-=1.2')
        .to('.hero-char', {
            y: 0,
            opacity: 1,
            rotate: 0,
            stagger: 0.025,
            duration: 0.8,
            ease: 'back.out(1.6)'
        }, '-=1.0')
        .to('.hero-copy__text', {
            y: 0,
            opacity: 1
        }, '-=0.6')
        .to('.hero-actions', {
            y: 0,
            opacity: 1
        }, '-=0.4');
    }

    // 2. Scroll-triggered elements (fade in & scale project/blog/contact cards)
    const fadeUpElements = document.querySelectorAll('.project-card, .project-card-horizontal, .blog-card, .contact-card, .glass-card, .section-header');
    fadeUpElements.forEach((el) => {
        el.style.animationPlayState = 'running';
        
        gsap.fromTo(el, 
            { y: 50, opacity: 0, scale: 0.96 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // 3. Magnetic Buttons effect
    const magneticElements = document.querySelectorAll('.btn-cta, .social-link, .nav-brand, .contact-link, .btn-more');
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.38,
                y: y * 0.38,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1.1, 0.4)'
            });
        });
    });

    // 4. Animated Stats / Skill Counters (KPIs)
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: statsGrid,
                start: 'top 90%'
            },
            scale: 0.7,
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 1,
            ease: 'back.out(1.5)'
        });
    }

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card) => {
        const valueEl = card.querySelector('.stat-value');
        if (!valueEl) return;
        
        const rawText = valueEl.textContent.trim();
        const numberVal = parseFloat(rawText);
        const suffix = rawText.replace(/[0-9.]/g, '');
        
        if (!isNaN(numberVal)) {
            const obj = { val: 0 };
            gsap.to(obj, {
                val: numberVal,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 92%'
                },
                onUpdate: () => {
                    if (Number.isInteger(numberVal)) {
                        valueEl.textContent = Math.floor(obj.val) + suffix;
                    } else {
                        valueEl.textContent = obj.val.toFixed(1) + suffix;
                    }
                }
            });

            // Pulse number scale during dynamic counting
            gsap.fromTo(valueEl, 
                { scale: 0.85 },
                {
                    scale: 1.15,
                    yoyo: true,
                    repeat: 1,
                    duration: 0.4,
                    ease: 'power1.inOut',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 92%'
                    }
                }
            );
        }

        // Add 3D card tilt hover animation
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(card, {
                rotateY: x * 0.18,
                rotateX: -y * 0.18,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 600
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // 5. Technical Skills lists staggered reveal
    const skillsLists = document.querySelectorAll('.skills-list');
    skillsLists.forEach((list) => {
        const items = list.querySelectorAll('li');
        gsap.from(items, {
            scrollTrigger: {
                trigger: list,
                start: 'top 90%'
            },
            opacity: 0,
            x: -25,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // 6. SVG Path Scroll-Drawing
    const path = document.querySelector('#scrollPath');
    if (path) {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.4
            }
        });
    }

    // 7. Smooth Section Transitions (fade/scale effect as sections enter/exit)
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        if (section.id === 'home') return;
        
        gsap.fromTo(section,
            { opacity: 0.4, y: 30 },
            {
                opacity: 1,
                y: 0,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 95%',
                    end: 'top 60%',
                    scrub: 0.5
                }
            }
        );
    });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initGSAPAnimations();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.site-nav');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links using Lenis
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            if (lenis) {
                lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });
});

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

// ColorThief Integration
function extractThemeFromImage() {
    const img = document.querySelector('.portrait-image');
    if (img) {
        img.crossOrigin = "Anonymous";
        if (img.complete) {
            applyColorThief(img);
        } else {
            img.addEventListener('load', function() {
                applyColorThief(img);
            });
        }
    }
}

function applyColorThief(img) {
    try {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        if (color) {
            const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            const rgbaSoft = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.16)`;
            
            window.dynamicThemeColors = { rgb: rgbColor, rgba: rgbaSoft };
            document.documentElement.style.setProperty('--accent', rgbColor);
            document.documentElement.style.setProperty('--accent-soft', rgbaSoft);
            
            updateTheme();
        }
    } catch(e) {
        console.log("Could not extract color from image: ", e);
    }
}

document.addEventListener('DOMContentLoaded', extractThemeFromImage);