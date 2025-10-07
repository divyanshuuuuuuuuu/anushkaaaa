document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let cartCount = 0;
    let allProducts = [];

    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initialize products array
    initializeProducts();

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const productCards = document.querySelectorAll('.product-card');

        if (query === '') {
            // Show all products
            productCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('p:nth-child(3)').textContent.toLowerCase();

            if (productName.includes(query) || productDesc.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function initializeProducts() {
        // Store original products for search functionality
        const productCards = document.querySelectorAll('.product-card');
        allProducts = Array.from(productCards).map(card => ({
            element: card,
            name: card.querySelector('h3').textContent,
            description: card.querySelector('p:nth-child(3)').textContent
        }));
    }

    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
        });
    });

    function filterProductsByCategory(category) {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const cardCategories = card.getAttribute('data-category') || '';
                if (cardCategories.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    // Check login status on page load
    updateLoginStatus();

    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBtn = document.getElementById('cart-btn');
    const loginBtn = document.getElementById('login-btn');

    function updateLoginStatus() {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        const userContact = localStorage.getItem('userContact');

        if (isLoggedIn && userContact) {
            const displayName = userContact.includes('@') ? userContact.split('@')[0] : userContact.slice(-4);
            loginBtn.textContent = `Welcome, ${displayName} (Logout)`;
            loginBtn.onclick = function() {
                logout();
            };
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = function() {
                showLoginModal();
            };
        }
    }

    function logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userContact');
        updateLoginStatus();
        alert('Logged out successfully!');
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseInt(this.getAttribute('data-price'));
            cart.push({ product, price });
            cartCount++;
            updateCartDisplay();
            alert(`${product} added to cart!`);
        });
    });

    function updateCartDisplay() {
        cartBtn.textContent = `Cart (${cartCount})`;
    }

    cartBtn.addEventListener('click', function() {
        showCart();
    });

    function showCart() {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Please login to proceed with checkout.');
            showLoginModal();
            return;
        }

        let cartItems = cart.map(item => `${item.product} - ₹${item.price}`).join('\n');
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        const proceed = confirm(`Cart Items:\n${cartItems}\n\nTotal: ₹${total}\n\nProceed to checkout?`);
        if (proceed) {
            showCheckout(total);
        }
    }

    function showCheckout(total) {
        const userContact = localStorage.getItem('userContact');
        const paymentMethod = prompt('Choose payment method:\n1. Cash on Delivery\n2. Online Payment (UPI/Card)');
        if (paymentMethod === '1') {
            alert('Order placed successfully! Payment will be collected on delivery.');
            saveOrderHistory(userContact, cart, total, 'Cash on Delivery');
            cart = [];
            cartCount = 0;
            updateCartDisplay();
        } else if (paymentMethod === '2') {
            // Integrate with payment gateway (Razorpay, PayU, etc.)
            alert('Redirecting to payment gateway... (Integration needed)');
            // In production, integrate with actual payment gateway
            alert('Payment successful! Order placed.');
            saveOrderHistory(userContact, cart, total, 'Online Payment');
            cart = [];
            cartCount = 0;
            updateCartDisplay();
        } else {
            alert('Invalid option. Please try again.');
        }
    }

    function saveOrderHistory(email, items, total, paymentMethod) {
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        const order = {
            id: Date.now(),
            email: email,
            items: items,
            total: total,
            paymentMethod: paymentMethod,
            date: new Date().toISOString()
        };
        orderHistory.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }

    function showLoginModal() {
        const modal = document.getElementById('login-modal');
        const step1 = document.getElementById('login-step-1');
        const step2 = document.getElementById('login-step-2');
        const success = document.getElementById('login-success');
        const contactTypeSelect = document.getElementById('contact-type');
        const contactInput = document.getElementById('login-contact');
        const otpInput = document.getElementById('login-otp');
        const otpEmail = document.getElementById('otp-email');

        modal.style.display = 'block';
        step1.style.display = 'block';
        step2.style.display = 'none';
        success.style.display = 'none';
        contactInput.value = '';
        otpInput.value = '';

        // Update placeholder based on contact type
        contactTypeSelect.onchange = function() {
            if (this.value === 'email') {
                contactInput.placeholder = 'Enter your email';
                contactInput.type = 'email';
            } else {
                contactInput.placeholder = 'Enter your phone number (with country code)';
                contactInput.type = 'tel';
            }
        };
        contactTypeSelect.onchange(); // Initialize

        // Close modal
        document.querySelector('.close').onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // Send OTP
        document.getElementById('send-otp-btn').onclick = function() {
            const contact = contactInput.value;
            const contactType = contactTypeSelect.value;

            if (!contact) {
                alert(`Please enter your ${contactType === 'email' ? 'email' : 'phone number'}`);
                return;
            }

            // Validate email format if email selected
            if (contactType === 'email' && !contact.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            fetch('http://localhost:3002/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    step1.style.display = 'none';
                    step2.style.display = 'block';
                    otpEmail.textContent = contact;
                    alert(`OTP sent successfully! Please check your ${contactType === 'email' ? 'email' : 'SMS'}.`);
                } else {
                    alert(data.message || 'Failed to send OTP. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Network error. Please try again.');
            });
        }

        // Verify OTP
        document.getElementById('verify-otp-btn').onclick = function() {
            const contact = contactInput.value;
            const otp = otpInput.value;

            if (!otp || otp.length !== 6) {
                alert('Please enter a valid 6-digit OTP');
                return;
            }

            fetch('http://localhost:3002/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact, otp })
            })
            .then(response => response.json())
            .then(verifyData => {
                if (verifyData.success) {
                    step2.style.display = 'none';
                    success.style.display = 'block';
                    // Store login state
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('userContact', contact);
                    // Update UI
                    updateLoginStatus();
                    // Close modal after 2 seconds
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 2000);
                } else {
                    alert('Invalid OTP. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Network error. Please try again.');
            });
        }

        // Resend OTP
        document.getElementById('resend-otp-btn').onclick = function() {
            document.getElementById('send-otp-btn').click();
        }
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const message = formData.get('message') || this.querySelector('textarea').value;

            // In a real application, you would send this to your backend
            alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon at ${email}.`);
            this.reset();
        });
    }

    // Newsletter Signup
    const newsletterBtn = document.getElementById('newsletter-btn');
    const newsletterEmail = document.getElementById('newsletter-email');

    if (newsletterBtn && newsletterEmail) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterEmail.value.trim();
            if (!email) {
                alert('Please enter your email address');
                return;
            }

            if (!email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            // In a real application, you would send this to your backend
            alert(`Thank you! ${email} has been subscribed to our newsletter.`);
            newsletterEmail.value = '';
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.id.includes('send') || this.id.includes('verify')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000); // Remove loading after 2 seconds
            }
        });
    });
});