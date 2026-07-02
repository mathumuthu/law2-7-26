// ============================================
// Stackly Login Page - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const adminBtn = document.getElementById('adminBtn');
    const userBtn = document.getElementById('userBtn');
    const roleError = document.getElementById('roleError');
    const nameInput = document.getElementById('nameInput');
    const mobileInput = document.getElementById('mobileInput');
    const passwordInput = document.getElementById('passwordInput');
    const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');
    const togglePassword = document.getElementById('togglePassword');
    const passwordValidation = document.getElementById('passwordValidation');
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');
    const rememberMe = document.getElementById('rememberMe');

    // Validation state
    let selectedRole = null;
    let isNameValid = false;
    let isMobileValid = false;
    let isPasswordValid = false;
let isEmailValid = false;
    // Password validation elements
    const valLength = document.getElementById('valLength');
    const valUpper = document.getElementById('valUpper');
    const valLower = document.getElementById('valLower');
    const valNumber = document.getElementById('valNumber');
    const valSpecial = document.getElementById('valSpecial');

    // Error elements
    const nameError = document.getElementById('nameError');
    const mobileError = document.getElementById('mobileError');

    // ============================================
    // Role Selection
    // ============================================
    function selectRole(role) {
        selectedRole = role;
        roleError.classList.remove('show');

        if (role === 'admin') {
            adminBtn.classList.add('selected');
            userBtn.classList.remove('selected');
        } else {
            userBtn.classList.add('selected');
            adminBtn.classList.remove('selected');
        }

        checkFormValidity();
    }

    adminBtn.addEventListener('click', () => selectRole('admin'));
    userBtn.addEventListener('click', () => selectRole('user'));

    // ============================================
    // Name Validation (Letters Only)
    // ============================================
    function validateName(value) {
        // Allow letters and spaces only
        const nameRegex = /^[a-zA-Z\s]+$/;
        const hasInvalidChars = /[^a-zA-Z\s]/.test(value);

        if (value.length === 0) {
            nameInput.classList.remove('is-valid', 'is-invalid');
            nameError.classList.remove('show');
            isNameValid = false;
        } else if (hasInvalidChars) {
            nameInput.classList.remove('is-valid');
            nameInput.classList.add('is-invalid');
            nameError.classList.add('show');
            isNameValid = false;
        } else if (nameRegex.test(value) && value.trim().length >= 2) {
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
            nameError.classList.remove('show');
            isNameValid = true;
        } else {
            nameInput.classList.remove('is-valid', 'is-invalid');
            nameError.classList.remove('show');
            isNameValid = false;
        }

        checkFormValidity();
    }

    nameInput.addEventListener('input', function(e) {
        // Prevent invalid characters from being typed
        const value = e.target.value;
        const cleanValue = value.replace(/[^a-zA-Z\s]/g, '');

        if (value !== cleanValue) {
            e.target.value = cleanValue;
        }

        validateName(e.target.value);
    });

    nameInput.addEventListener('blur', function() {
        validateName(this.value);
    });

    // ============================================
    // Mobile Number Validation (Numbers Only)
    // ============================================
    function validateMobile(value) {
        const mobileRegex = /^[0-9]+$/;
        const hasInvalidChars = /[^0-9]/.test(value);

        if (value.length === 0) {
            mobileInput.classList.remove('is-valid', 'is-invalid');
            mobileError.classList.remove('show');
            isMobileValid = false;
        } else if (hasInvalidChars) {
            mobileInput.classList.remove('is-valid');
            mobileInput.classList.add('is-invalid');
            mobileError.classList.add('show');
            isMobileValid = false;
        } else if (mobileRegex.test(value) && value.length >= 10) {
            mobileInput.classList.remove('is-invalid');
            mobileInput.classList.add('is-valid');
            mobileError.classList.remove('show');
            isMobileValid = true;
        } else {
            mobileInput.classList.remove('is-valid', 'is-invalid');
            mobileError.classList.remove('show');
            isMobileValid = false;
        }

        checkFormValidity();
    }

    mobileInput.addEventListener('input', function(e) {
        // Prevent non-numeric characters
        const value = e.target.value;
        const cleanValue = value.replace(/[^0-9]/g, '');

        if (value !== cleanValue) {
            e.target.value = cleanValue;
        }

        validateMobile(e.target.value);
    });

    mobileInput.addEventListener('blur', function() {
        validateMobile(this.value);
    });
// ============================================
// Email Validation
// ============================================
function validateEmail(value) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.trim() === "") {

        emailInput.classList.remove("is-valid", "is-invalid");
        emailError.classList.remove("show");
        isEmailValid = false;

    } else if (emailRegex.test(value.trim())) {

        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
        emailError.classList.remove("show");
        isEmailValid = true;

    } else {

        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
        emailError.classList.add("show");
        isEmailValid = false;
    }

    checkFormValidity();
}
emailInput.addEventListener("input", function () {
    validateEmail(this.value);
});

emailInput.addEventListener("blur", function () {
    validateEmail(this.value);
});
function checkFormValidity() {

    if (
        selectedRole &&
        isNameValid &&
        isMobileValid &&
        isEmailValid &&
        isPasswordValid
    ) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}
validateEmail(emailInput.value);
    // ============================================
    // Password Validation
    // ============================================
    function validatePassword(value) {
        const hasLength = value.length >= 8;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]/.test(value);

        // Update validation UI
        updateValidationItem(valLength, hasLength);
        updateValidationItem(valUpper, hasUpper);
        updateValidationItem(valLower, hasLower);
        updateValidationItem(valNumber, hasNumber);
        updateValidationItem(valSpecial, hasSpecial);

        // Check if all conditions are met
        isPasswordValid = hasLength && hasUpper && hasLower && hasNumber && hasSpecial;

        if (isPasswordValid && value.length > 0) {
            passwordInput.classList.add('is-valid');
            passwordInput.classList.remove('is-invalid');
        } else if (value.length > 0) {
            passwordInput.classList.remove('is-valid');
            // Don't show red border while typing, only on blur
        } else {
            passwordInput.classList.remove('is-valid', 'is-invalid');
        }

        checkFormValidity();
    }

    function updateValidationItem(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
            element.querySelector('i').classList.remove('fa-circle');
            element.querySelector('i').classList.add('fa-check-circle');
        } else {
            element.classList.remove('valid');
            element.querySelector('i').classList.remove('fa-check-circle');
            element.querySelector('i').classList.add('fa-circle');
        }
    }

    passwordInput.addEventListener('focus', function() {
        passwordValidation.classList.add('show');
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this.value);
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value.length === 0) {
            passwordValidation.classList.remove('show');
        }

        if (this.value.length > 0 && !isPasswordValid) {
            passwordInput.classList.add('is-invalid');
        }
    });

    // ============================================
    // Show/Hide Password
    // ============================================
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // ============================================
    // Check Form Validity
    // ============================================
   function checkFormValidity() {
    if (
        selectedRole &&
        isNameValid &&
        isMobileValid &&
        isEmailValid &&
        isPasswordValid
    ) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}
    // ============================================
    // Form Submission
    // ============================================
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Check role selection
        if (!selectedRole) {
            roleError.classList.add('show');
            adminBtn.style.animation = 'shake 0.4s ease-in-out';
            userBtn.style.animation = 'shake 0.4s ease-in-out';
            setTimeout(() => {
                adminBtn.style.animation = '';
                userBtn.style.animation = '';
            }, 400);
            return;
        }

        // Validate all fields
        validateName(nameInput.value);
        validateMobile(mobileInput.value);
        validatePassword(passwordInput.value);

        if (!isNameValid || !isMobileValid || !isPasswordValid) {
            return;
        }

        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;

            // Show success message
            showSuccessMessage(selectedRole);
            showSuccessMessage(selectedRole);

setTimeout(() => {

    if(selectedRole === "admin"){
        window.location.href = "admin-dashboard.html";
    }else{
        window.location.href = "user-dashboard.html";
    }

},1500);

            // Save to localStorage if Remember Me is checked
            localStorage.removeItem("stackly_remember");

loginForm.reset();

nameInput.value = "";
mobileInput.value = "";
passwordInput.value = "";
        }, 2000);
    });
    

    // ============================================
    // Success Message
    // ============================================
    function showSuccessMessage(role) {
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3>Login Successful!</h3>
                <p>Welcome back, ${role === 'admin' ? 'Administrator' : 'User'}!</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Trigger animation
        setTimeout(() => overlay.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        }, 3000);
    }

    // ============================================
    // Load Remembered Data
    // ============================================
    function loadRememberedData() {
        const remembered = localStorage.getItem('stackly_remember');
        if (remembered) {
            try {
                const data = JSON.parse(remembered);
                if (data.name) nameInput.value = data.name;
                if (data.mobile) mobileInput.value = data.mobile;
                if (data.role) {
                    selectRole(data.role);
                    rememberMe.checked = true;
                }

                // Trigger validation
                validateName(nameInput.value);
                validateMobile(mobileInput.value);
                
            } catch (e) {
                console.error('Error loading remembered data:', e);
            }
        }
    }

    // Load remembered data on page load
    // loadRememberedData();

    // ============================================
    // Forgot Password Alert
    // ============================================
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset functionality will be implemented soon. Please contact support.');
    });

    // ============================================
    // Input Focus Effects
    // ============================================
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.querySelector('.form-label i').style.color = 'var(--primary-color)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.parentElement.querySelector('.form-label i').style.color = '';
        });
    });

    // ============================================
    // Keyboard Navigation
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('form-control')) {
            const inputs = Array.from(document.querySelectorAll('.form-control'));
            const currentIndex = inputs.indexOf(e.target);

            if (currentIndex < inputs.length - 1) {
                inputs[currentIndex + 1].focus();
            } else {
                loginBtn.click();
            }
        }
    });
});
const emailInput = document.getElementById("emailInput");

emailInput.addEventListener("input", validateEmail);

function validateEmail(){

    const email = emailInput.value.trim();

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ""){
        emailInput.classList.remove("is-valid","is-invalid");
    }
    else if(emailRegex.test(email)){
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }
    else{
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
    }

    validateForm();
}
const isEmailValid =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(emailInput.value.trim());

if(
    isRoleSelected &&
    isNameValid &&
    isMobileValid &&
    isEmailValid &&
    isPasswordValid
){
    loginBtn.disabled = false;
}
else{
    loginBtn.disabled = true;
}
const mobileInput = document.getElementById("mobileInput");

mobileInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});







// ============================================
// Email Validation
// ============================================
function validateEmail(value) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.length === 0) {

        emailInput.classList.remove("is-valid", "is-invalid");
        emailError.classList.remove("show");
        isEmailValid = false;

    } else if (emailRegex.test(value)) {

        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
        emailError.classList.remove("show");
        isEmailValid = true;

    } else {

        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
        emailError.classList.add("show");
        isEmailValid = false;
    }

    checkFormValidity();
}emailInput.addEventListener("input", function () {
    validateEmail(this.value);
});

emailInput.addEventListener("blur", function () {
    validateEmail(this.value);
});