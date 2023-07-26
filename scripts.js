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
            init(); // This MUST go here so that nothing else on the page happens until the categories drop-down has the data it needs to populate the options!
        });
    });
}

// Event listener for page load
window.addEventListener("load", function() {
    fetchToken();
    fetchCategories();

});

// DOM code for page elements
function init() {

    // TODO: Establish variable to hold questions after they are returned from fetch request
    let questions = [];

    // TODO: Establish variables for DOM objects representing HTML elements
    const numQuestions = document.getElementById("num-questions");
    const category = document.getElementById("category");
    const type = document.getElementById("type");
    const difficulty = document.getElementById("difficulty");
    const submitButton = document.getElementById("submit");
    const questionArea = document.getElementById("question-area");

    // TODO: Write a function to populate the drop-down list of categories
    function populateDropdown() {
        for (i=0;i<categories.length;i++) {
            category.innerHTML += `<option value="${categories[i].id}">${categories[i].name}</option>`
        }
    };
    populateDropdown();

    submitButton.addEventListener("click", function(event) {
        resetQuestionArea();
        buildUrl();
        event.preventDefault();
    })

    // TODO: Write a function to build the URL with query parameters based on form submitted
    function buildUrl() {
        let fullUrl = "https://opentdb.com/api.php?amount="
            fullUrl += numQuestions.value;
        if (category.value !== "any") {
            fullUrl += "&category=" + category.value;
        }
            fullUrl += "&type=multiple";
        if (difficulty.value !== "any") {
            fullUrl += "&difficulty=" + difficulty.value;
        }
        fetchQuestions(fullUrl);
    }

    // TODO: Write a function to fetch new questions from trivia database
    function fetchQuestions(url) {
        fetch(url).then(function(response){
            response.json().then(function(json){
                questions = json.results
            });
        });
        displayQuestions();
    };
    

    // TODO: Write a function to shuffle correct and incorrect answers in an array for one question and return innerHTML
    function shuffleMultipleChoice(crtAns, incAns) {
        let allChoices = structuredClone(incAns);
        allChoices.push(crtAns);
        let currentIndex = allChoices.length;
        let randomIndex = 0;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
            [allChoices[currentIndex], allChoices[randomIndex]] = [allChoices[randomIndex], allChoices[currentIndex]];
        }
        return allChoices;
    }
    

    // TODO: Write a function to display the questions (see sample-question-code.html)
    function displayQuestions() {
        for (i=0;i<questions.length;i++) {
            let choices = shuffleMultipleChoice(questions[i].correct_answer, questions[i].incorrect_answers);
            console.log(choices);
            questionArea.innerHTML += `
            <div class="q-container">
            <p class="q-number">Question ${i+1}<span id="score0" class="score"></span></p>
            <p class="q-question">${questions[i].question}</p>
                <input id="q0-0" class="answer" name="q${i+1}" type="radio" value="${questions[i].correct_answer}" />
                <label for="q0-0" class="q-option">${choices[0]}</label>
                <input id="q0-1" class="answer" name="q${i+1}" type="radio" value="${questions[i].correct_answer}" />
                <label for="q0-1" class="q-option">${choices[1]}</label>
                <input id="q0-2" class="answer" name="q${i+1}" type="radio" value="${questions[i].correct_answer}" />
                <label for="q0-2" class="q-option">${choices[2]}</label>
                <input id="q0-3" class="answer" name="q${i+1}" type="radio" value="${questions[i].correct_answer}" />
                <label for="q0-3" class="q-option">${choices[3]}</label>
            <p class="q-info">${questions[i].category} &nbsp;&bull;&nbsp; ${questions[i].difficulty}</p>
        </div>`
        }
    }

    // TODO: Write a function to reset the question area
   function resetQuestionArea() {
    questionArea.innerHTML = ``;
   } 

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

