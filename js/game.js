'use strict';

var buttonEl = document.getElementById('gamestart');
var modalEl = document.getElementById('modal');
var selectionsEl = document.getElementById('selections');

// buttonEl.onclick(console.log('click'));

function startGame(event){
  event.preventDefault();
  console.log('clicked');
  modalEl.style.display = 'none';
  selectionsEl.style.display = 'block';
}

buttonEl.addEventListener('click', startGame);
