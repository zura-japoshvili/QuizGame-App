
const quizCategory = document.querySelector('.quiz-category'),
        startBtn = document.getElementById('start-game-btn'),
        quizDiff = document.querySelector('.quiz-diff'),
        gameContent = document.querySelector('.game-content'),
        startFrom = document.querySelector('.start-form'),
        nextQuestBtn = document.querySelector('.next-quest'),
        questionCont = document.querySelector('.question-main'),
        loading = document.querySelector('.loading'),
        question_progress = document.querySelector('.question-progress'),
        score = document.querySelector('.score-n'),
        unclickableBtn = document.querySelector('.unclickable'),
        playAgainBtn = document.querySelector('.play-again'),
        endGame = document.querySelector('.end-game'),
        lastScore = document.querySelector('.last-score');

const MAX_QUESTION = 10;
let questionIndex = 0;
let points = 0;
let difficulty,
    category,
    question = document.querySelector('.question');


//In this function we create and return an array in which the answers are stored in random positions
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
// End Game
function endQuizFunc(){
    endGame.style.display = 'flex';
    gameContent.style.display = 'none';
    lastScore.textContent = points;
};

// We create the answers and add them in HTML, 
// which once clicked the player no longer has the opportunity to answer the question a second time
function makeAnswers (Arr, correct) {
    let correct_answer = correct;
    let content = '';
    Arr.forEach((value, index)=> {
        content += `<button class="ques-cont btn_${index}">
            <p class="q-w">${index + 1}. &ensp;</p>
            <p class="answer answer_${index}">${value}</p>
        </button>`;
    }); 
    questionCont.innerHTML = content;

    const btn_1 = document.querySelector('.btn_0'),
        btn_2 = document.querySelector('.btn_1'),
        btn_3 = document.querySelector('.btn_2'),
        btn_4 = document.querySelector('.btn_3'),
        answer_1 = document.querySelector('.answer_0').textContent,
        answer_2 = document.querySelector('.answer_1').textContent,
        answer_3 = document.querySelector('.answer_2').textContent,
        answer_4 = document.querySelector('.answer_3').textContent;
    btn_1.addEventListener('click', function(){
        btn_1.disabled = true;
        btn_2.disabled = true;
        btn_3.disabled = true;
        btn_4.disabled = true;
        btnCheckerFunc(answer_1, correct_answer, btn_1)
    });
    btn_2.addEventListener('click', function(){
        btn_1.disabled = true;
        btn_2.disabled = true;
        btn_3.disabled = true;
        btn_4.disabled = true;
        btnCheckerFunc(answer_2, correct_answer, btn_2)
    });
    btn_3.addEventListener('click', function(){
        btn_1.disabled = true;
        btn_2.disabled = true;
        btn_3.disabled = true;
        btn_4.disabled = true;
        btnCheckerFunc(answer_3, correct_answer, btn_3)
    });
    btn_4.addEventListener('click', function() {
        btn_1.disabled = true;
        btn_2.disabled = true;
        btn_3.disabled = true;
        btn_4.disabled = true;
        btnCheckerFunc(answer_4, correct_answer, btn_4)
    });
    
}

// When a player answers a question, this function compares the correct answer and 
// calls the function (which function it calls depends on whether the answer is correct).
function btnCheckerFunc(answer, correct, btn){
    if(answer === correct){
        ifItsTrue(btn);
    }else{
        ifItsFalse(btn);
    }
}

// These two functions make the answer greener or redder (depending on whether it is correct or not) 
// and we already have the opportunity to go to the next question and call generateRandomAnwsers () again
function ifItsTrue(btn){
    points += 100;
    unclickableBtn.style.zIndex = "1";
    btn.style.backgroundColor = '#5ee073';
}
function ifItsFalse(btn) {
    points -= 20;
    unclickableBtn.style.zIndex = "1";
    btn.style.backgroundColor = '#c52d2d';
}

//We creating categories from this func
function getCategories() {
    fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then(data => {
        const response = data.trivia_categories;
        let options = "<option class='categories'value=0>Any</option>";
        for(let i in response) {
            options += `<option class='categories'value=${response[i].id}>${response[i].name}</option>`;
        }

        quizCategory.innerHTML = options;
    });
    
}
getCategories();


// The function with which the quiz begins
function startQuizFunc() {
    startFrom.style.display = 'none';
    gameContent.style.display = 'flex';
    category = quizCategory.value;
    difficulty = quizDiff.value;
    generateRandomAnwsers()
}

//This is the main function
//The function works until QuestionIndex isn't equals MAX_QUESTION
//Through the function we get incorrect and correct answers from the API and store them in an array


function generateRandomAnwsers(){
    if(questionIndex !== MAX_QUESTION){
        fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`)
        .then(response => response.json())
        .then(data =>{

            //Shows quiz progress
            questionIndex ++;
            loading.style.width = `${questionIndex * (100 / MAX_QUESTION)}%`;
            question_progress.textContent = `${questionIndex}/${MAX_QUESTION}`;
            // 
            score.textContent = points;

            unclickableBtn.style.zIndex = '3';

            const response = data.results[0];
            let questionArr = [];
            let correctAnswer = response.correct_answer
    
            question.innerHTML = response.question;
    
            for(let i in response.incorrect_answers){
                questionArr.push(response.incorrect_answers[i]);
            }
            questionArr.push(correctAnswer);
    
            let randomQuestionArr = getRandomQuest(questionArr);
    
            makeAnswers(randomQuestionArr, correctAnswer);
        });
    }else{
        endQuizFunc();
    }

}

startBtn.addEventListener('click', startQuizFunc);
nextQuestBtn.addEventListener('click', generateRandomAnwsers);

playAgainBtn.addEventListener('click', function(){
    points = 0;
    questionIndex = 0;
    endGame.style.display = 'none';
    startFrom.style.display = 'flex';
})
