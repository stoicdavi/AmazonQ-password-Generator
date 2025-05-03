document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passwordEl = document.getElementById('password');
    const lengthEl = document.getElementById('length');
    const lengthValueEl = document.getElementById('length-value');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const strengthTextEl = document.getElementById('strength-text');
    const strengthBarEl = document.getElementById('strength-bar');

    // Update length value display
    lengthEl.addEventListener('input', function() {
        lengthValueEl.textContent = lengthEl.value;
    });

    // Generate password when button is clicked
    generateBtn.addEventListener('click', generatePassword);

    // Copy password to clipboard
    copyBtn.addEventListener('click', function() {
        if (!passwordEl.value) return;
        
        navigator.clipboard.writeText(passwordEl.value)
            .then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });

    // Generate password on page load
    generatePassword();

    // Password generation function
    function generatePassword() {
        // Get options
        const length = +lengthEl.value;
        const hasUpper = uppercaseEl.checked;
        const hasLower = lowercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;

        // Validate that at least one character type is selected
        if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
            alert('Please select at least one character type');
            return;
        }

        // Generate and display password
        const password = generateRandomPassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
        passwordEl.value = password;

        // Calculate and display password strength
        updatePasswordStrength(password);
    }

    // Function to generate random password
    function generateRandomPassword(length, upper, lower, number, symbol) {
        // Define character sets
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        // Create a string with all allowed characters
        let allowedChars = '';
        if (upper) allowedChars += upperChars;
        if (lower) allowedChars += lowerChars;
        if (number) allowedChars += numberChars;
        if (symbol) allowedChars += symbolChars;

        // Generate password
        let password = '';
        
        // Ensure at least one character from each selected type
        if (upper) password += getRandomChar(upperChars);
        if (lower) password += getRandomChar(lowerChars);
        if (number) password += getRandomChar(numberChars);
        if (symbol) password += getRandomChar(symbolChars);

        // Fill the rest of the password
        for (let i = password.length; i < length; i++) {
            password += getRandomChar(allowedChars);
        }

        // Shuffle the password to avoid predictable patterns
        return shuffleString(password);
    }

    // Get random character from a string
    function getRandomChar(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    }

    // Shuffle a string
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    // Calculate password strength
    function updatePasswordStrength(password) {
        // Calculate score based on various factors
        let score = 0;
        
        // Length factor
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        // Character variety factors
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        // Complexity factors
        const hasVariety = (/[A-Z]/.test(password) + /[a-z]/.test(password) + 
                           /[0-9]/.test(password) + /[^A-Za-z0-9]/.test(password)) >= 3;
        if (hasVariety) score += 1;
        
        // Update UI based on score
        let strengthText = '';
        let strengthClass = '';
        let strengthPercentage = 0;
        
        if (score <= 2) {
            strengthText = 'Very Weak';
            strengthClass = 'very-weak';
            strengthPercentage = 20;
        } else if (score <= 4) {
            strengthText = 'Weak';
            strengthClass = 'weak';
            strengthPercentage = 40;
        } else if (score <= 6) {
            strengthText = 'Medium';
            strengthClass = 'medium';
            strengthPercentage = 60;
        } else if (score <= 8) {
            strengthText = 'Strong';
            strengthClass = 'strong';
            strengthPercentage = 80;
        } else {
            strengthText = 'Very Strong';
            strengthClass = 'very-strong';
            strengthPercentage = 100;
        }
        
        // Update UI
        strengthTextEl.textContent = strengthText;
        strengthBarEl.className = '';
        strengthBarEl.classList.add(strengthClass);
        strengthBarEl.style.width = `${strengthPercentage}%`;
    }
});
