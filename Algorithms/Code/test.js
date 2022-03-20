let canv = document.getElementById("myCanv");
let ctx = canv.getContext("2d");

let rows = 318;
let columns = 198;

let removeWall = true;
let setWall = true;

let renderFlag = false;
let pointToDrow = new Array();
size.oninput = function(){
    let a = document.getElementById('size').value;
    rows = a;
    columns = a;
}

canv.width = rows * 5;
canv.height = columns * 5;

let lol = Labyrinth(matrixArray(rows, columns), rows, columns);

window.requestAnimationFrame(printPoint);
function reset(){
    if(pointToDrow.length > 0){
        pointToDrow = [];
    }
    ctx.clearRect(0, 0, canv.width, canv.height);
    lol = Labyrinth(matrixArray(rows, columns), rows, columns);
    printPoint();
}
let indexToGetPoint = 0;

function Labyrinth(lab, rows, columns){
    let s = point(rand(1, rows / 2) * 2 - 1, rand(1, columns / 2) * 2 - 1, 'trail');// s = start point
    pointToDrow.push(s);
    setPointType(lab, s.x, s.y, 0);
    
    let ways = new Array();
    if(isAvailable(s.x, s.y - 2, rows, columns)){
        ways.push(new point(s.x, s.y - 2, 'inter'));
    }
    if(isAvailable(s.x, s.y + 2, rows, columns)) {
        ways.push(new point(s.x, s.y + 2, 'inter'));
    }
    if(isAvailable(s.x - 2, s.y, rows, columns)){
        ways.push(new point(s.x - 2, s.y, 'inter'));
    }
    if(isAvailable(s.x + 2, s.y, rows, columns)){
        ways.push(new point(s.x + 2, s.y, 'inter'));
    }
    while(ways.length > 0){
        let getRandomPoint  = rand(0, ways.length);
        let curP = popIndex(ways, getRandomPoint);//current Point
        curP.type = 'trail';
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
                        pointToDrow.push(new point(curP.x - 1, curP.y, 'trail'));
                        Direction = [];
                    }
                break;
                case 't':
                    if(isAvailable(curP.x, curP.y - 2, rows, columns) && isClear(lab, curP.x, curP.y - 2)){
                        setPointType(lab, curP.x, curP.y - 1, 0)
                        pointToDrow.push(new point(curP.x, curP.y - 1, 'trail'));
                        Direction = [];
                    }
                break;
                case 'r':
                    if(isAvailable(curP.x + 2, curP.y, rows, columns) && isClear(lab, curP.x + 2, curP.y)){
                        setPointType(lab, curP.x + 1, curP.y, 0);
                        pointToDrow.push(new point(curP.x + 1, curP.y, 'trail'));
                        Direction = [];
                    }
                break;
                case 'b':
                    if(isAvailable(curP.x, curP.y + 2, rows, columns) && isClear(lab, curP.x, curP.y + 2)){
                        setPointType(lab, curP.x, curP.y + 1, 0);
                        pointToDrow.push(new point(curP.x, curP.y + 1, 'trail'));
                        Direction = [];
                    }
                break;
            }
            Direction.splice(dir, 1);
        }
        if(isAvailable(curP.x - 2, curP.y, rows, columns) && isWall(lab, curP.x - 2, curP.y)){
            ways.push(new point(curP.x - 2, curP.y, 'inter'));
            pointToDrow.push(new point(curP.x - 2, curP.y, 'inter'));
        }
        if(isAvailable(curP.x, curP.y - 2, rows, columns) && isWall(lab, curP.x, curP.y - 2)){
            ways.push(new point(curP.x, curP.y - 2, 'inter'));
            pointToDrow.push(new point(curP.x, curP.y - 2, 'inter'));
        }
        if(isAvailable(curP.x + 2, curP.y, rows, columns) && isWall(lab, curP.x + 2, curP.y)){
            ways.push(new point(curP.x + 2, curP.y, 'inter'));
            pointToDrow.push(new point(curP.x + 2, curP.y, 'inter'));
        }
        if(isAvailable(curP.x, curP.y + 2, rows, columns) && isWall(lab, curP.x, curP.y + 2)){
            ways.push(new point(curP.x, curP.y + 2, 'inter'));
            pointToDrow.push(new point(curP.x, curP.y + 2, 'inter'));
        }
    }
    // if (rows % 2 == 0)
    //     lab = fixedRow(lab, rows, columns)
    // if (columns % 2 == 0)
    //     lab = fixedColumn(lab, rows, columns)
    return lab;
}
console.log(pointToDrow.length);

function printPoint(){
    let currentPoints = pointToDrow.splice(0, Math.ceil(pointToDrow.length * 0.0037));
    for(let i = 0; i < currentPoints.length; i++){
        if(currentPoints[i].type == 'inter'){
            ctx.fillStyle = 'red';
        }
        if(currentPoints[i].type == 'trail'){
            ctx.fillStyle = 'gray';
        }
        ctx.fillRect(currentPoints[i].x * 5, currentPoints[i].y * 5, 5, 5);   
    }
    if(pointToDrow.length > 0){
        window.requestAnimationFrame(printPoint);
    }
}

let isDrowable = false;
canv.onmousedown = function(){
    isDrowable = true;
}
canv.onmouseup = function(){
    isDrowable = false;
}

canv.onmousemove = function(event){
    console.log(event);
    if(isDrowable){
        let x = event.offsetX;
        let y = event.offsetY;
        let correctX = x - (x % 5);
        let correctY = y - (y % 5);
        let matrixX = correctX / 5;
        let matrixy = correctY / 5;
        let correctP = new point(correctX, correctY);
        console.log(lol[matrixX][matrixy]);
        if(removeWall && lol[matrixX][matrixy] == 0){
            lol[matrixX][matrixy] = 1;
            ctx.clearRect(correctX, correctY, 5, 5);
        }else if(setWall && lol[matrixX][matrixy] == 1) {
            lol[matrixX][matrixy] = 0;
            ctx.fillStyle = 'gray';
            ctx.fillRect(correctX, correctY, 5, 5);
        }
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
function point(x, y, type = 'inter'){
    //TODO: set defoult typr
    return {
        x: x = x,
        y: y = y,
        type: type = type,
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