

const quizCategory = document.querySelector('.quiz-category'),
        startBtn = document.getElementById('start-game-btn'),
        quizDiff = document.querySelector('.quiz-diff'),
        gameContent = document.querySelector('.game-content'),
        startFrom = document.querySelector('.start-form'),
        nextQuestBtn = document.querySelector('.next-quest'),
        questionCont = document.querySelector('.question-main')
        question = document.querySelector('.question');

const MAX_QUESTION = 10;
let questionIndex = 0;
let difficulty,
    category;



function getRandomQuest(Arr){
    let length = Arr.length,
    randomQuest = [],
    i = 0;

    while(length --){
        i = Math.floor(Math.random() * (length +1 ));
        randomQuest.push(Arr[i]);
        Arr.splice(i, 1);
    }
    return randomQuest;
    
}


function makeAnswers (Arr, correct) {
    let content = '';
    Arr.forEach((value, index)=> {
        content += `<div class="ques-cont">
            <p class="q-w">${index + 1}. </p>
            <p class="answer">${value}</p>
        </div>`;
    });
    content += '<p class="next-quest">Next question</p>';
    questionCont.innerHTML = content;
}


function getCategories() {
    fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then(data => {
        const response = data.trivia_categories;
        let options = "<option class='categories'value=0>Any</option>";
        for(let i in response) {
            options += `<option class='categories'value=${response[i].id}>${response[i].name}</option>`;
        }
    });
}
getCategories();

function startQuizFunc() {
    startFrom.style.display = 'none';
    gameContent.style.display = 'flex';
    category = quizCategory.value;
    difficulty = quizDiff.value;
    generateRandomAnwsers()
}



function generateRandomAnwsers(){
    fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(response => response.json())
    .then(data =>{
        const response = data.results[0];
        let questionArr = [];
        let correctAnswer = response.correct_answer

        for(let i in response.incorrect_answers){
            questionArr.push(response.incorrect_answers[i]);
        }
        questionArr.push(correctAnswer);

        let randomQuestionArr = getRandomQuest(questionArr);

        makeAnswers(randomQuestionArr, correctAnswer);
    });
}

startBtn.addEventListener('click', startQuizFunc);