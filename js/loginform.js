
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.querySelector('input[type="password"]');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.querySelector('i').classList.toggle('fa-eye');
    togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
});


const countryCode = document.getElementById('countryCode');
const countryDropdown = document.getElementById('countryDropdown');
const countryOptions = document.querySelectorAll('.login__country-option');

countryCode.addEventListener('click', () => {
    countryDropdown.style.display = countryDropdown.style.display === 'block' ? 'none' : 'block';
});

countryOptions.forEach(option => {
    option.addEventListener('click', () => {
        const code = option.getAttribute('data-code');
        countryCode.querySelector('span').textContent = code;
        countryDropdown.style.display = 'none';
    });
});


document.addEventListener('click', (e) => {
    if (!countryCode.contains(e.target)) {
        countryDropdown.style.display = 'none';
    }
});






const forgotPasswordCountryCode = document.getElementById('forgotPasswordCountryCode');
const forgotPasswordCountryDropdown = document.getElementById('forgotPasswordCountryDropdown');
const forgotPasswordCountryOptions = forgotPasswordCountryDropdown.querySelectorAll('.login__country-option');

forgotPasswordCountryCode.addEventListener('click', (e) => {
    e.stopPropagation();
    forgotPasswordCountryDropdown.style.display = forgotPasswordCountryDropdown.style.display === 'block' ? 'none' : 'block';
});

forgotPasswordCountryOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = option.getAttribute('data-code');
        forgotPasswordCountryCode.querySelector('span').textContent = code;
        forgotPasswordCountryDropdown.style.display = 'none';
    });
});






const verificationInputs = document.querySelectorAll('.verify__input');
let timerInterval;

verificationInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value) {
            if (e.target.value.length > 1) {
                e.target.value = e.target.value[0];
            }
            if (index < verificationInputs.length - 1) {
                verificationInputs[index + 1].focus();
            }
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            verificationInputs[index - 1].focus();
        }
    });
});

function startTimer() {
    let totalSeconds = 59;
    const minutesSpan = document.getElementById('timerMinutes');
    const secondsSpan = document.getElementById('timerSeconds');
    const resendButton = document.getElementById('resendButton');

    resendButton.classList.add('verify__resend--disabled');

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            resendButton.classList.remove('verify__resend--disabled');
            return;
        }

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');

        totalSeconds--;
    }, 1000);
}






document.getElementById('resendButton').addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('verify__resend--disabled')) {
        e.preventDefault();
        startTimer();
    }
});


function handleForgotPassword() {
    const phoneInput = document.querySelector('.modal__content .login__input');
    if (!phoneInput.value) {
        document.getElementById('warningRequired').style.display = 'block';
        document.getElementById('warningIncorrect').style.display = 'none';
    } else {
        showVerificationModal();
    }
}



function handleNewPassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const warning = document.getElementById('newPasswordWarning');

    if (!newPassword || !confirmPassword) {
        warning.textContent = 'All inputs is required';
        warning.style.display = 'block';
    } else if (newPassword !== confirmPassword) {
        warning.textContent = 'Passwords do not match';
        warning.style.display = 'block';
    } else {

        warning.style.display = 'none';
        window.location.href = '/logedin.html';
    }
}



function togglePassword0(inputId, toggleIcon) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    toggleIcon.querySelector('i').classList.toggle('fa-eye');
    toggleIcon.querySelector('i').classList.toggle('fa-eye-slash');
}







function showSignupModal() {
    document.getElementById('signupModal').classList.add('signup__modal--active');
}

function closeSignupModal() {
    document.getElementById('signupModal').classList.remove('signup__modal--active');
}

// Toggle Password Visibility
function togglePassword12(icon) {
    const input = icon.parentElement.querySelector('input');
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Dropdown Functions
let activeDropdown = null;

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);

    // Close any open dropdown first
    if (activeDropdown && activeDropdown !== dropdown) {
        activeDropdown.style.display = 'none';
    }

    // Toggle current dropdown
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        activeDropdown = null;
    } else {
        dropdown.style.display = 'block';
        activeDropdown = dropdown;
    }
}

// Handle dropdown item selection
document.querySelectorAll('.signup__dropdown-content').forEach(dropdown => {
    dropdown.querySelectorAll('.signup__dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const dropdownButton = item.closest('.signup__form-group').querySelector('.signup__dropdown span');
            dropdownButton.textContent = item.textContent;
            dropdown.style.display = 'none';
            activeDropdown = null;
        });
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.signup__dropdown') && !e.target.closest('.signup__dropdown-content')) {
        document.querySelectorAll('.signup__dropdown-content').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
        activeDropdown = null;
    }
});

// Form validation and submission
document.querySelector('.signup__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const requiredWarning = document.getElementById('requiredWarning');
    const passwordWarning = document.getElementById('passwordWarning');
    const allInputs = e.target.querySelectorAll('input');
    let hasEmptyFields = false;

    allInputs.forEach(input => {
        if (!input.value.trim()) {
            hasEmptyFields = true;
        }
    });

    if (hasEmptyFields) {
        requiredWarning.style.display = 'block';
        passwordWarning.style.display = 'none';
    } else {
        requiredWarning.style.display = 'none';
        // Add your sign up logic here
        console.log('Form submitted');
    }
});

// Update the sign up link in the login form
document.querySelector('.login__signup-link').addEventListener('click', showSignupModal);



