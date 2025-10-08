// ------------------ QUIZ ------------------

const questions = [
  {
    question: "Jaki język służy do stylowania strony?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "Który znacznik osadza skrypt JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<code>", correct: false },
      { text: "<javascript>", correct: false }
    ]
  },
  {
    question: "Która właściwość CSS tworzy efekt paralaksy?",
    answers: [
      { text: "background-attachment: fixed;", correct: true },
      { text: "scroll-behavior: smooth;", correct: false },
      { text: "position: sticky;", correct: false },
      { text: "overflow: hidden;", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

let timeLeft = 10;
let timer;

function startQuiz() {
  clearInterval(timer); // zatrzymaj timer
  document.getElementById("timer").innerText = "";
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Następne";
  showQuestion();
  scoreDisplay.innerText = `Wynik: ${score}`;
}

function startTimer() {
  clearInterval(timer); // zatrzymaj poprzedni timer (jeśli jakiś był)
  timeLeft = 10;
  document.getElementById("timer").innerText = `Czas: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Czas: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.click(); // automatycznie przejdź dalej
    }
  }, 1000);
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  startTimer(); // Uruchom timer przy każdym nowym pytaniu

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    const li = document.createElement("li");
    li.appendChild(button);
    answerButtons.appendChild(li);
  });

}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer); // Zatrzymaj timer po wybraniu odpowiedzi
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(li => {
    const btn = li.firstChild;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });

  scoreDisplay.innerText = `Wynik: ${score}`;
  nextButton.style.display = "inline-block";
  clearInterval(timer); // Zatrzymaj timer po wybraniu odpowiedzi
}

nextButton.addEventListener("click", () => {
  if (nextButton.innerText === "Zagraj ponownie") {
    startQuiz();
  } else {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `Twój wynik: ${score} z ${questions.length}!`;
  nextButton.innerText = "Zagraj ponownie";
  nextButton.style.display = "inline-block";
  scoreDisplay.innerText = "";
}

startQuiz();
