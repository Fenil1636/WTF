document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');


    const patterns = {
        name: /^[A-Za-z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        mobile: /^[0-9]{10}$/,
        password: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    };


    function cleanInput(value) {
        return value.trim().replace(/\s+/g, ' ');
    }


    function checkPasswordStrength(pwd) {
        const strengthBox = document.getElementById('passwordStrength');
        let score = 0;

        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[\W_]/.test(pwd)) score++;

        if (score <= 2) {
            strengthBox.textContent = 'Weak password';
            strengthBox.className = 'password-strength weak';
        } else if (score === 3) {
            strengthBox.textContent = 'Medium strength';
            strengthBox.className = 'password-strength medium';
        } else {
            strengthBox.textContent = 'Strong password';
            strengthBox.className = 'password-strength strong';
        }
    }

    
    function validateField(fieldId, errorId, validator) {
        const field = document.getElementById(fieldId);
        const errorBox = document.getElementById(errorId);
        const value = cleanInput(field.value);

        if (!validator(value)) {
            errorBox.textContent = field.dataset.errorMessage || 'Invalid input';
            field.style.borderColor = '#e74c3c';
            return false;
        } else {
            errorBox.textContent = '';
            field.style.borderColor = '#ccc';
            return true;
        }
    }


    document.getElementById('password').addEventListener('input', function () {
        checkPasswordStrength(this.value);
    });

    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        
        isValid &= validateField('fullName', 'fullNameError', function (val) {
            return patterns.name.test(val) && val.length >= 2;
        });


        const dob = document.getElementById('dob').value;
        const dobError = document.getElementById('dobError');
        if (!dob) {
            dobError.textContent = 'Date of birth is required';
            isValid = false;
        } else {
            dobError.textContent = '';
        }

        
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        const genderError = document.getElementById('genderError');
        if (!genderSelected) {
            genderError.textContent = 'Please select your gender';
            isValid = false;
        } else {
            genderError.textContent = '';
        }

        
        isValid &= validateField('email', 'emailError', function (val) {
            return patterns.email.test(val);
        });

    
        isValid &= validateField('mobile', 'mobileError', function (val) {
            return patterns.mobile.test(val);
        });

        
        const pwd = document.getElementById('password').value;
        const pwdError = document.getElementById('passwordError');
        if (!patterns.password.test(pwd)) {
            pwdError.textContent = 'Password must have 8+ chars, 1 uppercase, 1 number, 1 special char';
            isValid = false;
        } else {
            pwdError.textContent = '';
        }

        
        const confirmPwd = document.getElementById('confirmPassword').value;
        const confirmPwdError = document.getElementById('confirmPasswordError');
        if (confirmPwd !== pwd || confirmPwd === '') {
            confirmPwdError.textContent = 'Passwords do not match';
            isValid = false;
        } else {
            confirmPwdError.textContent = '';
        }

        
        const idProof = document.getElementById('idProof');
        const idProofError = document.getElementById('idProofError');
        if (idProof.files.length === 0) {
            idProofError.textContent = 'Please upload an ID proof';
            isValid = false;
        } else {
            idProofError.textContent = '';
        }

        
        const terms = document.getElementById('terms');
        const termsError = document.getElementById('termsError');
        if (!terms.checked) {
            termsError.textContent = 'You must accept the terms';
            isValid = false;
        } else {
            termsError.textContent = '';
        }

        if (isValid) {
            alert('Registration successful! (Form would submit here)');
            
        }
    });

    
    form.addEventListener('reset', function () {
        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(err => err.textContent = '');
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(inp => inp.style.borderColor = '#ccc');
        document.getElementById('passwordStrength').textContent = '';
    });
});