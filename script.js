const quizContainer = document.getElementById("quiz");
const questionContainer = document.getElementById("questions");
const answerContainer = document.getElementById("answers");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const welcome = document.getElementById("welcome");
const startQuizBtn = document.getElementById("start");

var questions = [
  {
    title: "Where is the bicep brachii located?",
    choices: ["arm", "chest", "back", "knee"],
    answer: "arm",
  },
  {
    title: "Which of these are ball and socket joints?",
    choices: ["wrist", "hip", "ankle", "shin"],
    answer: "hip",
  },
  {
    title: "What's the primary action of the glutes?",
    choices: [
      "hip extension",
      "humerus abduction",
      "scapula protraction",
      "wrist supination",
    ],
    answer: "hip extension",
  },
];

var questionsNumber = 0;
var userAnswer = "";
var riteAnswer = "";

//Timer
var interval;
var time = 60;
function startTimer() {
  interval = setInterval(() => {
    document.getElementById("timer").textContent = `Time: ${time}`;
    if (time <= 0) {
      clearInterval(interval);
      endGame;
      //game over function (wrong questions, right etc and call initials function)
    } else {
      time--;
    }
  }, 1000);
}

function startGame() {
  startTimer();
  displayQuestions(questions);
  welcome.textContent = [];
}

function endGame() {
  quizContainer.textContent = "";
  const h3 = document.createElement("h3");
  h3.textContent = "Your score: ";
  quizContainer.appendChild(h3);
}

function displayQuestions(arr) {
  questionContainer.textContent = arr[questionsNumber].title;
  var choices = arr[questionsNumber].choices;
  riteAnswer = arr[questionsNumber].answer;
  for (let i = 0; i < choices.length; i++) {
    const element = choices[i];
    const answerBtn = document.createElement("button");
    answerBtn.setAttribute("class", "answer");
    answerBtn.textContent = element;
    answerContainer.append(answerBtn);
  }
}

document.addEventListener("click", function (event) {
  if (event.target.matches(".answer")) {
    userAnswer = event.target.textContent;
    questionsNumber++;

    if (userAnswer === riteAnswer && questionsNumber < questions.length) {
      document.getElementById("response").textContent = "Right!";
      answerContainer.textContent = [];
      displayQuestions(questions);
    } else if (
      userAnswer !== riteAnswer &&
      questionsNumber < questions.length
    ) {
      document.getElementById("response").textContent = "Wrong";
      answerContainer.textContent = [];
      time = -10;
      displayQuestions(questions);
    } else {
      endGame();
    }
  }
});

startQuizBtn.addEventListener("click", startGame);
