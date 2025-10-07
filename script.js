document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let cartCount = 0;

    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBtn = document.getElementById('cart-btn');
    const loginBtn = document.getElementById('login-btn');

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

    loginBtn.addEventListener('click', function() {
        showLoginModal();
    });

    function showCart() {
        let cartItems = cart.map(item => `${item.product} - ₹${item.price}`).join('\n');
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        const proceed = confirm(`Cart Items:\n${cartItems}\n\nTotal: ₹${total}\n\nProceed to checkout?`);
        if (proceed) {
            showCheckout(total);
        }
    }

    function showCheckout(total) {
        const paymentMethod = prompt('Choose payment method:\n1. Cash on Delivery\n2. Online Payment (UPI/Card)');
        if (paymentMethod === '1') {
            alert('Order placed successfully! Payment will be collected on delivery.');
            cart = [];
            cartCount = 0;
            updateCartDisplay();
        } else if (paymentMethod === '2') {
            // Integrate with payment gateway (Razorpay, PayU, etc.)
            alert('Redirecting to payment gateway... (Integration needed)');
            // In production, integrate with actual payment gateway
            alert('Payment successful! Order placed.');
            cart = [];
            cartCount = 0;
            updateCartDisplay();
        } else {
            alert('Invalid option. Please try again.');
        }
    }

    function showLoginModal() {
        const modal = document.getElementById('login-modal');
        const step1 = document.getElementById('login-step-1');
        const step2 = document.getElementById('login-step-2');
        const success = document.getElementById('login-success');
        const emailInput = document.getElementById('login-email');
        const otpInput = document.getElementById('login-otp');
        const otpEmail = document.getElementById('otp-email');

        modal.style.display = 'block';
        step1.style.display = 'block';
        step2.style.display = 'none';
        success.style.display = 'none';
        emailInput.value = '';
        otpInput.value = '';

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
            const email = emailInput.value;
            if (!email) {
                alert('Please enter your email');
                return;
            }

            fetch('http://localhost:3002/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    step1.style.display = 'none';
                    step2.style.display = 'block';
                    otpEmail.textContent = email;
                    alert('OTP sent successfully! Please check your email.');
                } else {
                    alert('Failed to send OTP. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Network error. Please try again.');
            });
        }

        // Verify OTP
        document.getElementById('verify-otp-btn').onclick = function() {
            const email = emailInput.value;
            const otp = otpInput.value;

            if (!otp || otp.length !== 6) {
                alert('Please enter a valid 6-digit OTP');
                return;
            }

            fetch('http://localhost:3002/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            })
            .then(response => response.json())
            .then(verifyData => {
                if (verifyData.success) {
                    step2.style.display = 'none';
                    success.style.display = 'block';
                    // Store login state
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('userEmail', email);
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
});