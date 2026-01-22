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
    initImageModal(); // MAKE SURE THIS IS HERE
});

// Typewriter Effect
function initTypewriter() {
    const typingElement = document.getElementById('typing-text');
    const texts = ['MCA Student', 'AI/ML INTERN', 'Programming Enthusiast', 'Machine Learning Beginner', 'Web Developer'];
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
                    if (navToggle && navMenu) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
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
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
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

    if (!navToggle || !navMenu) {
        console.log('Mobile navigation elements not found');
        return;
    }

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
    if (!themeToggle) return;
    
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
        if (themeIcon) {
            themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
        }
        themeToggle.setAttribute('aria-label', `Switch to ${isDarkMode ? 'light' : 'dark'} theme`);
        
        // Force navbar to update its background
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.style.background = ''; // Clear any inline styles
        }
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.textContent = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            formStatus.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
        
        contactForm.reset();
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Project Cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const viewButton = card.querySelector('.btn');
        if (viewButton) {
            viewButton.addEventListener('click', function(e) {
                e.preventDefault();
                // Project modal functionality can be added here
                alert('Project details modal would open here');
            });
        }
    });
}


// Enhanced Image Gallery Modal
function initImageModal() {
    console.log('Initializing gallery modal...');
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.image-modal-close');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const currentImageNum = document.getElementById('currentImageNum');
    const totalImages = document.getElementById('totalImages');
    const thumbnailNav = document.getElementById('thumbnailNav');
    
    if (!modal || !modalImage || !modalTitle) {
        console.error('Modal elements not found');
        return;
    }
    
    let currentImages = [];
    let currentDescriptions = [];
    let currentIndex = 0;
    let currentTitle = '';
    
    // Function to update image display
    function updateImage(index) {
        if (index < 0 || index >= currentImages.length) return;
        
        currentIndex = index;
        modalImage.src = currentImages[index];
        modalImage.alt = `${currentTitle} - Image ${index + 1}`;
        
        if (modalDescription && currentDescriptions[index]) {
            modalDescription.textContent = currentDescriptions[index];
        }
        
        // Update counter
        if (currentImageNum && totalImages) {
            currentImageNum.textContent = index + 1;
            totalImages.textContent = currentImages.length;
        }
        
        // Update navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.classList.toggle('hidden', currentImages.length <= 1 || index === 0);
            nextBtn.classList.toggle('hidden', currentImages.length <= 1 || index === currentImages.length - 1);
        }
        
        // Update thumbnails
        updateThumbnails();
    }
    
    // Function to create and update thumbnails
    function updateThumbnails() {
        if (!thumbnailNav) return;
        
        thumbnailNav.innerHTML = '';
        
        if (currentImages.length <= 1) {
            thumbnailNav.classList.add('single-image');
            return;
        }
        
        thumbnailNav.classList.remove('single-image');
        
        currentImages.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imageSrc;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.className = 'thumbnail';
            thumbnail.classList.toggle('active', index === currentIndex);
            
            thumbnail.addEventListener('click', () => {
                updateImage(index);
            });
            
            thumbnailNav.appendChild(thumbnail);
        });
    }
    
    // Function to open gallery
    function openGallery(images, title, descriptions = []) {
        currentImages = Array.isArray(images) ? images : [images];
        currentDescriptions = Array.isArray(descriptions) ? descriptions : [descriptions];
        currentTitle = title;
        currentIndex = 0;
        
        modalTitle.textContent = title;
        updateImage(0);
        
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close gallery
    function closeGallery() {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        currentImages = [];
        currentDescriptions = [];
        currentIndex = 0;
    }
    
    // Navigation functions
    function nextImage() {
        if (currentIndex < currentImages.length - 1) {
            updateImage(currentIndex + 1);
        }
    }
    
    function prevImage() {
        if (currentIndex > 0) {
            updateImage(currentIndex - 1);
        }
    }
    
    // Event listeners for achievement images
    function addGalleryListeners() {
        const viewImageBtns = document.querySelectorAll('.view-image-btn');
        
        viewImageBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                try {
                    const imagesData = this.getAttribute('data-images');
                    const title = this.getAttribute('data-title');
                    const descriptionsData = this.getAttribute('data-descriptions');
                    
                    const images = JSON.parse(imagesData);
                    const descriptions = descriptionsData ? JSON.parse(descriptionsData) : [];
                    
                    console.log('Opening gallery:', title, images.length, 'images');
                    openGallery(images, title, descriptions);
                } catch (error) {
                    console.error('Error parsing image data:', error);
                }
            });
        });
        
        // Certificate buttons (single image)
        const viewCertificateBtns = document.querySelectorAll('.view-certificate-btn');
        viewCertificateBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const imageSrc = this.getAttribute('data-image');
                const title = this.getAttribute('data-title');
                
                openGallery([imageSrc], title, ['Certificate image']);
            });
        });
    }
    
    // Initialize event listeners
    addGalleryListeners();
    setTimeout(addGalleryListeners, 1000);
    
    // Modal controls
    if (closeBtn) closeBtn.addEventListener('click', closeGallery);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    
    // Background click to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeGallery();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeGallery();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}


// Flame JS
function initFlameCursor() {
  const flameContainer = document.getElementById('flame-container');

  if (!flameContainer) return;

  let lastX = 0;
  let lastY = 0;

  window.addEventListener('mousemove', e => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    if (Math.abs(dx) + Math.abs(dy) < 5) return;

    lastX = e.clientX;
    lastY = e.clientY;

    const particle = document.createElement('div');
    particle.className = 'flame-particle';

    // Custom CSS properties for random motion
    particle.style.setProperty('--x-offset', (Math.random() * 20 - 10).toFixed(2));
    particle.style.setProperty('--rotate', (Math.random() * 20 - 10).toFixed(2));

    // Position particle slightly behind cursor tip
    const offsetX = +4;
    const offsetY = 18;

    particle.style.left = `${e.clientX + offsetX}px`;
    particle.style.top = `${e.clientY + offsetY}px`;

    flameContainer.appendChild(particle);

    particle.addEventListener('animationend', () => {
      flameContainer.removeChild(particle);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initFlameCursor();
});
