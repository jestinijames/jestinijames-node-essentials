//console.log("Hello World!!")

//SINGLE IMPORT
//const generateRandomNumber = require('./utils');


const { generateRandomNumber, celsiusToFahrenheit } = require('./utils')

console.log (`Random Number ${generateRandomNumber()}`);

console.log(`Celsius to Fahrenheit ${celsiusToFahrenheit(0)}`)