// Assignment Code
let generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// Generate password
function generatePassword() {
  // finding out how many characters the user wants in the password with a set range of 8-128
  let pwLength = parseInt(prompt('Enter a number between 8-128'), 10);
  while (pwLength < 7 || pwLength > 129 || Number.isNaN(pwLength) || pwLength === null) {
    alert("That's not a valid number. Please enter a number from 8-128.");
    pwLength = prompt('Enter a number between 8-128');
  }

  // Defining variables
  let confirmLower = false;
  let confirmUpper = false;
  let confirmNumber = false;
  let confirmSpecial = false;

  // If all answers are false, looping back through to get atleast one true response.
  while (confirmLower === false && confirmUpper === false
    && confirmNumber === false && confirmSpecial === false) {
    confirmLower = confirm('Do you want to include lower case characters?');
    confirmUpper = confirm('Do you want to include upper case characters?');
    confirmNumber = confirm('Do you want to include number characters?');
    confirmSpecial = confirm('Do you want to include special characters?');
    if (confirmLower === false && confirmUpper === false){ 
      alert('You need to select one type of character'); 
    }
      }

  // Various Character Arrays
  const lowerCaseChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const upperCaseChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const numericChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const specialChar = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '|', '[', ']', ';', "'", ':', '<', '>', '?', '/'];

  // Array created based on the answers to prompts by the user
  const passwordPool = [];

  // Creating new array containing the options(arrays) the user chose to include in the password
  function generateChar() {
    if (confirmLower) {
      passwordPool.push(...lowerCaseChar);
    }
    if (confirmUpper) {
      passwordPool.push(...upperCaseChar);
    }
    if (confirmNumber) {
      passwordPool.push(...numericChar);
    }
    if (confirmSpecial) {
      passwordPool.push(...specialChar);
    }
  }
  generateChar();
  console.log(passwordPool);

  // Creates final array out of random characters from
  // the pool that was created by the users option inputs.
  function pushChar() {
    const randomPassword = [];
    for (let i = 0; i < pwLength; i += 1) {
      const item = passwordPool[Math.floor(Math.random() * passwordPool.length)];
      randomPassword.push(item);
    }
    return randomPassword;
  }

  // validate that all of the conditions were met.
  function checkPassword(password) {
    const checkUpper = (upperCaseChar.some((ele) => password.includes(ele)));
    const checkLower = (lowerCaseChar.some((ele) => password.includes(ele)));
    const checkNumeric = (numericChar.some((ele) => password.includes(ele)));
    const checkSpecial = (specialChar.some((ele) => password.includes(ele)));

    console.log(checkUpper);
    console.log(checkLower);
    console.log(checkNumeric);
    console.log(checkSpecial);

    return checkUpper === confirmUpper
      && checkLower === confirmLower
      && checkNumeric === confirmSpecial
      && checkSpecial === confirmNumber;
  }

  let password = [];
  while (!checkPassword(password)) {
    password = pushChar();
  }

  // Presents randomly generated password to the user as a string.
  return password.join('');
}
