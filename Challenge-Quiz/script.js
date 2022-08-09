var mainEl = document.getElementById('main');
var startBtn = document.getElementById('button');
var timerEl = document.getElementById('timer');
var highscoreEl = document.getElementById('highscore');
var overviewEl = document.getElementById('overview');
var timer = 60;
var currentQuestionIndex = 0;
var containerEl = document.getElementById('container');
var timerInterval;
var points = 0;
var highscores = JSON.parse(localStorage.getItem('userScore')) || [];
var displayHighscore = document.getElementById('displayHighscores');



var questions = [
    {
        question: 'An array correlates with which language?',
        options: ['HTML', 'Javascript', 'CSS', 'Jquery'],
        answer: 'Javascript'
    },
    {
        question: 'To call an element from an HTML to Javascript, you use which method?',
        options: ['querySelector', 'eventListener', 'mediaSelector', 'addClass'],
        answer: 'querySelector'
    },
    {
        question: 'What is a repository?',
        options: ['Language', 'API', 'Container for work', 'Website'],
        answer: 'Container for work'
    },
];



function renderCurrentQuestion() {
    containerEl.innerHTML = '';
    var currentQuestion = questions[currentQuestionIndex];

    var  header = document.createElement('h2');
    header.textContent = currentQuestion.question;
    containerEl.appendChild(header);

    var ulEl = document.createElement('ul');

    for (var i = 0; i < currentQuestion.options.length; i++) {
        var liEl = document.createElement('li'); 
        liEl.textContent = currentQuestion.options[i];
        ulEl.appendChild(liEl);
    }

    containerEl.appendChild(ulEl);

}

function renderHighScore () {
    var ulEl2 = document.createElement('ul');
    for (let i = 0; i < highscores.length; i++) {
        let listedHighscores = document.createElement('li');
        listedHighscores.textContent = highscores[i].initials+" - "+highscores[i].highscore
        ulEl2.appendChild(listedHighscores);
    } 
    console.log(ulEl2)
    displayHighscore.appendChild(ulEl2);
}

function endGame () {
    clearInterval(timerInterval);
    containerEl.innerHTML = '';

    var inputContainer = document.createElement('div');
    inputContainer.innerHTML = '<h2>Enter your initials</h2>';
    inputContainer.innerHTML += '<input id="initials" type="text" />';
    inputContainer.innerHTML += '<button id="submit">Submit</button>';

    containerEl.appendChild(inputContainer);
}


highscoreEl.addEventListener('click', function() {
    

    renderHighScore();

});

startBtn.addEventListener('click', function() {
    // overviewEl.innerHTML = '';

    renderCurrentQuestion();

    timerInterval = setInterval(function() {
        timerEl.textContent = timer;
        timer--;

        

        if (timer === -1) {
            endGame();
        }   
    }, 1000)
});

containerEl.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.matches('#submit')) {
       var initials = document.getElementById('initials').value;

       var userScore = {
        initials: initials,
        highscore: points
       };

       highscores.push(userScore);

       localStorage.setItem('userScore', JSON.stringify(highscores));

       renderHighScore();
       
    }
});

containerEl.addEventListener('click', function(event) {

    if (event.target.matches('li')) {
        var currentQuestion = questions[currentQuestionIndex];
        var userGuess = event.target.textContent; 
        if (userGuess === currentQuestion.answer) {
            points++;
        } else if (userGuess || currentQuestion.answer) {
            timer --;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex === questions.length) {
            endGame();
        } else {
            renderCurrentQuestion();
        }
        
    }

});