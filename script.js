document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineItems() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkTimelineItems();
    
    // Check on scroll
    window.addEventListener('scroll', checkTimelineItems);


    // Project card hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image img').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image img').style.transform = 'scale(1)';
        });
    });

    // Certificate card hover effect
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Scroll reveal animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    scrollReveal.reveal('.section-title, .about-image, .about-text, .project-card, .certificate-card, .contact-info, .contact-form', {
        interval: 200
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
// Preloader
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  
  // Minimum display time (1.5 seconds)
  setTimeout(function() {
    preloader.classList.add('hidden');
    
    // Remove from DOM after animation completes
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500); // Match this with the CSS transition time
  }, 1500);
});

// Optional: Show preloader when page is unloading
window.addEventListener('beforeunload', function() {
  document.querySelector('.preloader').classList.remove('hidden');
  document.querySelector('.preloader').style.display = 'flex';
});


});
// Enhanced Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.send-btn');
const formStatus = contactForm.querySelector('.form-status');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Change button state
    submitBtn.classList.add('sending');
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    
    try {
        // Simulate form submission (replace with actual fetch/AJAX)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        submitBtn.classList.remove('sending');
        submitBtn.classList.add('sent');
        
        formStatus.textContent = 'Message sent successfully!';
        formStatus.classList.add('success-message');
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.classList.remove('sent');
            
            // Reset floating labels
            document.querySelectorAll('.floating-input input, .floating-input textarea').forEach(input => {
                input.dispatchEvent(new Event('input'));
            });
        }, 3000);
        
    } catch (error) {
        submitBtn.classList.remove('sending');
        formStatus.textContent = 'Error sending message. Please try again.';
        formStatus.classList.add('error-message');
    }
});

// Initialize floating labels
document.querySelectorAll('.floating-input input, .floating-input textarea').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});