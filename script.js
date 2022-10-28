let quizContainer = document.getElementById("quiz");
let resultsContainer = document.getElementById("results");
let questionIndex = 0;
let result = "";

const questions = [
  {
    question: "Where is the bicep brachii located?",
    options: ["arm", "chest", "back", "leg"],
    rightAnswer: 0,
    points: 10,
  },
  {
    question: "Which of these are ball and socket joints?",
    options: ["wrist", "hip", "ankle", "knee"],
    rightAnswer: 1,
    points: 10,
  },
  {
    question: "What's the primary action of the glutes?",
    options: [
      "hip extension",
      "humerus abduction",
      "scapula protraction",
      "arm extension",
    ],
    rightAnswer: 0,
    points: 10,
  },
  {
    question: "Where is the median nerve located?",
    options: ["ankle", "knee", "wrist", "toes"],
    rightAnswer: 2,
    points: 10,
  },
  {
    question: "Where is the brachial plexus?",
    options: ["lower leg", "upper leg", "upper chest", "left hip"],
    rightAnswer: 2,
    points: 10,
  },
];

function answerResults() {
  if (questions[questionIndex].rightAnswer == this.getAttribute("option-id")) {
    result = "Correct";
  } else {
    result = "Wrong";
  }
  questionIndex++;
  if (questionIndex < questions.length) {
    showQuestions();
  } else {
    endQuiz();
  }
}

function showQuestions() {
  quizContainer.innerHTML = "";
  const question = questions[questionIndex];
  const h3 = document.createElement("h3");
  h3.innerText = question.question;
  const ul = document.createElement("ul");
  ul.setAttribute("id", "quiz-ul");
  for (let i = 0; i < question.options.length; i++) {
    const li = document.createElement("li");
    li.innerText = question.options[i];
    li.setAttribute("option-id", i);
    li.addEventListener("click", answerResults);
    ul.appendChild(li);
  }
  const h4 = document.createElement("h4");
  h4.innerText = result;
  quizContainer.appendChild(h3);
  quizContainer.appendChild(ul);
  quizContainer.appendChild(h4);
}

function startQuiz() {
  showQuestions();
}

const startQuizBtn = document.getElementById("start");
startQuizBtn.addEventListener("click", startQuiz);
