/**
 * Awantech Limited Website - Main JavaScript File
 * Contains all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==================== Global Variables ====================
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const contactForm = document.getElementById('contactForm');
    let currentTestimonialIndex = 0;
    let testimonialInterval;

    // ==================== Mobile Menu Functionality ====================
    function toggleMobileMenu() {
        navMenu.classList.toggle('show');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    }

    function closeMobileMenu() {
        navMenu.classList.remove('show');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // ==================== Header Scroll Effect ====================
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // ==================== Smooth Scrolling ====================
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupSmoothScrolling();

    // ==================== Project Filtering ====================
    function filterProjects(filterValue) {
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });

    // ==================== Testimonial Slider ====================
    function showTestimonial(index) {
        // Wrap around if index is out of bounds
        if (index >= testimonials.length) index = 0;
        if (index < 0) index = testimonials.length - 1;
        
        // Hide all testimonials and remove active dot
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected testimonial and activate corresponding dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonialIndex = index;
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonialIndex + 1);
    }

    function prevTestimonial() {
        showTestimonial(currentTestimonialIndex - 1);
    }

    function startTestimonialAutoRotation() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonialAutoRotation() {
        clearInterval(testimonialInterval);
    }

    // Initialize testimonial slider
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);

    // Auto-rotate testimonials
    startTestimonialAutoRotation();

    // Pause auto-rotation when hovering over slider
    testimonialSlider.addEventListener('mouseenter', stopTestimonialAutoRotation);
    testimonialSlider.addEventListener('mouseleave', startTestimonialAutoRotation);

    // ==================== Contact Form Handling ====================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // ==================== Animation on Scroll ====================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .project-card, .about-image, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // ==================== Responsive Adjustments ====================
    function handleResponsiveChanges() {
        // Adjust header height for mobile
        if (window.innerWidth <= 768) {
            document.documentElement.style.setProperty('--header-height', '60px');
        } else {
            document.documentElement.style.setProperty('--header-height', '80px');
        }
    }

    window.addEventListener('resize', function() {
        handleResponsiveChanges();
        closeMobileMenu(); // Close mobile menu when resizing to larger screens
    });

    handleResponsiveChanges(); // Initial call
});

// ==================== Helper Functions ====================
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}