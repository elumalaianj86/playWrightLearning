/*create a function using forEach for below use case

Find the number of occurrences.
Given the array, const nums = [2,4,5,2,1,2];
if const k = 2, then output >> 3 */

const nums = [2, 4, 5, 2, 1, 2];

function findOccurrences(arr, k) {
  let count = 0;
  arr.forEach((num) => {
    if (num === k) {
      count++;
    }
  });
  console.log(`Occurence of 2 in given array is :  ${count}`);
  return count;
}

findOccurrences(nums, 2);

/*
Assignment Details: 
Given the array, const nums = [2, 4, 7, 8, 11, 14]; 
const target = 18;
return the indices that have matching targets >> 7+11 (2, 4), 4+14 (1, 5)
Assignment Requirements: 
1. Initialize an empty array `results`.
2. Use a nested loop to iterate over `nums` array elements.
3. Check if the sum of two distinct elements equals `target`.
4. If true, add their indices to `results`.
5. Return `results` containing pairs of indices.
*/

function sumOfPair(arr, target) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] == target) {
        results.push([i, j]);
      }
    }
  }
  return results;
}

const numbers = [2, 4, 7, 8, 11, 14];
const target = 18;
const listArray = sumOfPair(numbers, target);
console.log(`Indexes of arry which gives sum of 18 ${listArray}`);

/*
Assignment Details:
Create a JavaScript program that defines a function to compute the intersection of two arrays. The 
intersection should include elements that appear in both arrays without any duplicates.
Assignment Requirements:
1. Write a function named `intersection` that accepts two arguments, `arr1` and `arr2`, which are 
arrays of numbers, and returns an array of their intersection.
2. Ensure no duplicate elements in the resulting array. If an element appears in both `arr1` and 
`arr2`, it should appear only once in the result.
3. Use a loop to find common elements. Iterate through each element of `arr1` and check if it is 
present in `arr2` and not already included in the result array.
4. Include example calls to the `intersection` function with different arrays to demonstrate the 
function’s functionality. Include examples with no common elements, all elements common, and 
typical cases. 
*/

function intersection(arr1, arr2) {
  let result = [];
  arr1.forEach((num) => {
    if (arr2.includes(num) && !result.includes(num)) {
      result.push(num);
    }
  });
  return result;
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
const array = intersection(arr1, arr2);
console.log(`Intersection between arr1 and arr2 is : ${array}`);
