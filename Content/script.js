// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Animated entrance for news items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.news-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// Dynamic navigation bar
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌓';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Function to load HTML content
async function loadHTML(url, elementId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading ' + url + ': ' + error);
    }
}

// Load header and footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHTML('header.html', 'header-placeholder').then(() => {
        // Variables
        let lastScroll = 0;
        const nav = document.querySelector('nav');
        
        // Add initial class
        nav.classList.add('nav-show');
        
        // Scroll event listener
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Determine scroll direction and distance
            if (currentScroll <= 0) {
                nav.classList.remove('nav-hide');
                nav.classList.add('nav-show');
            } else if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down & past threshold
                nav.classList.remove('nav-show');
                nav.classList.add('nav-hide');
            } else if (currentScroll < lastScroll) {
                // Scrolling up
                nav.classList.remove('nav-hide');
                nav.classList.add('nav-show');
            }
            
            lastScroll = currentScroll;
        });
    });
    
    loadHTML('footer.html', 'footer-placeholder');
});