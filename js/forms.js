/* ============================================
   MATH MATTERS NYC - Form Validation & Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- File Upload Display ----------
  var fileInput = document.getElementById('resume');
  var fileNameDisplay = document.getElementById('fileName');
  var fileUpload = document.getElementById('fileUpload');

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', function () {
      if (this.files && this.files.length > 0) {
        var file = this.files[0];
        var maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
          fileNameDisplay.textContent = 'File too large. Max size is 10MB.';
          fileNameDisplay.style.color = '#DC3545';
          this.value = '';
          if (fileUpload) fileUpload.classList.remove('has-file');
          return;
        }

        fileNameDisplay.textContent = file.name;
        fileNameDisplay.style.color = '';
        if (fileUpload) fileUpload.classList.add('has-file');
      } else {
        fileNameDisplay.textContent = '';
        if (fileUpload) fileUpload.classList.remove('has-file');
      }
    });
  }

  // ---------- Career Form Validation ----------
  var careerForm = document.getElementById('careerForm');

  if (careerForm) {
    careerForm.addEventListener('submit', function (e) {
      var isValid = true;

      // Clear previous errors
      clearErrors(careerForm);

      // Check required text/email/tel fields
      var requiredFields = careerForm.querySelectorAll('[required]:not([type="file"]):not([type="checkbox"])');
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          showError(field);
          isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          showError(field);
          isValid = false;
        }
      });

      // Check checkboxes (at least one subject selected)
      var subjectCheckboxes = careerForm.querySelectorAll('input[name="Subjects[]"]');
      var anyChecked = Array.from(subjectCheckboxes).some(function (cb) { return cb.checked; });
      if (!anyChecked) {
        var checkboxError = careerForm.querySelector('.checkbox-error');
        if (checkboxError) checkboxError.classList.add('visible');
        isValid = false;
      }

      // Check file upload
      if (fileInput && (!fileInput.files || fileInput.files.length === 0)) {
        if (fileNameDisplay) {
          fileNameDisplay.textContent = 'Please upload your resume.';
          fileNameDisplay.style.color = '#DC3545';
        }
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
        // Scroll to first error
        var firstError = careerForm.querySelector('.error, .checkbox-error.visible');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Show loading state
        var submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
          submitBtn.textContent = 'Submitting...';
          submitBtn.disabled = true;
        }
      }
    });
  }

  // ---------- Contact Form Validation ----------
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var isValid = true;

      // Clear previous errors
      clearErrors(contactForm);

      // Check required fields
      var requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          showError(field);
          isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          showError(field);
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        var firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        var submitBtn = document.getElementById('contactSubmitBtn');
        if (submitBtn) {
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
        }
      }
    });
  }

  // ---------- Helper Functions ----------
  function showError(field) {
    field.classList.add('error');
    var errorMsg = field.parentElement.querySelector('.form-error');
    if (errorMsg) errorMsg.classList.add('visible');
  }

  function clearErrors(form) {
    form.querySelectorAll('.error').forEach(function (el) {
      el.classList.remove('error');
    });
    form.querySelectorAll('.form-error.visible, .checkbox-error.visible').forEach(function (el) {
      el.classList.remove('visible');
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ---------- Clear Error on Input ----------
  document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      this.classList.remove('error');
      var errorMsg = this.parentElement.querySelector('.form-error');
      if (errorMsg) errorMsg.classList.remove('visible');
    });
  });

  document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach(function (cb) {
    cb.addEventListener('change', function () {
      var checkboxError = this.closest('.form-group').querySelector('.checkbox-error');
      if (checkboxError) checkboxError.classList.remove('visible');
    });
  });

});
