var wGlob, hGlob, timerId, colorTimerId;
var fieldArray=[];
var millisecond=1000;
var cellSize=8;
var liveColor="rgb(9, 171, 63)";
var deadColor="rgb(255, 255, 255)";
var allSteps=[];
var rgbA=[104,255,0];
var grow=true;
var acorn=[[false,true,false,false,false,false,false],[false,false,false,true, false,false,false],[true,true, false,false,true,true,true]];
var glider=[[false,false,false,true, false,false,false],[false,false,false,false, true, false,false],[false,false,true,true,true,false,false]];
var r=[[false,false,false,true,true,false,false],[false,false,true,true,false,false,false],[false,false,false,true, false,false,false]];

function changeSize(){
    pauseGame();// add last table to array
    var newSize=document.getElementById("sizeRange").value;
    var difference=newSize-wGlob;
    displayEmptyTable(newSize, newSize);
    paintNextGFromArrayToTable(difference);
    if (document.getElementById("playPauseButton").value=="Pause"){
     startGame();}
}

function changeSpeed(){
 pauseGame();
 millisecond=Math.floor(2000/document.getElementById("speedRange").value);
   if (document.getElementById("playPauseButton").value=="Pause"){
 startGame();}
}

function changeColor(){
 rgbA[0]=20+(Math.floor(Math.random() * 190));
 colorTimerId=setInterval(multicolored, 200);
}

function multicolored() {
 if (rgbA[1]>1){
  if (grow){
   rgbA[2]=rgbA[2]+2;
   if (rgbA[2]>240) {
    grow=false;
    rgbA[1]=rgbA[1]-1;
   }
  } else {
   rgbA[2]=rgbA[2]-2;
   if (rgbA[2]<1) {
    grow=true;
    rgbA[1]=rgbA[1]-1;
   }
  }
 } else {
  rgbA[1]=rgbA[1]+240;
  }
 var hue = 'rgb(' + rgbA[0] + ',' + rgbA[1] + ',' + rgbA[2] + ')';
 liveColor = hue;
}

function displayEmptyTable(width, height) {
 document.getElementById("divField").innerHTML="";
 wGlob=width;
 hGlob=height;
 var emptyTable = document.createElement("table");
  emptyTable.setAttribute("rules", "all"); //all
  emptyTable.setAttribute("style", "border:1px solid black");
  emptyTable.setAttribute("id","currentTab");
  emptyTable.addEventListener("click", onClickCell, false);
 for(var i = 0; i < height; i++) {
        var row = emptyTable.insertRow(i);
        for (var j = 0; j < width; j++){
            var cell = row.insertCell(j);
            cell.width=cellSize;
            cell.height=cellSize;
            cell.id="".concat(j,' ',i);//x y
            cell.style.backgroundColor=deadColor;
        }     
    }
document.getElementById("divField").appendChild(emptyTable);
}

function onClickCell(event){
  if (!event) event = window.event;
  var cellid=event.target.id;
  if (document.getElementById(cellid).style.backgroundColor==deadColor)
   {
    document.getElementById(cellid).style.backgroundColor=liveColor;
    }
else {
 document.getElementById(cellid).style.backgroundColor = deadColor;}
}

function playPause(){
   if (document.getElementById("playPauseButton").value=="Play"){
     if (document.getElementById("multicolor").checked==true){
      changeColor();
      } else {
       clearInterval(colorTimerId);
       colorTimerId=null;
       liveColor="rgb(9, 171, 63)";
       }
          startGame();
          document.getElementById("playPauseButton").value="Pause";
 } else {
  pauseGame();
  document.getElementById("playPauseButton").value="Play";
}
}

function startGame(){
  millisecond=Math.floor(2000/document.getElementById("speedRange").value);
  timerId=setInterval(step, millisecond);
}

function pauseGame(){
 readCurrentGFromTableToArray();
 clearInterval(timerId);
 timerId=null;
 clearInterval(colorTimerId);
       colorTimerId=null;
}

function preset(name){
 clean();
 var h=Math.floor(hGlob/2)-3;
   if (name=="acorn"){
    printPreset(acorn, h);
   } else if (name=="glider") {
    printPreset(glider,h);
   }  else if (name=="r") {
    printPreset(r,h);
    }
 
}

function printPreset(array, place){
 for (i=0; i<3; i++){
     for(j=0;j<7;j++){
       if(array[i][j]){
          document.getElementById("currentTab").rows[i+place].cells[j+place].style.backgroundColor=liveColor;    }}}
}

function step() {
 readCurrentGFromTableToArray();
 var isLive=isLiveNextG();
   if (isLive) {
  var isEqual=makeNextG();
  var s=allSteps.length;
  document.getElementById("stepCounter").innerHTML=s;
  if (isEqual) {
   document.getElementById("playPauseButton").value="Play";
   alert ('Game over. Steps repeat each over');
   clearInterval(timerId);
   timerId=null;
   clearInterval(colorTimerId);
   colorTimerId=null;
  } else {
   paintNextGFromArrayToTable(0);
  }
   } else {
   alert ('Game over. No live beings');
   clean();
  }
}

function clean(){
 clearInterval(timerId);
 timerId=null;
 fieldArray=null;
 allSteps=[];
 clearInterval(colorTimerId);
 colorTimerId=null;
 rgbA=[104,255,0];
 grow=true;
 liveColor="rgb(9, 171, 63)";
 document.getElementById("playPauseButton").value="Play";
 document.getElementById("stepCounter").innerHTML="0";
 displayEmptyTable(wGlob, hGlob);
}

function readCurrentGFromTableToArray() {
var matrix=[];
for (i=0; i < document.getElementById("currentTab").rows.length; i++) {
			matrix[i]=[];
			for (j=0; j < document.getElementById("currentTab").rows[i].cells.length; j++) {
				   if (document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor!=deadColor)    {
	 matrix[i][j]=true;
	 }
	else {
	 matrix[i][j]=false;//y x
	 }
			}
		}
		fieldArray=copy(matrix);
 }

function isLiveNextG(){
 for (i=0; i < document.getElementById("currentTab").rows.length; i++) {
  for (j=0; j < document.getElementById("currentTab").rows[i].cells.length; j++) {
   if (document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor!=deadColor) {
	 return true;	 } 	 
	 }
	 }
  return false;
	 }
   
function paintNextGFromArrayToTable(difference) {
  var left=Math.floor(difference/2);
  var right=difference-left;
  var start=0;
  var fin=hGlob;
  if (difference>0){
   start=left;
   fin=hGlob-right;
  }
    for (i=start; i<fin; i++){
           for (j=start; j<fin; j++){
             if (fieldArray[i-left][j-left]) {
              document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor=liveColor;
             } else {
              document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor=deadColor;
             }
           }
       }       
}

function makeNextG() {
 var newField=[];
         for (h = 0; h < hGlob; h++) {
            newField[h]=[];
            for (w = 0; w < wGlob; w++) {
                 var n=countNeighbours(h,w);
                 if (n == 3) {
                 newField[h][w] = true;
                 } else {
                  if (n == 2 && fieldArray[h][w]) {
                  newField[h][w] = true;
                 } else {
                  newField[h][w] = false;
                       }
                  }
            }
        }
        var isEqualSteps=compare(fieldArray,newField);
        allSteps.push(fieldArray);
        fieldArray=copy(newField);
        newField=null;
        return isEqualSteps;
 }
 
 function compare(array1,array2){
  if (array1.length==array2.length){
   for (h = 0; h < hGlob; h++) {
            for (w = 0; w < wGlob; w++) {
             if (array1[h][w]!=array2[h][w]){
              return false;
             }
            }
           }
  }
  return true;
 }

function copy(previousArray){
 var nextArray=[];
 for (i=0; i< previousArray.length; i++){
  nextArray[i]=[];
  for(j=0; j< previousArray[i].length;j++){
    nextArray[i][j]=previousArray[i][j];
  }
 }
  return nextArray;
}

function countNeighbours(y, x) {
        var up = (y == 0) ? hGlob - 1 : y - 1;
        var down = (y == hGlob - 1) ? 0 : y + 1;
        var left = (x == 0) ? wGlob - 1 : x - 1;
        var right = (x == wGlob - 1) ? 0 : x + 1;
        var count = 0;
        if (fieldArray[up][left]) {count++;}
        if (fieldArray[up][x]) { count++;}
        if (fieldArray[up][right]) {count++;}
        if (fieldArray[y][left]) { count++;}
        if (fieldArray[y][right]) {count++;}
        if (fieldArray[down][left]) {count++;}
        if (fieldArray[down][x]) {count++;}
        if (fieldArray[down][right]) { count++;}
        return count;
}