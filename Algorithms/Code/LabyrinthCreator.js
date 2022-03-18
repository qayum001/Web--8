let canv = document.getElementById("matrix");

canv.width = 1590;
canv.height = 1000;

let ctx = canv.getContext("2d");
let pointToDrow = new Array();
let rows = 159;
let columns = 99;
let lol = Labyrinth(matrixArray(rows, columns), rows, columns);
window.requestAnimationFrame(printPoint);
let indexToGetPoint = 0;

function Labyrinth(lab, rows, columns){
    let s = point(rand(1, rows / 2) * 2 - 1, rand(1, columns / 2) * 2 - 1);// s = start point
    pointToDrow.push(s);
    setPointType(lab, s.x, s.y, 0);
    
    let ways = new Array();
    if(isAvailable(s.x, s.y - 2, rows, columns)){
        ways.push(new point(s.x, s.y - 2));
    }
    if(isAvailable(s.x, s.y + 2, rows, columns)) {
        ways.push(new point(s.x, s.y + 2));
    }
    if(isAvailable(s.x - 2, s.y, rows, columns)){
        ways.push(new point(s.x - 2, s.y));
    }
    if(isAvailable(s.x + 2, s.y, rows, columns)){
        ways.push(new point(s.x + 2, s.y));
    }
    while(ways.length > 0){
        let getRandomPoint  = rand(0, ways.length);
        let curP = popIndex(ways, getRandomPoint);//current Point
        pointToDrow.push(curP);
        if (lab[curP.x][curP.y] == 0){
            continue;
        }            
        setPointType(lab, curP.x, curP.y, 0);
        let Direction = ['l', 't', 'r', 'b'];
        while(Direction.length > 0){
            let dir = rand(0, Direction.length);
            switch(Direction[dir]){
                case 'l':
                    if(isAvailable(curP.x - 2, curP.y, rows, columns) && isClear(lab, curP.x - 2, curP.y)){
                        setPointType(lab, curP.x - 1, curP.y, 0);
                        pointToDrow.push(new point(curP.x - 1, curP.y));
                        Direction = [];
                    }
                break;
                case 't':
                    if(isAvailable(curP.x, curP.y - 2, rows, columns) && isClear(lab, curP.x, curP.y - 2)){
                        setPointType(lab, curP.x, curP.y - 1, 0)
                        pointToDrow.push(new point(curP.x, curP.y - 1));
                        Direction = [];
                    }
                break;
                case 'r':
                    if(isAvailable(curP.x + 2, curP.y, rows, columns) && isClear(lab, curP.x + 2, curP.y)){
                        setPointType(lab, curP.x + 1, curP.y, 0);
                        pointToDrow.push(new point(curP.x + 1, curP.y));
                        Direction = [];
                    }
                break;
                case 'b':
                    if(isAvailable(curP.x, curP.y + 2, rows, columns) && isClear(lab, curP.x, curP.y + 2)){
                        setPointType(lab, curP.x, curP.y + 1, 0);
                        pointToDrow.push(new point(curP.x, curP.y + 1));
                        Direction = [];
                    }
                break;
            }
            Direction.splice(dir, 1);
        }
        if(isAvailable(curP.x - 2, curP.y, rows, columns) && isWall(lab, curP.x - 2, curP.y)){
            ways.push(new point(curP.x - 2, curP.y));
        }
        if(isAvailable(curP.x, curP.y - 2, rows, columns) && isWall(lab, curP.x, curP.y - 2)){
            ways.push(new point(curP.x, curP.y - 2));
        }
        if(isAvailable(curP.x + 2, curP.y, rows, columns) && isWall(lab, curP.x + 2, curP.y)){
            ways.push(new point(curP.x + 2, curP.y));
        }
        if(isAvailable(curP.x, curP.y + 2, rows, columns) && isWall(lab, curP.x, curP.y + 2)){
            ways.push(new point(curP.x, curP.y + 2));
        }
    }
    if (rows % 2 == 0)
        lab = fixedRow(lab, rows, columns)
    if (columns % 2 == 0)
        lab = fixedColumn(lab, rows, columns)
    return lab;
}
function printPoint(){
    console.log(pointToDrow.length);
    let currentPoint = pointToDrow[indexToGetPoint];
    indexToGetPoint++;
    ctx.fillStyle = 'gray';
    ctx.fillRect(currentPoint.x*10, currentPoint.y*10, 10, 10);
    if(indexToGetPoint < pointToDrow.length){
        window.requestAnimationFrame(printPoint);
    }
}
function matrixArray(rows, columns) {//returns a matrix filled with Walls
    let arr = new Array();
    for(let i = 0; i < rows; i++) {
        arr[i] = new Array();
        for(let j = 0; j < columns; j++) {
            arr[i][j] = 1;
        }
    }
    return arr;
}
function point(x, y){
    return {
        x: x = x,
        y: y = y,
    };
}
function isAvailable(x, y, rows, columns) {//returns true if point is not out of matrix 
    if (0 <= x && 0 <= y && x < (rows) && y < (columns)){
        return true;
    }
    else{
        return false;
    }
}
function setPointType(array, x, y, param){//makes point 1->Wall or 0->Empty
    array[x][y] = param;
}
function rand(min, max){//random int
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}
function popIndex(arr, index){//returns and removes arr[index]
    let a = arr[index];
    arr.splice(index, 1);
    return a;
}
function isWall(arr, x, y){// check wall(1)
    if(arr[x][y] == 1){
        return true;
    }else{
        return false;
    }
}
function isClear(arr, x, y){// check wall(1)
    if(arr[x][y] == 0){
        return true;
    }else{
        return false;
    }
}
function fixedRow(arr, rows, columns) {
    for (let i = 0; i < rows; i++) {
        arr[i][columns - 1] = 1;
    }
    return arr
}
function fixedColumn(arr, rows, columns) {
    for (let i = 0; i < columns; i++) {
        arr[rows - 1][i] = 1;
    }
    return arr
}