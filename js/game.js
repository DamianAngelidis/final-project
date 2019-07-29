'use strict';

var buttonEl = document.getElementById('gamestart');
var modalEl = document.getElementById('modal');
var selectionsEl = document.getElementById('selections');
var formEl = document.getElementById('gameForm');
var userName = '';
var genderId = '';

formEl.addEventListener('submit', function(e){
  e.preventDefault();
  userName = e.target.userName.value;
  genderId = e.target.pronoun.value;
  console.log(userName, genderId);
  modalEl.style.display = 'none';
  selectionsEl.style.display = 'block';
});
