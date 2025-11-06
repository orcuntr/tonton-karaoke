// TonTon Karaoke - Mobile Optimized JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initStickyBar();
    initStepCards();
    initFAQ();
    initBetaForm();
    initScrollAnimations();
    initCounterAnimation();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// Sticky Bottom CTA Bar
function initStickyBar() {
    const stickyBar = document.getElementById('stickyBar');
    const heroSection = document.querySelector('.hero');
    
    if (!stickyBar || !heroSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                stickyBar.classList.add('show');
            } else {
                stickyBar.classList.remove('show');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(heroSection);
}

// Scroll to Beta
function scrollToBeta() {
    const betaSection = document.getElementById('beta');
    if (betaSection) {
        betaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Step Cards - Swipe Detection
function initStepCards() {
    const container = document.querySelector('.steps-container');
    const dots = document.querySelectorAll('.step-dots .dot');
    
    if (!container) return;
    
    let currentStep = 0;
    
    // Update active dot based on scroll position
    container.addEventListener('scroll', () => {
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.querySelector('.step-card').offsetWidth + 16; // +gap
        currentStep = Math.round(scrollLeft / cardWidth);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentStep);
        });
    });
    
    // Click dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = container.querySelector('.step-card').offsetWidth + 16;
            container.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Beta Form Submission
function initBetaForm() {
    const form = document.getElementById('betaForm');
    const successMsg = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            phone: formData.get('phone'),
            name: formData.get('name'),
            email: formData.get('email')
        };
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="button-content"><span>⏳ Gönderiliyor...</span></span>';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (Replace with actual Zoho API)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Hide form, show success
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Update counter
            const counter = document.getElementById('betaCount');
            if (counter) {
                const currentCount = parseInt(counter.textContent);
                counter.textContent = currentCount + 1;
                
                // Update success message number
                const successNumber = successMsg.querySelector('.neon-text');
                if (successNumber) {
                    successNumber.textContent = `#${currentCount + 1}`;
                }
            }
            
            // Confetti animation (optional)
            createConfetti();
            
            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.countdown-number, .stat-mini-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && current === 0) {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, stepTime);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.neon-card, .feature-card-mobile, .step-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// Confetti Effect (Success Animation)
function createConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#ee4c79', '#20b6cd', '#f8a715', '#f47448', '#9daf6a'];
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '-20px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = `0 0 10px ${particle.style.backgroundColor}`;
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${randomInRange(0, 360)}deg)`, opacity: 0 }
            ], {
                duration: randomInRange(2000, 3000),
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }, 100);
}

// Phone Number Formatting (Turkish)
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.substr(0, 10);
            }
            
            // Format: 5XX XXX XX XX
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.substr(0, 3) + ' ' + value.substr(3);
                } else if (value.length <= 8) {
                    value = value.substr(0, 3) + ' ' + value.substr(3, 3) + ' ' + value.substr(6);
                } else {
                    value = value.substr(0, 3) + ' ' + value.substr(3, 3) + ' ' + value.substr(6, 2) + ' ' + value.substr(8);
                }
            }
            
            e.target.value = value;
        });
    }
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add pulse animation to CTA buttons
setInterval(() => {
    document.querySelectorAll('.neon-button-pulse').forEach(btn => {
        btn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    });
}, 3000);

// Console Easter Egg
console.log('%c🎤 TonTon Karaoke', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #ee4c79, #20b6cd, #f8a715); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cSesini keşfet, yeteneğini geliştir! 🎵', 'font-size: 14px; color: #a0a0b0;');
console.log('%cBeta programına katılmak için: https://orcuntr.github.io/tonton-karaoke/', 'font-size: 12px; color: #20b6cd;');
