// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initProductFilter();
    initScrollEffects();
    initFormHandling();
    initImageModal();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Product filtering functionality
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        });
    });
    
    productCards.forEach(card => {
        card.classList.add('visible');
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your amigurumi inquiry! We will get back to you within 24 hours.');
            this.reset();
        });
    }
    
    const orderButtons = document.querySelectorAll('.btn-order');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            const contactSection = document.querySelector('#contact');
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            window.scrollTo({
                top: contactSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                alert(`Great choice! Please fill out the form below to order your ${productName} amigurumi.`);
            }, 1000);
        });
    });
}

// Image Modal functionality
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close-btn');
    const clickableImages = document.querySelectorAll('.clickable-image');
    
    // Open modal when clicking on images
    clickableImages.forEach(image => {
        image.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const icon = this.querySelector('i');
            const iconClass = icon.className;
            
            // Set modal content
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalIcon.className = iconClass;
            
            // Apply the same background gradient as the original image
            const backgroundClass = Array.from(this.classList).find(cls => 
                cls.includes('animal-') || 
                cls.includes('character-') || 
                cls.includes('food-') || 
                cls.includes('accessory-')
            );
            
            // Remove any existing background classes
            modalImage.className = 'modal-image-container';
            if (backgroundClass) {
                modalImage.classList.add(backgroundClass);
            }
            
            // Show modal with animation
            modal.style.display = 'flex';
            // Force reflow to ensure display change is applied before opacity transition
            modal.offsetHeight;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Immediately hide modal after animation completes
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}
