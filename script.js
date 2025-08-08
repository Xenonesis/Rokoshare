// Enhanced Mobile menu toggle with animations
document.addEventListener('DOMContentLoaded', function() {
    // Preload critical images with better error handling
    const criticalImages = [
        'images/ROKOSHARE.png',
        'images/rokoposter.jpg',
        'images/bellicon.png'
    ];
    
    let loadedImages = 0;
    const totalImages = criticalImages.length;
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.onload = function() {
            loadedImages++;
            console.log(`✓ Preloaded: ${src} (${loadedImages}/${totalImages})`);
            if (loadedImages === totalImages) {
                console.log('✅ All critical images preloaded successfully');
                document.body.classList.add('images-ready');
            }
        };
        img.onerror = function() {
            loadedImages++;
            console.warn(`❌ Failed to preload: ${src}`);
            if (loadedImages === totalImages) {
                console.log('⚠️ Image preloading completed with some failures');
                document.body.classList.add('images-ready');
            }
        };
        img.src = src;
    });
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Handle route links to show "Coming Soon" message
    const routeLinks = document.querySelectorAll('a[href="#"]');
    routeLinks.forEach(link => {
        // Check if the link is for routes (has "route" in text or href)
        const isRouteLink = link.textContent.toLowerCase().includes('route') || 
                           link.getAttribute('href') === '#';
        
        if (isRouteLink) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Coming Soon! This feature will be available when the app launches.', 'info');
            });
        }
    });
    
    // Handle all navigation links that might be for routes
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'Routes') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Coming Soon! This feature will be available when the app launches.', 'info');
            });
        }
    });
    
    // Handle mobile menu route links
    const mobileRouteLinks = document.querySelectorAll('.mobile-nav-item');
    mobileRouteLinks.forEach(link => {
        if (link.textContent.trim().includes('Route')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Coming Soon! This feature will be available when the app launches.', 'info');
            });
        }
    });
    
    // Handle dropdown route links
    const dropdownRouteLinks = document.querySelectorAll('.dropdown-content a');
    dropdownRouteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Coming Soon! This feature will be available when the app launches.', 'info');
        });
    });
    
    // Handle mobile routes dropdown
    const mobileRoutesButton = document.querySelector('.mobile-nav-item .fa-chevron-down');
    if (mobileRoutesButton) {
        mobileRoutesButton.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Coming Soon! This feature will be available when the app launches.', 'info');
        });
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // New Modern Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                // Close menu
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                // Open menu
                mobileNav.classList.add('active');
                mobileMenuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close mobile menu when clicking on nav items
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024 && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Search box toggle
    const searchBoxes = document.querySelectorAll('.search-box');
    searchBoxes.forEach(searchBox => {
        searchBox.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Close search box when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target) && searchBox.classList.contains('active')) {
                searchBox.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('backdrop-blur-lg', 'bg-opacity-90', 'shadow-lg');
            } else {
                navbar.classList.remove('backdrop-blur-lg', 'bg-opacity-90', 'shadow-lg');
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate newsletter signup
            showNotification('Thank you! You\'ll be notified when RokoShare launches.', 'success');
            newsletterForm.reset();
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" (no target element)
            if (href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for images with error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Handle image loading errors with better fallbacks
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            
            // Special handling for RokoShare logo
            if (this.alt === 'RokoShare' || this.src.includes('ROKOSHARE')) {
                // Create a styled fallback logo
                this.style.display = 'none';
                const fallback = document.createElement('div');
                const size = this.classList.contains('h-8') ? 'w-8 h-8 text-sm' : 
                           this.classList.contains('h-12') ? 'w-12 h-12 text-lg' : 
                           this.classList.contains('h-14') ? 'w-14 h-14 text-xl' :
                           this.classList.contains('h-20') ? 'w-20 h-20 text-2xl' : 'w-12 h-12 text-lg';
                
                fallback.className = `${size} bg-gradient-to-br from-roko-teal to-roko-orange rounded-xl flex items-center justify-center text-white font-bold transition-all duration-300 hover:scale-110 hover:rotate-12`;
                fallback.textContent = 'RS';
                fallback.title = 'RokoShare';
                this.parentNode.insertBefore(fallback, this);
            }
            // Handle bell icon
            else if (this.alt === 'Bell' || this.src.includes('bellicon')) {
                this.style.display = 'none';
                const fallback = document.createElement('i');
                fallback.className = 'fas fa-bell text-white animate-bounce-slow';
                fallback.style.fontSize = this.classList.contains('w-6') ? '1.5rem' : '1.75rem';
                this.parentNode.insertBefore(fallback, this);
            }
            // Handle other images with generic fallback
            else {
                this.style.opacity = '0.5';
                this.style.background = 'linear-gradient(45deg, #f3f4f6, #e5e7eb)';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.innerHTML = '<i class="fas fa-image text-gray-400"></i>';
            }
        });
    });

    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.shadow-lg');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// FAQ toggle functionality
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.textContent = '-';
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.shadow-lg, .bg-white');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    /* Logo specific styles for better loading */
    img[alt="RokoShare"] {
        background: linear-gradient(45deg, #4FD1C7, #F39C12);
        border-radius: 12px;
        padding: 2px;
    }
    
    /* Fallback logo styles */
    .logo-fallback {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #4FD1C7, #F39C12);
        color: white;
        font-weight: bold;
        border-radius: 12px;
        transition: all 0.3s ease;
    }
    
    .logo-fallback:hover {
        transform: scale(1.1) rotate(12deg);
    }
    
    .faq-icon {
        transition: transform 0.3s ease;
    }
    
    .notification {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Add loading state for buttons
function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.classList.add('opacity-75', 'cursor-not-allowed');
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
    };
}

// Simulate app launch countdown (optional feature)
function updateCountdown() {
    // This is a placeholder for a potential countdown feature
    const launchDate = new Date('2024-12-31T00:00:00');
    const now = new Date();
    const timeDiff = launchDate - now;
    
    if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        const countdownElements = document.querySelectorAll('.countdown');
        countdownElements.forEach(element => {
            element.textContent = `Launching in ${days}d ${hours}h ${minutes}m`;
        });
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown(); // Initial call

// Advanced Features and Animations

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Typing animation effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter-item [data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Particle animation for hero section
function createParticles() {
    const heroSection = document.querySelector('section');
    if (!heroSection) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        heroSection.appendChild(particle);
    }
}

// Smooth reveal animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// Enhanced form interactions
function enhanceFormInteractions() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Floating label effect
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            if (label && label.tagName === 'LABEL') {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = '#4FD1C7';
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
                if (label && label.tagName === 'LABEL') {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '';
                }
            }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            validateField(input);
        });
    });
}

// Field validation with visual feedback
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    
    // Remove existing validation classes
    field.classList.remove('valid', 'invalid');
    
    // Validation logic
    switch (type) {
        case 'email':
            isValid = isValidEmail(value);
            break;
        case 'tel':
            isValid = /^[\+]?[1-9][\d]{0,15}$/.test(value);
            break;
        default:
            isValid = value.length > 0;
    }
    
    // Apply validation classes
    if (value.length > 0) {
        field.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    return isValid;
}

// Advanced button interactions
function enhanceButtons() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Magnetic cursor effect for interactive elements
function initMagneticCursor() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize advanced features
    setTimeout(() => {
        initParallax();
        animateCounters();
        createParticles();
        initRevealAnimations();
        enhanceFormInteractions();
        enhanceButtons();
        initMagneticCursor();
    }, 1000);
    
    // Add nav link active states
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click event to change color to pink
        link.addEventListener('click', function(e) {
            // Remove pink color from all links
            navLinks.forEach(l => {
                l.classList.remove('text-pink-500');
                l.classList.add('text-black');
            });
            
            // Add pink color to clicked link
            this.classList.remove('text-black');
            this.classList.add('text-pink-500');
        });
    });
    
    // Handle mobile nav items
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove pink color from all mobile items
            mobileNavItems.forEach(i => {
                i.classList.remove('text-pink-500');
                i.classList.add('text-gray-700');
            });
            
            // Add pink color to clicked item
            this.classList.remove('text-gray-700');
            this.classList.add('text-pink-500');
        });
    });
});

// Add enhanced CSS animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    /* Enhanced animations and effects */
    .nav-link::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: #F7DC6F;
        transition: width 0.3s ease;
    }
    
    .nav-link:hover::after,
    .nav-link.active::after {
        width: 100%;
    }
    
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .valid {
        border-color: #10B981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
    }
    
    .invalid {
        border-color: #EF4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes particle-float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-30px) rotate(120deg); }
        66% { transform: translateY(30px) rotate(240deg); }
    }
    
    .particle {
        animation: particle-float 6s ease-in-out infinite !important;
    }
    
    .magnetic {
        transition: transform 0.3s ease;
    }
    
    /* Glassmorphism effects */
    .glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Gradient text effects */
    .gradient-text {
        background: linear-gradient(45deg, #4FD1C7, #F39C12);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    /* Enhanced shadows */
    .shadow-glow {
        box-shadow: 0 0 30px rgba(79, 209, 199, 0.3);
    }
    
    .shadow-glow-orange {
        box-shadow: 0 0 30px rgba(243, 156, 18, 0.3);
    }
    
    /* Image loading states */
    .images-ready img {
        opacity: 1;
    }
    
    body:not(.images-ready) img {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    /* Improved image fallbacks */
    .image-fallback {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #4FD1C7, #F39C12);
        color: white;
        font-weight: bold;
        border-radius: 12px;
        transition: all 0.3s ease;
    }
    
    .image-fallback:hover {
        transform: scale(1.05);
    }
    
    /* Smooth image transitions */
    img {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    img:hover {
        transform: scale(1.02);
    }
    
    /* Loading spinner for images */
    .image-loading {
        position: relative;
    }
    
    .image-loading::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #4FD1C7;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }ge {
        box-shadow: 0 0 30px rgba(243, 156, 18, 0.3);
    }
    
    /* Image loading states */
    .images-ready img {
        opacity: 1;
    }
    
    body:not(.images-ready) img {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    /* Improved image fallbacks */
    .image-fallback {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #4FD1C7, #F39C12);
        color: white;
        font-weight: bold;
        border-radius: 12px;
        transition: all 0.3s ease;
    }
    
    .image-fallback:hover {
        transform: scale(1.05);
    }
    
    /* Smooth image transitions */
    img {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    img:hover {
        transform: scale(1.02);
    }
    
    /* Loading spinner for images */
    .image-loading {
        position: relative;
    }
    
    .image-loading::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #4FD1C7;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }ge {
        box-shadow: 0 0 30px rgba(243, 156, 18, 0.3);
    }
`;

document.head.appendChild(enhancedStyle);
