'use strict';

var modalEl = document.getElementById('modal');
var selectionsEl = document.getElementById('selections');
var formEl = document.getElementById('gameForm');
var userName = '';
var genderId = '';

// Switching modal start game
formEl.addEventListener('submit', function(e){
  e.preventDefault();
  userName = e.target.userName.value;
  genderId = e.target.pronoun.value;
  console.log(userName, genderId);
  modalEl.style.display = 'none';
  selectionsEl.style.display = 'block';
});

// // Constructor function for page layout
// function Story(content,image,linkOne,linkTwo,contentOne,contentTwo){
//   document.getElementById('prompt').textContent(content);
//   document.getElementById('heroImage').src=(image);
//   document.getElementById('firstOption').textContent(contentOne);
//   document.getElementById('secondOption').textContent(contentTwo);s
// }