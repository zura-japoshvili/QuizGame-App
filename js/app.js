
const questionElem = document.querySelector(".question");
const ques_cont = document.querySelectorAll(".ques-cont");
const answer_btn = document.querySelectorAll(".answer");
const loading = document.getElementById("loading");
const question_progress = document.querySelector(".question-prog");
const score_n = document.querySelector('.score-n');
const end_quiz = document.querySelector('.end-quiz');
const lastScore = document.querySelector(".ls-n");


const questions = [
    {
      question: 'Which country operationalized world’s largest radio telescope?',
      answers: [
        { text: 'USA', correct: false },
        { text: 'China', correct: true },
        { text: 'Russia', correct: false },
        { text: 'India', correct: false }
      ]
    },
    {
      question: 'Katerina Sakellaropoulou was elected the first woman President of',
      answers: [
        { text: 'Spain', correct: false },
        { text: 'Greece', correct: true },
        { text: 'Finland', correct: false },
        { text: 'Turkey', correct: false }
      ]
    },
    {
        question: 'Which one among the following radiations carries maximum energy?',
        answers: [
          { text: 'Ultraviolet rays', correct: false },
          { text: 'Infra-red rays', correct: true },
          { text: 'Gamma rays', correct: false },
          { text: 'X- rays', correct: false }
        ]
    },
    {
        question: 'The head quarters of world trade organization is in',
        answers: [
          { text: 'Montreal', correct: false },
          { text: 'Seattle', correct: false },
          { text: 'Geneva', correct: true },
          { text: 'the Hague', correct: false }
        ]
    },
    {
        question: 'The 2014 football world cup is scheduled to be held in',
        answers: [
          { text: 'Brazil', correct: true },
          { text: 'China', correct: false },
          { text: 'Australia', correct: false },
          { text: 'Japan', correct: false }
        ]
    },
    {
        question: 'Nobel prize is awarded for which of the following disciplines:',
        answers: [
          { text: 'Literature, peace and economics', correct: false },
          { text: 'Medicine or Physiology', correct: false },
          { text: 'Chemistry and Physics', correct: false },
          { text: 'All the above', correct: true }
        ]
    },
    {
        question: 'Entomology studies what?',
        answers: [
          { text: 'Behavior of human beings', correct: false },
          { text: 'Insects', correct: true },
          { text: 'The origin and history of technical and scientific terms', correct: false },
          { text: 'The formation of rocks', correct: false }
        ]
    },
    {
        question: 'Galileo was an astronomer who',
        answers: [
          { text: 'developed the telescope', correct: false },
          { text: 'discovered that the movement of pendulum produces a regular time measurement', correct: false },
          { text: 'discovered four satellites of Jupiter', correct: true },
          { text: 'All the above.', correct: false }
        ]
    },
    {
        question: 'Who is the father of geometry?',
        answers: [
          { text: 'Pythagoras', correct: true },
          { text: 'Aristotle', correct: false },
          { text: 'Euclid', correct: false },
          { text: 'Kepler', correct: false }
        ]
    },
    {
        question: 'The World Largest desert is ?',
        answers: [
          { text: 'Thar', correct: false },
          { text: 'Sahara', correct: true },
          { text: 'Kalahari', correct: false },
          { text: 'Sonoran', correct: false }
        ]
    }

];

const MAX_QUESTION = questions.length;
let score = 0;
let questionIndex = 0;
let setLoading = 0
let currentQuestion = 0;
let correctAnswer;

let scoreStorage = [];

window.addEventListener('load', startGame);

function startGame(){
    end_quiz.classList.remove("end-quiz-show");
    showQuestion();
}

function showQuestion(){
    if(questionIndex < MAX_QUESTION){
        setLoading ++;
        currentQuestion++;
        loading.style.width = `${(setLoading/MAX_QUESTION) * 100}%`;
        question_progress.textContent = `${currentQuestion}/${MAX_QUESTION}`;
        questionElem.textContent = questions[questionIndex].question;
        for(let i = 0;i<4;i++){
            answer_btn[i].textContent = questions[questionIndex].answers[i].text;
            if(questions[questionIndex].answers[i].correct === true){
                correctAnswer = i+1;
            }
        }
        questionIndex++;
    }
    else{
        scoreStorage.push(score);
        scoreStorage.sort(function(a, b){
          return b - a;
        });
        localStorage.setItem("myArray",  JSON.stringify(scoreStorage));
        let getScoreStorage = JSON.parse(localStorage.getItem("myArray"));
        console.log(getScoreStorage);
        resetFunc();
    }
}

function checkQuestion(arg){
    if(arg == correctAnswer){
        score += 100;
    }else{
        score += 20;
    }
    score_n.innerText = score;
    showQuestion();
}

function resetFunc(){
    end_quiz.classList.add("end-quiz-show");
    lastScore.textContent = score;
    score = 0;
    questionIndex = 0;
    setLoading = 0
    currentQuestion = 0;
    correctAnswer = '';
    score_n.innerText = '';
}
