'use strict';

var modalEl = document.getElementById('modal');
var selectionsEl = document.getElementById('selections');
var gameOverEl = document.getElementById('gameOver');
var formEl = document.getElementById('gameForm');
var imgEl = document.getElementById('heroImage');
var getPrompt = document.getElementById('prompt');
var ansOneEl = document.getElementById('firstOption');
var ansTwoEl = document.getElementById('secondOption');
var betweenEl = document.getElementById('inBetween');
var scoreEl = document.getElementById('score');
var el = document.getElementById('backup');
var highEl = document.getElementById('finalMessage');

var header = document.getElementById('header');
var body = document.getElementById('main');

var questArray = [];
var currentQuest = 1;
var userName = '';
var genderId = '';
var score = 3000;
var scoreData = [];
var seconds = 0;

//Constructor Function - just stores data doesn't write anything
function Question( question, firstResponse, secondResponse, firstAnswer, secondAnswer, displayImg, endsGame, scoreDelta = 0) {
  this.question = question;
  this.firstResponse = firstResponse;
  this.secondResponse = secondResponse;
  this.firstAnswer = firstAnswer;
  this.secondAnswer = secondAnswer;
  this.displayImg = displayImg;
  this.endsGame = endsGame;

  this.scoreDelta = scoreDelta;
  questArray.push(this);
}

function storeData(key, data) {
  var stringy = JSON.stringify(data);
  localStorage.setItem(key, stringy);
}

function loadData(key){
  //Getting data then parsing
  var dataRaw = localStorage.getItem(key);
  var dataPretty = JSON.parse(dataRaw);
  return dataPretty;
}

function playGame() {
  //updating html based on the currentQuest value - 1
  getPrompt.textContent = questArray[currentQuest - 1].question;
  scoreEl.textContent = `The score is ${score}`;
  imgEl.src = questArray[currentQuest - 1].displayImg;
  ansOneEl.textContent = questArray[currentQuest - 1].firstResponse;
  ansTwoEl.textContent = questArray[currentQuest - 1].secondResponse;


  storeData('gameData', {
    currentQuest: currentQuest,
    userName: userName,
    genderId: genderId
  });
  //checking for end of game
  if(questArray[currentQuest - 1].endsGame === false) {
    selectionsEl.addEventListener('click', handleChoice);
  }else{
    selectionsEl.removeEventListener('click', handleChoice);
    selectionsEl.style.display = 'none';
    gameOverEl.style.display = 'block';
    highEl.textContent = questArray[currentQuest-1].question;
    localStorage.removeItem('gameData');
    //kicks out to high score page/end of game page
    scoreData.push({
      name: userName,
      score: score,
    });
    //loads the scores
    var localScore = loadData('score');

    //checking if there is score data
    if(!localScore){
      //if no stored data then store it.
      storeData('score', scoreData);
    } else {
      //if there is stored data then push to it
      localScore.push({
        name: userName,
        score: score,
      });

      //store the data after it is made
      storeData('score', localScore);
    }
  }
}

function glitchScreen() { //glitch screen code inspired by css tricks website
  console.log('hi');

  el.style.display = 'block';
  header.style.display = 'none';
  body.style.display = 'none';

  function incrementSeconds() {
    if(seconds === 0) {
      el.style.display = 'none';
      header.style.display = 'block';
      body.style.display = 'block';
    } else {
      console.log('hi');
      seconds += 1;
      console.log('hello', seconds, el);
    }
  }

  var counter = setInterval(incrementSeconds, 1000);
}

function handleChoice(event) {

  //if the first option is targeted set current quest to the first link
  if(event.target.id === 'firstOption') {
    currentQuest = questArray[currentQuest - 1].firstAnswer;
    score += questArray[currentQuest - 1].scoreDelta;

  //if the second option is targeted set current quest to the second link
  } else if(event.target.id === 'secondOption') {
    currentQuest = questArray[currentQuest - 1].secondAnswer;
    score += questArray[currentQuest - 1].scoreDelta;
  }

  if (currentQuest === 3 || currentQuest === 8) {
    ansTwoEl.className = 'show';
  }

  if(currentQuest === 2) {
    console.log('hey');
    glitchScreen();
  }

  playGame();
}

function handleBetween(event) {
  event.preventDefault();
  if(event.target.id === 'stay') {
    // assigning loaded data to app data
    currentQuest = userData.currentQuest;
    userName = userData.userName;
    genderId = userData.genderId;

    if (currentQuest === 3 || currentQuest === 8) {
      ansTwoEl.className = 'show';
    }

    if(currentQuest === 2) {
      console.log('hey');
      glitchScreen();
    }

    //switching the modal off
    modalEl.style.display = 'none';
    betweenEl.style.display = 'none';
    selectionsEl.style.display = 'block';

    playGame();
  } else {
    localStorage.removeItem('gameData');

    modalEl.style.display = 'block';
    betweenEl.style.display = 'none';
    selectionsEl.style.display = 'none';
  }
}

// Switching modal to start game
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
    playGame();
  }
});
//Question 1
new Question('As you get a better look at your surroundings, you notice all of your crewmates are gone. When you start to move, a shooting pain in your leg reminds you of your injury.Do you head to the comm room to try to make contact with someone, or do you head to the medbay for treatment?', 'Go to the comm room.', 'Go to the medbay', 2, 3, './img/crashed-plane.jpg', false, 0); //image from https://unsplash.com/photos/C2KtSsp-ziQ

//Question 2
new Question('You stumble your way to the nearby communication center. As you enter, you see a full first aid kit on the wall. You take the time to remove the metal, clean your wound, and stitch yourself up. You look at the communication array, or what’s left of it, as most is destroyed and useless. All of a sudden, the screen lights up, flickering with an unknown symbol. You hurry about the room, and as you remember how you haven’t seen a person, you are struck with hunger pains in your stomach. Do you head to the dormitory to find survivors, or to the mess hall to get food?', 'Go to the dormitory.', 'Go to the mess hall.', 4, 5, './img/glitch-screen.jpg', false, 1000); //image from https://www.publicdomainpictures.net/pictures/250000/velka/glitch-screen-17.jpg

//Question 3
new Question('Your journey to the medbay doesn’t last very long, as that wing of the ship has torn off. You remember there being a first aid kit in the mess hall. As you shuffle your way in that direction, a piece of goo falls to the floor. Do you continue towards the hall, or do you inspect the slime closer?', 'Go to the mess hall.', 'Inspect the slime.', 5, 6, './img/slime.jpeg', false, -500); //image from https://unsplash.com/photos/z0FbhQhpimI

//Question 4
new Question('You have no luck finding survivors. While in the dormitories, you see a pool of blood dripping onto the floor. It looks like a body was dragged onto the floor and out the exit door. Do you leave out the same exit door or look for escape pods?', 'Exit the ship', 'Find the escape pods.', 7, 8, './img/red-river.jpeg', false, 500); //image from https://unsplash.com/photos/lhnOvu72BM8

//Question 5
new Question('In the mess hall, you hear screeching from the walk-in freezer - the door is extremely dented. The screams stop as you approach. Do you open the door and fight whatever is in there or do you run to look for an escape pod?', 'Confront the unknown entity', 'Get to the escape pod', 9, 8, './img/rusty-white-door.jpeg', false, -1000); //image from https://unsplash.com/photos/pPjmohi1I2Y

//Question 6
new Question('The Goo rapidly engulfs your hand and climbs up to your elbow, chemically burning your tissues. Do you try to slice off the goo with your knife or cut off your own arm to save your torso?', 'Slice off the goo.', 'Slice off your arm.', 10, 9, './img/green-paint-both-hands.jpeg', false, -1500); //image from https://unsplash.com/photos/IhXrWDckZOQ

//Question 7
new Question('You exited the ship and follow the trail of blood toward a boulder on the planet. Carved at the entrance is that same strange symbol with a bloody handprint beside it. You reach up to inspect the symbol, the rock opens in front of you and a wall appears behind you. You are trapped. Do you pull out your blaster and shoot at the wall or do you walk deeper into the cavern?', 'Shoot your way out of the cave.', 'Travel further into it.', 11, 13, './img/wall-into-fog.jpeg', false, 750); //image from https://unsplash.com/photos/5cwPfMLqYs0

//Question 8
new Question('You get into an escape pod and the engine is not working. The diagnostic code reveals you need a part located across the ship. Some goo begins to climb up the side of the escape pod toward you. Do you jump out and go find the part or do you shoot your blaster at the goo?', 'Find the missing part.', 'Fend off the goo.', 12, 11, './img/plane-cockpit.jpeg', false, -500); //image from https://unsplash.com/photos/REZp_5-2wzA

//Question 9
new Question('After the traumatic episode, your arm is now missing. You press a cloth on your wound to prevent bleeding out. Shockingly, your blood will not clot and fills the cloth. In a panic, you run outside the ship - yelling for help. There is a cavern in front of you. Do you go back inside the ship, or run inside the cave?','Go into the ship', 'Go into the cave', 12, 13, './img/bloody-hand.jpg', false, 250); //image from https://www.flickr.com/photos/pandora_6666/4023705461

//Question 10
new Question('The goo burns the knife and moves toward your neck, engulfing your entire body. You die. ', '', '', 11, 13, './img/slime-on-head.jpg', true, -3000); //image from https://www.flickr.com/photos/slimed/4032750921

//Question 11
new Question('When you use your blaster, sparks fly out. It malfunctions and explodes. You die.', '', '', 14, 15, './img/hand-with-sparks.jpeg', true, -1500); //image from https://unsplash.com/photos/qijiWlQqjJM

//Question 12
new Question('You notice that almost every corridor in the ship is blanketed in amorphous goo. It is eroding whatever it touches. You exit the ship out of a small crack in the fuselage. A jagged piece of the ship cracks your helmet. All your oxygen leaks out leaving you to suffocate.', '', '', 14, 15, './img/helmet.jpeg', true, -2000); //image from https://unsplash.com/photos/dBaz0xhCkPY

//Question 13
new Question('Walk deep into the cavern. Your legs seem to move forward without your permission. As the light from the entrance behind you dims, you fight to turn back, but cannot resist. In front of you lies an alter. A single beam of light reveals an idol made of obsidian interlaid with various advanced circuit boards. You pick it up and feel (like getting possessed) Do you end your life or do you become possessed?', 'End it all.', 'Give in.', 14, 15, './img/cave-with-barely-any-light.jpeg', false, 2000); //image from https://unsplash.com/photos/HauxSOFvh6k

//Question 14
new Question('You sense a force pulling at your consciousness. With your last ounce of strength, you puncture your suit. As the poison gases of the atmosphere fills your lungs, you slowly drift off into oblivion.', '', '', 5, 6, './img/deep-sea-diver.jpeg', true, -10000); //image from; https://unsplash.com/photos/FkjsBSUCpT4

//Question 15
new Question('As this unknown being slowly enveloping your mind, you are privy to his plans for the universe, and your last moments are filled with terror.', '', '', 5, 6, './img/creepy.jpeg', true, 10000); //image from; https://unsplash.com/photos/zt8PJ6LT9Uw

var userData = loadData('gameData');
//if userData is null it will jump to else
if(userData){

  selectionsEl.style.display = 'none';
  modalEl.style.display = 'none';

  betweenEl.style.display = 'block';
  betweenEl.addEventListener('click', handleBetween);

}else{

  //turning off the game so the modal prompts for input
  selectionsEl.style.display = 'none';
}
