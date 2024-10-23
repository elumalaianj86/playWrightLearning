// reverse a string and check for palindromes
function reverseString(str) {
  let splitedCharacters = str.split("");
  let reversedString = "";
  for (let i = splitedCharacters.length - 1; i >= 0; i--) {
    console.log(splitedCharacters[i]);
    reversedString += splitedCharacters[i];
  }
  console.log(reversedString);
  if (reversedString === str) {
    console.log("The string is a palindrome");
  } else {
    console.log("The string is not a palindrome");
  }
}

reverseString("Learning Javascript and playwright");
reverseString("MADAM");

// switch statements in JavaScript to categorize data based on multiple conditions

function gradeCalculation(studentsScore) {
  let grade = "";
  switch (true) {
    case studentsScore >= 90:
      grade = "A";
      break;
    case studentsScore >= 80:
      grade = "B";
      break;
    case studentsScore >= 70:
      grade = "C";
      break;
    case studentsScore >= 60:
      grade = "D";
      break;
    case studentsScore <= 50 && studentsScore >= 35:
      grade = "E";
      break;
    default:
      grade = "F";
  }
  console.log(
    "Student score is: " + studentsScore + " and Grade is : " + grade
  );
}

gradeCalculation("85");
gradeCalculation("45");

//prints odd numbers between 1 and 25

function printOddNumbers() {
  for (let i = 1; i <= 25; i++) {
    if (i % 2 !== 0) {
      console.log(i);
    }
  }
}

printOddNumbers();

//the length of the last word in the string

function lengthOfLastWord(str) {
  let trimmedString = str.trim();
  let splitedWords = trimmedString.split(" ");
  let lastWord = splitedWords[splitedWords.length - 1];
  console.log("The length of the last word is: " + lastWord.length);
}

lengthOfLastWord("Hello World");
lengthOfLastWord("fly me to the moon");

//Write a function to check if two strings are anagrams.

function isStringsAnagrams(str1, str2) {
  const string1 = str1.toLowerCase();
  const string2 = str2.toLowerCase();
  const sortedStr1 = string1.split("").sort().join("");
  const sortedStr2 = string2.split("").sort().join("");
  if (sortedStr1 === sortedStr2) {
    console.log("The given strings are anagrams");
  } else {
    console.log("The given strings are not anagrams");
  }
}

isStringsAnagrams("listen", "silent");
isStringsAnagrams("Learning", "Reading");
