// Issues:
// 1. Get timer to load faster when “Start Quiz” button is clicked
// 2. Change order of how things display on the results page. Want it to be a) previous answer results, b) Your Score, c) Do you want to save?

const quizContainer = document.getElementById("quiz");
const questionContainer = document.getElementById("questions");
const answerContainer = document.getElementById("answers");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const welcome = document.getElementById("welcome");
const startQuizBtn = document.getElementById("start");
const timerEl = document.getElementById("timer");
const finalScore = document.getElementById("finalscore");

var questions = [
  {
    title: "1. Where is the bicep brachii located?",
    choices: ["arm", "chest", "back", "knee"],
    answer: "arm",
  },
  {
    title: "2. Which of these are ball and socket joints?",
    choices: ["wrist", "hip", "ankle", "shin"],
    answer: "hip",
  },
  {
    title: "3. What's the primary action of the glutes?",
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
var score = 0;

//Timer
var interval;
var time = 60;
var remainingTime = "";
function startTimer() {
  time--;
  timerEl.textContent = "Time: " + time;
  if (time <= 0) {
    endGame();
  }
}

var timeId;
function startGame() {
  timeId = setInterval(startTimer, 1000);
  timerEl.textContent = "Time: " + time;
  displayQuestions(questions);
  welcome.textContent = [];
}

function getHighScores() {
  const savedScores = localStorage.getItem("highScores");
  let highScores = [];
  if (savedScores) {
    highScores = JSON.parse(savedScores);
  }
  return highScores;
}

//displays high scores
function showHighScores() {
  let highScores = getHighScores();
  quizContainer.innerHTML = "";
  const h4 = document.createElement("h4");
  h4.innerText = "High scores";
  const ul = document.createElement("ul");
  for (let i = 0; i < highScores.length; i++) {
    const li = document.createElement("li");
    li.innerText = highScores[i].initials + ": " + highScores[i].score;
    ul.appendChild(li);
  }
  quizContainer.appendChild(h4);
  quizContainer.appendChild(ul);
}

function saveScore() {
  const initialsInput = document.getElementById("initials");
  if (!initialsInput.value) {
    alert("Add your intials");
    return false;
  }
  const savedScores = localStorage.getItem("highScores");
  let highScores = getHighScores();
  highScores.push({
    initials: initialsInput.value,
    score: Math.max(0, score + time),
  });
  highScores.sort(function (a, b) {
    return a.score - b.score;
  });
  highScores = highScores.reverse().slice(0, 10);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  showHighScores();
}

function saveScoreForm() {
  quizContainer.innerHTML = "";
  const initialsInput = document.createElement("input");
  const initialsLabel = document.createElement("label");
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("id", "initials");
  initialsLabel.setAttribute("for", "initials");
  initialsLabel.innerText = "Add your initials: ";
  const button = document.createElement("a");
  button.setAttribute("id", "save-score");
  button.innerText = "Save score";
  button.addEventListener("click", saveScore);
  quizContainer.appendChild(initialsLabel);
  quizContainer.appendChild(initialsInput);
  quizContainer.appendChild(button);
}

function endGame() {
  clearInterval(timeId);
  document.getElementById("timer").textContent = "";
  questionContainer.textContent = [];
  answerContainer.textContent = [];

  const h3 = document.createElement("h3");
  h3.textContent = "Your score: " + time;
  finalScore.appendChild(h3);

  const scoreDiv = document.createElement("div");
  scoreDiv.setAttribute("id", "score-div");

  const scoreSpan = document.createElement("span");
  scoreSpan.innerText = "Do you want to save your score?";

  const scoreButton = document.createElement("a");
  scoreButton.setAttribute("id", "save-score");
  scoreButton.innerText = "Yes";

  scoreDiv.appendChild(scoreSpan);
  scoreDiv.appendChild(scoreButton);
  results.appendChild(scoreDiv);
  scoreButton.addEventListener("click", saveScoreForm);
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
      answerContainer.textContent = "";
      displayQuestions(questions);
    } else if (
      userAnswer !== riteAnswer &&
      questionsNumber < questions.length
    ) {
      document.getElementById("response").textContent =
        "Wrong, 10 second penalty";
      answerContainer.textContent = " ";
      time = time - 10;
      displayQuestions(questions);
    }

    // else if (
    //   userAnswer !== riteAnswer &&
    //   questionsNumber === questions.length
    // ) {
    //   document.getElementById("response").textContent =
    //     "Wrong, 10 second penalty";
    //   time = time - 10;
    //   // endGame();
    // }
    // (
    // // ) {
    // //   document.getElementById("response").textContent = "Right!";
    // //   // endGame();
    // // } else {
    // //   endGame();
    // )
    else {
      endGame();
    }
  }
});

startQuizBtn.addEventListener("click", startGame);
