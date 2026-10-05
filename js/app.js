const MathOperations = require('./modules/math');

const math = new MathOperations();
const sum = math.add(5, 3); // Example usage of the add method
const diff = math.subtract(10, 4); // Example usage of the subtract method

console.log(`Hello Omar, the sum is ${sum} and difference is ${diff}`);