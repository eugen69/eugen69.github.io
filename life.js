var wGlob, hGlob, timerId;
var fieldArray=[];
var millisecond=1000;
var cellSize=8;
var liveColor="rgb(9, 171, 63)";
var deadColor="rgb(255, 255, 255)";

function changeSize(){
 //if (timerId!=null){
  //clean();  }
   var newSize=document.getElementById("sizeRange").value;
   var isAlive=isAnybodyLiveHere();
   if (isAlive) {
    makeArrayFromTable();
    displayEmptyTable(newSize, newSize);
    renderLast();
   } else {
    displayEmptyTable(newSize, newSize);
   }
}

function changeSpeed(){
 var level=document.getElementById("speedRange").value;
 millisecond=Math.floor(2000/level);
 if (document.getElementById("playPauseButton").value=="Pause"){
  clearInterval(timerId); //if game already plays
 timerId=null;
 playPause(true);
 }
}

function displayEmptyTable(width, height) {
 //if (timerId!=null){
 // clean();  }
 document.getElementById("divField").innerHTML="";
 wGlob=width;
 hGlob=height;
 var emptyTable = document.createElement("table");
  emptyTable.setAttribute("rules", "all");
  emptyTable.setAttribute("style", "border:1px solid black");
  emptyTable.setAttribute("id","currentTab");
  emptyTable.addEventListener("click", onClickCell, false);
 for(var i = 0; i < height; i++) {
        var row = emptyTable.insertRow(i);
        for (var j = 0; j < width; j++){
            var cell = row.insertCell(j);
            cell.width=cellSize;
            cell.height=cellSize;
            cell.id="".concat(j,i);//x y
        }     
    }
document.getElementById("divField").appendChild(emptyTable);
}

function onClickCell(event){
  if (!event) event = window.event;
  var cellid=event.target.id;
  if (document.getElementById(cellid).style.backgroundColor===liveColor)
   {
    document.getElementById(cellid).style.backgroundColor=deadColor;
    }
else {
 document.getElementById(cellid).style.backgroundColor = liveColor;}
}

function playPause(speedChange){
 if (document.getElementById("playPauseButton").value=="Play"||speedChange){
  timerId=setInterval(step, millisecond);
  document.getElementById("playPauseButton").value="Pause";
 } else {
 clearInterval(timerId);
 timerId=null;
 document.getElementById("playPauseButton").value="Play";
}
}

function step() {
 readCurrentGFromTableToArray();
 var isLive=isLiveNextG();
   if (isLive) {
  makeNextG();
  paintNextGFromArrayToTable();
  } else {
   alert ('No live beings');
   clean();
  }
}

function clean(){
 clearInterval(timerId);
 timerId=null;
 fieldArray=null;
 document.getElementById("playPauseButton").value="Play";
 displayEmptyTable(wGlob, hGlob);
}

function readCurrentGFromTableToArray() {
var matrix=[];
for (i=0; i < document.getElementById("currentTab").rows.length; i++) {
			matrix[i]=[];
			for (j=0; j < document.getElementById("currentTab").rows[i].cells.length; j++) {
				   if (document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor==liveColor)    {
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
   if (document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor===liveColor) {
	 return true;	 } 	 
	 }
	 }
  return false;
	 }
  
function paintNextGFromArrayToTable() {
       for (i=0; i<hGlob; i++){
           for (j=0; j<wGlob; j++){
             if (fieldArray[i][j]) {
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
        fieldArray=copy(newField);
        newField=null;
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