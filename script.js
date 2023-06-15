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

// This function is the end page screen that displays your score after either completing the quiz or upon timer run out
function showScore() {
    quizBody.style.display = "none";
    gameover.style.display = "flex";
    clearInterval(timerInterval);
    highscoreName.value = "";
    finalscore.innerHTML = "You got " + score + " out of " + questions.length + " correct!";
  }
  
  // On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local storage
  // as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
  subScoreBtn.addEventListener("click", function highscore() {
    if (highscoreName.value === "") {
      alert("Initials cannot be blank");
      return false;
    } else {
      var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
      var currentUser = highscoreName.value.trim();
      var currentHighscore = {
        name: currentUser,
        score: score
      };
  
      gameover.style.display = "none";
      highscoreSection.style.display = "flex";
      highscore.style.display = "block";
      endQuizBtn.style.display = "flex";
  
      savedHighscores.push(currentHighscore);
      localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
      generateHighscores();
    }
  });

  // This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
  highscoreNameDisplay.innerHTML = "";
  showHighscores.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreNameDisplay.appendChild(newNameSpan);
    showHighscores.appendChild(newScoreSpan);
  }
}

// This function displays the high scores page while hiding all of the other pages
function showHighscore() {
  beginQuiz.style.display = "none";
  gameover.style.display = "none";
  highscoreSection.style.display = "flex";
  highscore.style.display = "block";
  endQuizBtn.style.display = "flex";

  generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
  window.localStorage.clear();
  highscoreNameDisplay.textContent = "";
  showHighscores.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
  highscoreSection.style.display = "none";
  gameover.style.display = "none";
  beginQuiz.style.display = "flex";
  timeLeft = 90;
  score = 0;
  currentQuestion = 0;
}

// This function checks the response to each answer
function checkAnswer(answer) {
  correct = questions[currentQuestion].correctAnswer;

  if (answer === correct && currentQuestion !== finalQuestion) {
    score++;
    alert("That Is Correct!");
    currentQuestion++;
    generateQuizQuestion();
  } else if (answer !== correct && currentQuestion !== finalQuestion) {
    alert("That Is Incorrect.");
    currentQuestion++;
    generateQuizQuestion();
  } else {
    showScore();
  }
}

// This button starts the quiz!
beginQuizBtn.addEventListener("click", startQuiz);