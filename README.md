# Password Generator

A simple web-based password generator application that allows users to:

- Generate secure passwords with customizable options
- Copy passwords to clipboard with a single click
- View password strength information
- Customize password parameters:
  - Length (8-32 characters)
  - Include uppercase letters
  - Include lowercase letters
  - Include numbers
  - Include special symbols

## How to Use

1. Open `password-generator.html` in any modern web browser
2. Adjust the password options according to your needs:
   - Use the slider to set password length
   - Check/uncheck options to include different character types
3. Click "Generate Password" to create a new password
4. Click "Copy" to copy the password to your clipboard
5. The password strength meter will show how secure your password is

## Features

- **Password Strength Meter**: Visual indicator of password security
- **Customizable Options**: Choose exactly what goes into your password
- **Copy to Clipboard**: Easy one-click copying
- **Responsive Design**: Works on desktop and mobile devices

## Security Notes

- All password generation happens locally in your browser
- No passwords are stored or transmitted over the internet
- The application uses a cryptographically secure random number generator when available
