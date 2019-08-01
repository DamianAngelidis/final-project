
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

// **********Executable Code*************
var scoreData = loadData('score');

//sorts data in decending order
scoreData.sort(function(a,b){
  if(a.score < b.score){
    return 1;
  }else if(a.score > b.score){
    return -1;
  }else{
    return 0;
  }
});

//makes a row and writes the name and score per row
for(var i = 0; i < scoreData.length; i++){
  var trEl = document.createElement('tr');
  tableBodyEl.appendChild(trEl);

  addElement('td', scoreData[i].name, trEl);
  addElement('td', scoreData[i].score, trEl);
}
