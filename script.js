// declare and assign variables for the elements used in the quiz
var quizBody = document.getElementById('quiz');
var results = document.getElementById('result');
var finalscore = document.getElementById('finalScore');
var gameover = document.getElementById('gameover');
var quizQuestions = document.getElementById('questions');
var timer = document.getElementById('timer');
var beginQuizBtn = document.getElementById('startbtn');
var beginQuiz = document.getElementById('beginning');
var highscoreSection = document.getElementById('leaderboards');
var highscore = document.getElementById('highscores-page');
var highscoreName = document.getElementById('initials');
var highscoreNameDisplay = document.getElementById('highscore-initials');
var endQuizBtn = document.getElementById('endQuizBtn');
var subScoreBtn = document.getElementById('submitScore');
var showHighscores = document.getElementById('highscore-score');
var aButton = document.getElementById('a');
var bButton = document.getElementById('b');
var cButton = document.getElementById('c');
var dButton = document.getElementById('d');

// quiz questions and answers
var questions = [{
    question: 'What does API stand for?',
    answerA: 'Application Programming Interface',
    answerB: 'Application Program Interface',
    answerC: 'Advanced Program Integration',
    answerD: 'Advanced Programming Interface',
    correctAnswer: 'a'
  },
  {
    question: 'Which HTTP method is typically used to retrieve data from an API?',
    answerA: 'Post',
    answerB: 'Put',
    answerC: 'Get',
    answerD: 'Delete',
    correctAnswer: 'c'
  },
  {
    question: 'What is JSON?',
    answerA: 'JavaScript Object Notation',
    answerB: 'Java Server Oriented Network',
    answerC: 'JavaScript Open Network',
    answerD: 'Java Source Object Naming',
    correctAnswer: 'a'
  },
  {
    question: 'Which HTTP method is used to create a new resource using an API?',
    answerA: 'Get',
    answerB: 'Post',
    answerC: 'Put',
    answerD: 'Delete',
    correctAnswer: 'b'
  },
  {
    question: 'What does a 404 HTTP status code indicate?',
    answerA: 'Unauthorized Access',
    answerB: 'Page not found',
    answerC: 'Internal server error',
    answerD: 'Successful request',
    correctAnswer: 'b'
  }
];

// initialize variables for quiz questions, current question, timer, score, and correct
var finalQuestion = questions.length;
var currentQuestion = 0;
var timeLeft = 90;
var timerInterval;
var score = 0;
var correct;

// generate a quiz question and update the UI with the question and answer options
function generateQuizQuestion() {
  gameover.style.display = "none";

  if (currentQuestion === finalQuestion) {
    return showScore();
  }
  var currentQuestionObject = questions[currentQuestion];
  quizQuestions.innerHTML = "<p>" + currentQuestionObject.question + "</p>";
  aButton.innerHTML = currentQuestionObject.answerA;
  bButton.innerHTML = currentQuestionObject.answerB;
  cButton.innerHTML = currentQuestionObject.answerC;
  dButton.innerHTML = currentQuestionObject.answerD;

}

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
  gameover.style.display = "none";
  beginQuiz.style.display = "none";
  generateQuizQuestion();

  //Timer
  timerInterval = setInterval(function() {
    timeLeft--;
    timer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}