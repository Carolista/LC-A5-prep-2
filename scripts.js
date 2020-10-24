/*** TRIVIA TIME ***/

/*
 * Assignment 5 Prep 2 - Integrating the DOM with forms and fetching JSON
 * 
 * This app utilizes the Open Trivia Database - read about it here: https://opentdb.com/api_config.php
 * 
 * Number: Default is 10 but must be 1-50
 * Difficulties: easy, medium, hard
 * Type: multiple, boolean (multiple choice, true/false) - FOR THIS EXERCISE WE ARE STICKING TO MULTIPLE CHOICE
 * 
 * Category, difficulty, and type can each be ignored to get mixed results ("any")
 * One call to the API will retrieve 50 questions max
 * 
 * To request token: https://opentdb.com/api_token.php?command=request
 * To use token: https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
 * 
 */


let currentToken; 
let categories = [];

// Fetch token for 6 hours of tracking to prevent duplicated questions from trivia database
// Using preventDefault() on the form listener will keep this from resetting when form is submitted
function fetchToken() {
    fetch("https://opentdb.com/api_token.php?command=request").then( function(response) {
        response.json().then( function(json) {
            currentToken = json.token;
            console.log("New token received: " + currentToken);
        });
    });
}

function fetchCategories() {
    fetch("https://opentdb.com/api_category.php").then( function(response) {
        response.json().then( function(json) {
            categories = json.trivia_categories;
            console.log("Categories loaded.");
            // TODO: Call function to list categories on page
            console.log("Categories displayed in drop-down menu on page.");
            init(); // This MUST go here so that nothing else on the page happens until the categories drop-down has the data it needs to populate the options!
        });
    });
}

// Event listener for page load
window.addEventListener("load", function() {
    fetchToken();
    fetchCategories();
    console.log('Page loaded. (Is it really though?)'); // Note what order these get logged in the JS console
});

// DOM code for page elements
function init() {

    // TODO: Establish variable to hold questions after they are returned from fetch request
    

    // TODO: Establish variables for DOM objects representing HTML elements
    

    // TODO: Write a function to populate the drop-down list of categories
    

    // TODO: Write a function to build the URL with query parameters based on form submitted
    

    // TODO: Write a function to fetch new questions from trivia database
    

    // TODO: Write a function to shuffle correct and incorrect answers in an array for one question and return innerHTML
    

    // TODO: Write a function to display the questions
    

    // TODO: Write a function to reset the question area
    

    // TODO: Write a form-level listener for submission
    

    // TODO: Write a document-level listener with an anonymous function to score a question
    


    /** Helper Function(s) **/

    function shuffle(array) {
        let current = array.length, temporaryValue, randomIndex;
        while (0 !== current) { 
            randomIndex = Math.floor(Math.random() * current);
            current -= 1;
            temporaryValue = array[current];
            array[current] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

}

