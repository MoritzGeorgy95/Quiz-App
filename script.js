//JSON array containing all questions
let questions = [
  {
    question: "What is the capital of France?",
    answers: ["Rome", "Paris", "Madrid", "Berlin"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
  },
  {
    question: "Who is the current President of the United States?",
    answers: ["Joe Biden", "Donald Trump", "Barack Obama", "George W. Bush"],
    correctAnswer: "Joe Biden",
  },
  {
    question: "Which of the following is not a type of bird?",
    answers: ["Pigeon", "Sparrow", "Eagle", "Whale"],
    correctAnswer: "Whale",
  },
  {
    question: "Which of the following is not a type of fish?",
    answers: ["Salmon", "Tuna", "Trout", "Penguin"],
    correctAnswer: "Penguin",
  },
  {
    question: "What is the currency of Japan?",
    answers: ["Yen", "Dollar", "Euro", "Pound"],
    correctAnswer: "Yen",
  },
  {
    question: "Which of the following is not a type of reptile?",
    answers: ["Lizard", "Turtle", "Crocodile", "Penguin"],
    correctAnswer: "Penguin",
  },
  {
    question: "What is the capital of Australia?",
    answers: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
    correctAnswer: "Canberra",
  },
  {
    question: "Who invented the telephone?",
    answers: [
      "Thomas Edison",
      "Alexander Graham Bell",
      "Nikola Tesla",
      "Guglielmo Marconi",
    ],
    correctAnswer: "Alexander Graham Bell",
  },
  {
    question: "Which of the following is not a type of mammal?",
    answers: ["Dog", "Cat", "Horse", "Fish"],
    correctAnswer: "Fish",
  },
  {
    question: "What is the square root of 289?",
    answers: ["14", "17", "19", "13"],
    correctAnswer: "17",
  },
  {
    question:
      "Which of the following elements is not in the same group as the others?",
    answers: ["Sodium", "Potassium", "Chlorine", "Helium"],
    correctAnswer: "Helium",
  },
  {
    question: "Which of the following is not a type of triangle?",
    answers: ["Equilateral", "Isosceles", "Scalene", "Rectangular"],
    correctAnswer: "Rectangular",
  },
  {
    question: "In what year was the Declaration of Independence signed?",
    answers: ["1776", "1787", "1789", "1793"],
    correctAnswer: "1776",
  },
  {
    question: "Which of the following is not a planet in our solar system?",
    answers: ["Earth", "Mars", "Pluto", "Jupiter"],
    correctAnswer: "Pluto",
  },
  {
    question: "What is the capital of Canada?",
    answers: ["Ottawa", "Toronto", "Montreal", "Vancouver"],
    correctAnswer: "Ottawa",
  },
  {
    question: "Which of the following is not a noble gas?",
    answers: ["Helium", "Neon", "Argon", "Krypton"],
    correctAnswer: "Krypton",
  },
  {
    question: "What is the capital of Brazil?",
    answers: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
    correctAnswer: "Brasília",
  },
  {
    question: "What is the capital of Italy?",
    answers: ["Rome", "Milan", "Naples", "Turin"],
    correctAnswer: "Rome",
  },
  {
    question: "Which of the following is not a type of vertebrate?",
    answers: ["Fish", "Amphibian", "Reptile", "Insect"],
    correctAnswer: "Insect",
  },
];


/*
helper functions
*/
//get element
function getElement(id) {
  return document.getElementById(id);
}

//script variables
let currentQuestionNumber = getElement("current-question");
let numberOfQuestions = getElement("number-of-questions");
let question = getElement("question");
let options = document.getElementsByClassName("option");
let button = getElement("button");
let counter = 0;
let correctAnswers = 0;
let quizEnd = false;
let progressBar= document.getElementsByClassName('progress-bar')[0];
let audioRight= new Audio('right.mp3');
let audioWrong= new Audio('wrong.mp3');

/* 
main functions 
*/

//render everything on page load
function init() {
    renderQuestions(counter);
  }

//add event listener to every answer to check if right or wrong on click
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function () {
    checkAnswer(counter, i);
  });
}

//add event listener to next question button
button.addEventListener("click", function () {
  nextQuestion();
});


// render question plus its answer options
function renderQuestions(counter) {
  currentQuestionNumber.innerHTML = counter + 1;
  numberOfQuestions.innerHTML = questions.length;
  question.innerHTML = questions[counter].question;
  progressBar.innerHTML= `${(counter+1) *5} %`
  progressBar.style.width= `${(counter+1) *5}%`
  for (let i = 0; i < questions[counter].answers.length; i++) {
    options[i].innerHTML = questions[counter].answers[i];
  }
  if (currentQuestionNumber.innerHTML == numberOfQuestions.innerHTML) {
    button.innerHTML = "End Quiz";
    quizEnd = true;
  }
}

//check if answer is correct
function checkAnswer(counter, index) {
  button.disabled = false;
  disableClickEvents();
  if (questions[counter].answers[index] == questions[counter].correctAnswer) {
    options[index].classList.add("bg-success");
    correctAnswers++;
    audioRight.play();
  } else {
    audioWrong.play();
    options[index].classList.add("bg-danger");
    let position = questions[counter].answers.findIndex(function (match) {
      return match == questions[counter].correctAnswer;
    });
    options[position].classList.add("bg-success");
  }
}

//disable click events on other answers when one answer has already been clicked
function disableClickEvents() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled");
      }
}

//go to next question
function nextQuestion() {
  if (quizEnd) {
    let questionContainer = getElement("question-container");
    questionContainer.innerHTML = "";
    questionContainer.innerHTML += endScreenHTML();
  } else {
    counter++;
    renderQuestions(counter);
    button.disabled = true;
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove("bg-danger");
      options[i].classList.remove("bg-success");
      options[i].classList.remove("disabled");
    }
  }
}

//HTML for end screen
function endScreenHTML() {
    return /*html*/ `  
    <div class="success">

        <img src="images/trophy.png">
        <div>
            <h5 class="card-title">Hurray!</h5>
            <p class="card-text">You answered ${correctAnswers} of ${questions.length} questions correctly!</p>
            <button type="button" class="btn btn-primary restart" onClick="window.location.reload();">Restart</button>
        </div>
    
    </div>
`;
}