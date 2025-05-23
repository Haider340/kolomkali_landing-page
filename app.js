document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
                icon.classList.toggle('fa-bars');
            }
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Video Placeholder Click Handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Create video modal
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            
            // Add video iframe
            modal.innerHTML = `
                <div style="position: relative; width: 80%; max-width: 800px;">
                    <iframe width="100%" height="450" src="https://www.youtube.com/embed/example" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                    <button style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 24px; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal handler
            const closeBtn = modal.querySelector('button');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    }

    // CTA Button Click Handler
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to order section
            const orderSection = document.querySelector('#order');
            if (orderSection) {
                window.scrollTo({
                    top: orderSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Order Button Click Handlers
    document.querySelectorAll('.order-button').forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.closest('.order-card').querySelector('h3').textContent;
            const price = this.closest('.order-card').querySelector('.price').textContent;
            
            // Show order confirmation modal
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; text-align: center;">
                    <h3 style="color: var(--primary); margin-bottom: 20px;">অর্ডার কনফার্মেশন</h3>
                    <p style="margin-bottom: 20px;">আপনি "${packageName}" প্যাকেজটি নির্বাচন করেছেন (মূল্য: ${price})</p>
                    
                    <form id="order-form" style="text-align: left;">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px;">আপনার নাম</label>
                            <input type="text" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px;">ফোন নম্বর</label>
                            <input type="tel" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px;">ইমেইল (ঐচ্ছিক)</label>
                            <input type="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        
                        <button type="submit" style="background-color: var(--secondary); color: white; border: none; padding: 12px 25px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold;">
                            কনফার্ম অর্ডার
                        </button>
                    </form>
                    
                    <button id="close-modal" style="margin-top: 15px; background: none; border: none; color: var(--primary); cursor: pointer;">
                        বাতিল করুন
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Handle form submission
            const orderForm = modal.querySelector('#order-form');
            if (orderForm) {
                orderForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
                    document.body.removeChild(modal);
                });
            }
            
            // Close modal handler
            const closeBtn = modal.querySelector('#close-modal');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input');
            const submitBtn = this.querySelector('button');
            
            if (!emailInput.value) {
                alert('দয়া করে একটি বৈধ ইমেইল ঠিকানা লিখুন');
                return;
            }
            
            // Simulate form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                alert('ধন্যবাদ! আপনি সফলভাবে আমাদের নিউজলেটারে সাবস্ক্রাইব করেছেন।');
                this.reset();
            }, 1500);
        });
    }

    // Premium Contact Form Submission
    const premiumContactForm = document.getElementById('premium-contact-form');
    if (premiumContactForm) {
        premiumContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('full-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('phone-number').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('contact-message').value
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
                alert('দয়া করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন (নাম, ইমেইল এবং বার্তা)');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>পাঠানো হচ্ছে...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>বার্তা পাঠানো হয়েছে!</span>';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>বার্তা পাঠান</span> <i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                }, 3000);
                
                // Log form data
                console.log('Contact Form Submitted:', formData);
            }, 2000);
        });
    }

    // Scroll Animation for Cards
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .ad-card, .order-card, .stat-item, .contact-method');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.card, .ad-card, .order-card, .stat-item, .contact-method').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Contact method specific animation
    document.querySelectorAll('.contact-method').forEach((method, index) => {
        method.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
});