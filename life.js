var wGlob, hGlob;
var allFields=new Array();

function make(width, height) {//height-y, width-x
wGlob=width;
hGlob=height;
document.getElementById("divField").innerHTML=""; //clean previous field
var table = document.createElement("table");
table.setAttribute("border", "1");
table.setAttribute("rules", "all");
table.setAttribute("id", "currentTab");
table.addEventListener("click", onClickCell,false);
 for(var i = 0; i < height; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < width; j++){
            var cell = row.insertCell(j);
            cell.width="8";
            cell.height="8";
            cell.id="".concat(j,i);//x y
        }     
    }
document.getElementById("divField").appendChild(table);
}

function onClickCell(event){
  if (!event) event = window.event;
  var cellid=event.target.id;
  if (document.getElementById(cellid).style.backgroundColor=="rgb(9, 171, 63)"||document.getElementById(cellid).style.backgroundColor=="#09ab3f")
 { document.getElementById(cellid).style.backgroundColor="#ffffff";} //rgb(255, 255, 255)
else { document.getElementById(cellid).style.backgroundColor = "#09ab3f";}
}


 function live() {
getFieldFromUser();
step();
render();
}

function getFieldFromUser() {//+
var matrix=[];
for (i=0; i < document.getElementById("currentTab").rows.length; i++) {
            matrix[i]=[];
            for (j=0; j < document.getElementById("currentTab").rows[i].cells.length; j++) {
                   if (document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor==="rgb(9, 171, 63)")    {
     matrix[i][j]=true;
     }
    else {
     matrix[i][j]=false;//y x
     }
            }
        }
        allFields.push(matrix);
 }

function render() {
       for (i=0; i<hGlob;i++){
           for (j=0;j<wGlob;j++){
             if (allFields[allFields.length-1][i][j]) {
              document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor="rgb(9, 171, 63)";
             } else {
              document.getElementById("currentTab").rows[i].cells[j].style.backgroundColor="rgb(255, 255, 255)";
             }
           }
       }  
}

function step() {//+
 var newField=[];
         for (h = 0; h < hGlob; h++) {
            newField[h]=[];
            for (w = 0; w < wGlob; w++) {
                 var n=countN(h,w);
                 if (n == 3) {// from here
                 newField[h][w] = true;
                 } else if (n == 2 && allFields[allFields.length-1][h][w]) {
                  newField[h][w] = true;
                 } else {
                  newField[h][w] = false;
                 }
            }
        }
        allFields.push(newField);
 }

 function countN(y, x) {//+
        var up = (y == 0) ? hGlob - 1 : y - 1;
        var down = (y == hGlob - 1) ? 0 : y + 1;
        var left = (x == 0) ? wGlob - 1 : x - 1;
        var right = (x == wGlob - 1) ? 0 : x + 1;
        var count = 0;
        var f=allFields.length-1;
        if (allFields[f][up][left]) {count++;}
        if (allFields[f][up][x]) { count++;}
        if (allFields[f][up][right]) {count++;}
        if (allFields[f][y][left]) { count++;}
        if (allFields[f][y][right]) {count++;}
        if (allFields[f][down][left]) {count++;}
        if (allFields[f][down][x]) {count++;}
        if (allFields[f][down][right]) { count++;}
        return count;
}



