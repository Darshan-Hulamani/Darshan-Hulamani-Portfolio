// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTypewriter();
    initNavigation();
    initScrollAnimations();
    initThemeToggle();
    initContactForm();
    initBackToTop();
    initMobileNavigation();
    initProjectCards();
});

// Typewriter Effect
function initTypewriter() {
    const typingElement = document.getElementById('typing-text');
    const texts = ['BCA Student', 'Programming Enthusiast', 'Machine Learning Beginner', 'Web Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeWriter, 500);
                return;
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
                return;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typingSpeed);
    }
    
    typeWriter();
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle navigation link clicks with improved targeting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate offset accounting for fixed navbar
                    const navbarHeight = navbar.offsetHeight;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active state immediately
                    updateActiveNavLink(targetId);
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const navToggle = document.getElementById('nav-toggle');
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Highlight active navigation link on scroll
    function updateActiveNavLink(activeId = null) {
        if (activeId) {
            // Manually set active link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
        } else {
            // Auto-detect based on scroll position
            const scrollPosition = window.scrollY + 100;
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'var(--color-surface)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Throttled scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            handleNavbarScroll();
        }, 10);
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const projectCards = document.querySelectorAll('.project-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animate skill bars
                if (target.classList.contains('skill-progress')) {
                    const width = target.getAttribute('data-width');
                    target.style.setProperty('--target-width', width + '%');
                    target.classList.add('animated');
                    setTimeout(() => {
                        target.style.width = width + '%';
                    }, 200);
                }
                
                // Animate project cards
                if (target.classList.contains('project-card')) {
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(30px)';
                    target.style.transition = 'all 0.6s ease-out';
                    
                    setTimeout(() => {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                // Animate timeline items
                if (target.classList.contains('timeline-item')) {
                    target.style.opacity = '0';
                    target.style.transform = 'translateX(-30px)';
                    target.style.transition = 'all 0.6s ease-out';
                    
                    setTimeout(() => {
                        target.style.opacity = '1';
                        target.style.transform = 'translateX(0)';
                    }, 100);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    skillBars.forEach(bar => observer.observe(bar));
    projectCards.forEach(card => observer.observe(card));
    timelineItems.forEach(item => observer.observe(item));
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    let isDarkMode = false;
    
    // Check for saved theme preference or system preference
    const savedTheme = window.localStorage && localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
    } else {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateTheme();
    
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        updateTheme();
        if (window.localStorage) {
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        }
    });
    
    function updateTheme() {
        document.documentElement.setAttribute('data-color-scheme', isDarkMode ? 'dark' : 'light');
        themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', `Switch to ${isDarkMode ? 'light' : 'dark'} theme`);
    }
}

// Contact Form with proper validation and feedback
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission with realistic delay
        setTimeout(() => {
            showFormStatus('success', '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
    
    function validateForm(name, email, subject, message) {
        clearFormErrors();
        let isValid = true;
        
        if (!name || name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        if (!email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!subject || subject.length < 3) {
            showFieldError('subject', 'Subject must be at least 3 characters long');
            isValid = false;
        }
        
        if (!message) {
            showFieldError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (!isValid) {
            showFormStatus('error', '❌ Please fix the errors above and try again.');
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = 'var(--color-error)';
            field.classList.add('error');
            
            // Remove existing error message
            const existingError = field.parentElement.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add error message
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.color = 'var(--color-error)';
            errorElement.style.fontSize = 'var(--font-size-sm)';
            errorElement.style.marginTop = 'var(--space-4)';
            errorElement.textContent = message;
            field.parentElement.appendChild(errorElement);
        }
    }
    
    function clearFormErrors() {
        const formFields = contactForm.querySelectorAll('.form-control');
        const errorMessages = contactForm.querySelectorAll('.field-error');
        
        formFields.forEach(field => {
            field.style.borderColor = '';
            field.classList.remove('error');
        });
        
        errorMessages.forEach(error => {
            error.remove();
        });
        
        hideFormStatus();
    }
    
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Scroll status into view
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideFormStatus();
            }, 5000);
        }
    }
    
    function hideFormStatus() {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
    }
    
    // Clear field errors on input
    const formFields = contactForm.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            this.style.borderColor = '';
            this.classList.remove('error');
            const errorMessage = this.parentElement.querySelector('.field-error');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
        field.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
        
        field.addEventListener('blur', function() {
            if (!this.classList.contains('error')) {
                this.style.borderColor = '';
            }
        });
    });
}

// Project Cards functionality
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const viewButton = card.querySelector('.btn');
        if (viewButton) {
            viewButton.addEventListener('click', function(e) {
                e.preventDefault();
                showProjectModal(card);
            });
        }
    });
}

function showProjectModal(projectCard) {
    const projectTitle = projectCard.querySelector('.project-title').textContent;
    const projectDescription = projectCard.querySelector('.project-description').textContent;
    const projectTech = Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    const projectCategory = projectCard.querySelector('.project-category').textContent;
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: var(--space-16);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        padding: var(--space-24);
        max-width: 500px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        border: 1px solid var(--color-card-border);
        box-shadow: var(--shadow-lg);
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-16);">
            <div>
                <h3 style="margin: 0; color: var(--color-text); font-size: var(--font-size-2xl);">${projectTitle}</h3>
                <span style="background: var(--color-bg-5); color: var(--color-primary); padding: var(--space-4) var(--space-8); border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: var(--font-weight-medium); text-transform: uppercase; margin-top: var(--space-8); display: inline-block;">${projectCategory}</span>
            </div>
            <button class="modal-close" style="background: none; border: none; font-size: var(--font-size-2xl); cursor: pointer; color: var(--color-text-secondary); padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">&times;</button>
        </div>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-16); line-height: var(--line-height-normal);">${projectDescription}</p>
        <div style="margin-bottom: var(--space-20);">
            <h4 style="color: var(--color-text); margin-bottom: var(--space-8); font-size: var(--font-size-lg);">Technologies Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-8);">
                ${projectTech.map(tech => `<span style="background: var(--color-secondary); color: var(--color-text); padding: var(--space-4) var(--space-8); border-radius: var(--radius-sm); font-size: var(--font-size-xs); font-weight: var(--font-weight-medium);">${tech}</span>`).join('')}
            </div>
        </div>
        <div style="background: var(--color-bg-8); padding: var(--space-16); border-radius: var(--radius-base); margin-bottom: var(--space-16);">
            <p style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-sm); text-align: center;">
                📧 This is a placeholder for project details. In a real implementation, this would include screenshots, live demo links, source code repositories, and detailed project specifications.
            </p>
        </div>
        <div style="display: flex; gap: var(--space-8); justify-content: flex-end;">
            <button class="btn btn--outline btn--sm modal-close">Close</button>
            <button class="btn btn--primary btn--sm" onclick="alert('Demo link would open here!')">Live Demo</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    function closeModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }
    
    // Close on button click
    modalContent.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

// Performance optimizations
let scrollTimeout;
function debounce(func, wait) {
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(scrollTimeout);
            func(...args);
        };
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(later, wait);
    };
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Focus management
document.addEventListener('focusin', function(e) {
    if (e.target.matches('.btn, .nav-link, .form-control')) {
        e.target.classList.add('focused');
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('.btn, .nav-link, .form-control')) {
        e.target.classList.remove('focused');
    }
});