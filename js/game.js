'use strict';

var modalEl = document.getElementById('modal');
var selectionsEl = document.getElementById('selections');
var formEl = document.getElementById('gameForm');

var questArray = [];
var getPrompt = document.getElementById('prompt');

var currentQuest = 1;
var userName = '';
var genderId = '';

function Question( question, firstAnswer, secondAnswer) {
    this.question = question;
    this.firstAnswer = firstAnswer;
    this.secondAnswer = secondAnswer;

    questArray.push(this);
}

new Question('what is meaning of life?', 2, 3);
new Question('what is food?', 4, 5);
new Question('Am I alive?', 5, 6);


// Switching modal start game
formEl.addEventListener('submit', function(e){
  e.preventDefault();
  userName = e.target.userName.value;
  genderId = e.target.pronoun.value;
  console.log(userName, genderId);
  modalEl.style.display = 'none';
  selectionsEl.style.display = 'block';
});

function playGame() {
    getPrompt.textContent = questArray[currentQuest - 1].question;
    selectionsEl.addEventListener('click', handleChoice);
}

function handleChoice(event) {
    console.log('I am working', event.target.id);
    if(event.target.id === 'firstOption') {
        currentQuest = questArray[currentQuest - 1].firstAnswer;
    } else if(event.target.id === 'secondOption') {
        currentQuest = questArray[currentQuest - 1].secondAnswer;
    }
    console.log(event.target.id);

    playGame();
}

playGame();

// // Constructor function for page layout
// function Story(content,image,linkOne,linkTwo,contentOne,contentTwo){
//   document.getElementById('prompt').textContent(content);
//   document.getElementById('heroImage').src=(image);
//   document.getElementById('firstOption').textContent(contentOne);
//   document.getElementById('secondOption').textContent(contentTwo);s
// }