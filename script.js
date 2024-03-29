// Define character arrays
// Array of special characters to be included in password
const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));

// Array of uppercase characters to be included in password
const upperCasedCharacters = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

// Function to gather user preferences for password generation
function getPasswordOptions() {
    const length = parseInt(prompt("How long would you like your password to be? (Enter a number between 8 and 128)"));

    if (isNaN(length) || length < 8 || length > 128) {
        alert("Invalid password length. Please try again.");
        return null;
    }

    const inclLowercase = confirm("Include lowercase characters?");
    const inclUppercase = confirm("Include uppercase characters?");
    const inclNumbers = confirm("Include numeric characters?");
    const inclSpecial = confirm("Include special characters?");

    if (!(inclLowercase || inclUppercase || inclNumbers || inclSpecial)) {
        alert("Please select at least one character type.");
        return null;
    }

    return { length, inclLowercase, inclUppercase, inclNumbers, inclSpecial };
}

// Function to get a random element from an array
function getRandomElement(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

// Function to generate a password based on user preferences
function generatePassword() {
    const options = getPasswordOptions();

    if (!options) return null;

    const charactersArr = [];

    // The spread operator (...) is used to concatenate the arrays
    if (options.inclLowercase) charactersArr.push(...lowerCasedCharacters);
    if (options.inclUppercase) charactersArr.push(...upperCasedCharacters);
    if (options.inclNumbers) charactersArr.push(...numericCharacters);
    if (options.inclSpecial) charactersArr.push(...specialCharacters);

    // Generates an array of random characters and then concatenates them into a string
    return Array.from({ length: options.length }, () => getRandomElement(charactersArr)).join('');
}

// Get reference to the 'Generate Password' button
const generateBtn = document.querySelector('#generate');

// Event listener for password generation
generateBtn.addEventListener('click', function () {
    const generatedPassword = generatePassword();
    const passwordText = document.querySelector('#password');
    passwordText.value = generatedPassword || 'No valid password generated';
});