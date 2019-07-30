'use strict';

var modalEl = document.getElementById('modal');
var selectionsEl = document.getElementById('selections');
var formEl = document.getElementById('gameForm');
var imgEl = document.getElementById('heroImage');

var questArray = [];
var getPrompt = document.getElementById('prompt');

var currentQuest = 1;
var userName = '';
var genderId = '';

function Question( question, firstAnswer, secondAnswer, displayImg, endsGame) {
  this.question = question;
  this.firstAnswer = firstAnswer;
  this.secondAnswer = secondAnswer;
  this.displayImg = displayImg;
  this.endsGame = endsGame;

  questArray.push(this);
}

new Question('what is meaning of life?', 2, 3, 'https://via.placeholder.com/300x375', false);
new Question('what is food?', 4, 5, 'https://via.placeholder.com/300x375', false);
new Question('placeholder3', 5, 6, 'https://via.placeholder.com/300x375', false);
new Question('placeholder4', 7, 8, 'https://via.placeholder.com/300x375', false);
new Question('placeholder5', 8, 9, 'https://via.placeholder.com/300x375', false);
new Question('placeholder6', 9, 10, 'https://via.placeholder.com/300x375', false);
new Question('placeholder7', 11, 13, 'https://via.placeholder.com/300x375', false);
new Question('placeholder8', 11, 12, 'https://via.placeholder.com/300x375', false);
new Question('placeholder9', 12, 13, 'https://via.placeholder.com/300x375', false);
new Question('placeholder10', 11, 13, 'https://via.placeholder.com/300x375', false);
new Question('placeholder11', 14, 15, 'https://via.placeholder.com/300x375', false);
new Question('placeholder12', 14, 15, 'https://via.placeholder.com/300x375', false);
new Question('placeholder13', 14, 15, 'https://via.placeholder.com/300x375', false);
new Question('placeholder14', 5, 6, 'https://via.placeholder.com/300x375', true);
new Question('placeholder15', 5, 6, 'https://via.placeholder.com/300x375', true);


// Switching modal start game
formEl.addEventListener('submit', function(e){
  e.preventDefault();

  //getting input data from form
  userName = e.target.userName.value;
  genderId = e.target.pronoun.value;

  //input validation
  if(userName.length === 0 || genderId.length === 0){
    alert('Please input a name and choose a pronoun');
  } else {
    //switching the modal off
    modalEl.style.display = 'none';
    selectionsEl.style.display = 'block';
  }
});

function playGame() {
  //updating html based on the currentQuest value - 1
  getPrompt.textContent = questArray[currentQuest - 1].question;
  imgEl.src = questArray[currentQuest - 1].displayImg;

  //checking for end of game
  if(questArray[currentQuest - 1].endsGame === false) {
    selectionsEl.addEventListener('click', handleChoice);
  }else{
    selectionsEl.removeEventListener('click', handleChoice);
  }
}

function handleChoice(event) {
  //if the first option is targeted set current quest to the first link
  if(event.target.id === 'firstOption') {
    currentQuest = questArray[currentQuest - 1].firstAnswer;

  //if the second option is targeted set current quest to the second link
  } else if(event.target.id === 'secondOption') {
    currentQuest = questArray[currentQuest - 1].secondAnswer;
  }
  playGame();
}

playGame();
