// script.js
document.addEventListener('DOMContentLoaded', function() {
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const cipherType = document.getElementById('cipherType');
  const caesarKey = document.getElementById('caesarKey');
  const encryptButton = document.getElementById('encryptButton');
  const decryptButton = document.getElementById('decryptButton');
  const copyButton = document.getElementById('copyButton');
  const clearButton = document.getElementById('clearButton');
 
  // Morse code mapping
  const morseCode = {
  'а': '.-', 'б': '-...', 'в': '.--', 'г': '--.', 'д': '-..', 'е': '.', 'ж': '...-', 'з': '--..', 'и': '..', 'й': '.---', 'к': '-.-',
  'л': '.-..', 'м': '--', 'н': '-.', 'о': '---', 'п': '.--.', 'р': '.-.', 'с': '...', 'т': '-', 'у': '..-', 'ф': '..-.', 'х': '----',
  'ц': '-.-.', 'ч': '---.', 'ш': '----', 'щ': '--.-', 'ъ': '.--.-.', 'ы': '-.--', 'ь': '-..-', 'э': '..-..', 'ю': '..--', 'я': '.-.-',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-',
  'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-',
  'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..', '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.', '-': '-....-', '_': '..--.-',
  '(': '-.--.', ')': '-.--.-'
  };
 
  // Function to encrypt text
  function encrypt(text, type, key) {
  text = text.toLowerCase();
  let result = '';
 
  switch (type) {
  case 'morse':
  for (let i = 0; i < text.length; i++) {
  if (morseCode[text[i]]) {
  result += morseCode[text[i]] + ' ';
  } else {
  result += text[i] + ' ';
  }
  }
  break;
  case 'caesar':
  key = parseInt(key) || 0;
  for (let i = 0; i < text.length; i++) {
  let charCode = text.charCodeAt(i);
  if ((charCode >= 97 && charCode <= 122) || (charCode >= 1072 && charCode <= 1103)) {
  let base = (charCode >= 97 && charCode <= 122) ? 97 : 1072;
  charCode = ((charCode - base + key) % 32) + base;
  }
  result += String.fromCharCode(charCode);
  }
  break;
  case 'a1z26':
  for (let i = 0; i < text.length; i++) {
  let charCode = text.charCodeAt(i);
  if (charCode >= 97 && charCode <= 122) {
  result += (charCode - 96) + ' ';
  } else if (charCode >= 1072 && charCode <= 1103) {
  result += (charCode - 1071) + ' ';
  } else {
  result += text[i] + ' ';
  }
  }
  break;
  }
 
  return result.trim();
  }
 
  // Function to decrypt text
  function decrypt(text, type, key) {
  text = text.toLowerCase();
  let result = '';
 
  switch (type) {
  case 'morse':
  let words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
  let char = Object.keys(morseCode).find(key => morseCode[key] === words[i]);
  result += char ? char : words[i];
  }
  break;
  case 'caesar':
  key = parseInt(key) || 0;
  for (let i = 0; i < text.length; i++) {
  let charCode = text.charCodeAt(i);
  if ((charCode >= 97 && charCode <= 122) || (charCode >= 1072 && charCode <= 1103)) {
  let base = (charCode >= 97 && charCode <= 122) ? 97 : 1072;
  charCode = ((charCode - base - key + 32) % 32) + base;
  }
  result += String.fromCharCode(charCode);
  }
  break;
  case 'a1z26':
  let numbers = text.split(' ');
  for (let i = 0; i < numbers.length; i++) {
  let num = parseInt(numbers[i]);
  if (num >= 1 && num <= 32) {
  if (num <= 26) {
  result += String.fromCharCode(num + 96);
  } else {
  result += String.fromCharCode(num + 1071);
  }
  } else {
  result += numbers[i] + ' ';
  }
  }
  break;
  }
 
  return result.trim();
  }
 
  // Event listeners for buttons
  encryptButton.addEventListener('click', function() {
  outputText.value = encrypt(inputText.value, cipherType.value, caesarKey.value);
  });
 
  decryptButton.addEventListener('click', function() {
  outputText.value = decrypt(inputText.value, cipherType.value, caesarKey.value);
  });
 
  copyButton.addEventListener('click', function() {
  outputText.select();
  document.execCommand('copy');
  });
 
  clearButton.addEventListener('click', function() {
  inputText.value = '';
  outputText.value = '';
  });
 });
 