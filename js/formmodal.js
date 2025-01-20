// Simplified Modal Manager
document.addEventListener('DOMContentLoaded', () => {
  // Handle modal triggers
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      showModal(modalId);
    });
  });

  // Handle modal back buttons
  document.querySelectorAll('.modal__back').forEach(backBtn => {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentModal = backBtn.closest('.modal').id;
      const targetModal = backBtn.getAttribute('data-back-target');
      hideModal(currentModal);
      showModal(targetModal);
    });
  });

  // Handle close buttons
  document.querySelectorAll('.modal__close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      hideModal(modal.id);
    });
  });

  // Handle outside clicks
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal(modal.id);
      }
    });
  });

  // Handle country code dropdowns
  document.querySelectorAll('.login__country-code').forEach(container => {
    const button = container.querySelector('button, span');
    const dropdown = container.querySelector('.login__country-dropdown');

    if (button && dropdown) {
      button.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });

      dropdown.querySelectorAll('.login__country-option').forEach(option => {
        option.addEventListener('click', () => {
          const code = option.getAttribute('data-code');
          button.querySelector('span').textContent = code;
          dropdown.style.display = 'none';
        });
      });
    }
  });

  // Handle password visibility toggle
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.login__input-container').querySelector('input');
      const icon = btn.querySelector('i');
      input.type = input.type === 'password' ? 'text' : 'password';
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });

  // Handle verification code inputs
  document.querySelectorAll('.verify__input').forEach((input, index, inputs) => {
    input.addEventListener('input', () => {
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
});

// Basic form validation
function validateForm(form) {
  const requiredInputs = form.querySelectorAll('[required]');
  let isValid = true;

  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      showWarning(form, 'All fields are required');
    }
  });

  return isValid;
}

// Utility functions
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function showWarning(form, message) {
  const warning = form.querySelector('.modal__warning, .login__warning, .signup__warning');
  if (warning) {
    warning.textContent = message;
    warning.style.display = 'block';
  }
}

// Add simple form handlers
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      // Handle form submission based on form ID or class
      if (form.classList.contains('login__form')) {
        // Handle login
        console.log('Login submitted');
      } else if (form.classList.contains('signup__form')) {
        // Handle signup
        console.log('Signup submitted');
      }
    }
  });
});