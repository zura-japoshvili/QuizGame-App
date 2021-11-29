const quizCategory = document.querySelector('.quiz-category'),
        startBtn = document.getElementById('start-game-btn'),
        quizDiff = document.querySelector('.quiz-diff'),
        gameContent = document.querySelector('.game-content'),
        startFrom = document.querySelector('.start-form');




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




function generateQustion() {
    startFrom.style.display = 'none';
    gameContent.style.display = 'flex';
}
startFrom.addEventListener('click', generateQustion);
