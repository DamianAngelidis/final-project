
var tableBodyEl = document.getElementsByTagName('tbody')[0];


//*************Functions************* */
//Add element function
function addElement(childElType, childText, ParentEl){
  var childEl = document.createElement(childElType);
  childEl.textContent = childText;
  ParentEl.appendChild(childEl);
}

function loadData(key){
  //Getting data then parsing
  var dataRaw = localStorage.getItem(key);
  var dataPretty = JSON.parse(dataRaw);
  return dataPretty;
}

function storeData(key, data) {
  var stringy = JSON.stringify(data);
  localStorage.setItem(key, stringy);
}

// **********Executable Code*************
var scoreData = loadData('score');

// var userName = scoreData.name;
// var score = scoreData.score;

//for i scoreData.length
//write to table

//This is example addition use this template to the local storage
var trEl = document.createElement('tr');
tableBodyEl.appendChild(trEl);

addElement('td', 'Damian', trEl);
addElement('td', '10', trEl);
