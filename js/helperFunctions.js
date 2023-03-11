// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 1. How to Capitalize Text

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

// const name = "robert";
// const result = capitalize(name) // "Robert";
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 2. How to Calculate Percent

const calculatePercent = (value, total) => `${Math.round((value / total) * 100)} %`;

const questionsCorrect = 6;
const questionsTotal = 11;

// const result = calculatePercent(questionsCorrect, questionsTotal); // 55
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 3. How to Get a Random Element

const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

const items = ["Nicely done!", "Good job!", "Good work!", "Correct!"];

// const result = getRandomItem(items); // "Good job!"
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 4. How to Remove Duplicate Elements

const removeDuplicates = (arr) => [...new Set(arr)];

const friendList = ["Jeff", "Jane", "Jane", "Rob"];

// const result = removeDuplicates(friendList); // ['Jeff', 'Jane', 'Rob']
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 5. How to Sort Elements By Certain Property

const sortBy = (arr, key) => arr.sort((a, b) => a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);

const lessons = [{ position: 1, name: "Intro" }, { position: 0, name: "Basics" }];

// const result = sortBy(lessons, 'name'); 
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 6. How to Check if Arrays/Objects are Equal

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// console.log(isEqual([1, '2'], [1, 2])); // false
// console.log(isEqual([1, 2], [1, 2])); // true

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 7. How to Count Number of Occurrences

const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a), 0);

const pollResponses = ["Yes", "Yes", "No"];
const response = "Yes";

// const result = countOccurrences(pollResponses, response); // 2
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 8. How to Wait for a Certain Amount of Time

const goToSignupPage = () => console.log('hello after 2 seconds...');

const wait = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

// wait(2000).then(() => goToSignupPage());

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 9. How to Use the Pluck Property from Array of Objects

const pluck = (objs, key) => objs.map((obj) => obj[key]);

const arrayOfObjectUsers = [{ name: "Abe", age: 45 }, { name: "Jennifer", age: 27 }];

// const result = pluck(arrayOfObjectUsers, 'name'); // ['Abe', 'Jennifer']
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// 10. How to Insert an Element at a Certain Position

const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

const arrayItems = [1, 2, 4, 5];

// insert the number 3 at index 2:

// const result = insert(arrayItems, 2, 3); // [1, 2, 3, 4, 5]
// console.log(result);

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩