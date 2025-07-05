document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.btn-submit');
    const buttonText = submitButton.querySelector('.submit-text');
    const buttonLoading = submitButton.querySelector('.submit-loading');
    const successMessage = document.getElementById('successMessage');
    const contactIntro = document.querySelector('.contact-intro');

    // Ensure success message is hidden by default
    successMessage.style.display = 'none';

    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message').value.trim();
        if (!message) {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
    }
    
    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-input, .form-textarea');
        
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        
        inputElements.forEach(el => {
            el.classList.remove('error');
        });
    }
    
    // Real-time validation
    document.getElementById('name').addEventListener('blur', function() {
        const name = this.value.trim();
        if (name && name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters long');
        } else {
            clearError('nameError');
        }
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
        } else {
            clearError('emailError');
        }
    });
    
    document.getElementById('message').addEventListener('blur', function() {
        const message = this.value.trim();
        if (message && message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
        } else {
            clearError('messageError');
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitButton.disabled = true;
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline';
            
            // Simulate form submission
            setTimeout(() => {
                // Get form data
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message')
                };
                
                // Hide form and show success message
                form.style.display = 'none';
                contactIntro.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        }
    });
}); 