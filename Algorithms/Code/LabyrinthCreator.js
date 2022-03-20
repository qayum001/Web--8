let canv = document.getElementById("matrix");
let ctx = canv.getContext("2d");

let rows = 70;
let columns = 70;
let pixelSize = 5;

let maxRows = 1590 / pixelSize;
let maxColumns = 1000 / pixelSize;

let pointToDrow = new Array();//collects points to drow with printPoint()

canv.width = rows * pixelSize;
canv.height = columns * pixelSize;

let lol = new Array();//contains Labyrinth

window.requestAnimationFrame(printPoint);

let indexToGetPoint = 0;

let isDrowable = false;
let isSetBtnActive = false;
let isRemuveBtnActive = false;

function setWall(){
    isSetBtnActive = true;
    isRemuveBtnActive = false;
}
function removeWall(){
    isSetBtnActive = false;
    isRemuveBtnActive = true;
}
canv.onmousedown = function(){
    isDrowable = true;
}
canv.onmouseup = function(){
    isDrowable = false;
}
canv.onmousemove = function(event){//Wall Dorowing func
    if(isDrowable){
        let flag = true;
        let x = event.offsetX;
        let y = event.offsetY;
        let correctX = x - (x % pixelSize);
        let correctY = y - (y % pixelSize);
        let matrixX = correctX / pixelSize;
        let matrixy = correctY / pixelSize;
        if(isSetBtnActive && lol[matrixX][matrixy] == 0){
            lol[matrixX][matrixy] = 1;
            ctx.clearRect(correctX, correctY, pixelSize, pixelSize);
            flag = false;
        }else if(isRemuveBtnActive && lol[matrixX][matrixy] == 1 && flag) {
            lol[matrixX][matrixy] = 0;
            ctx.fillStyle = 'gray';
            ctx.fillRect(correctX, correctY, pixelSize, pixelSize);
        }
        flag = true;
    } 
}
function Labyrinth(lab, rows, columns){//returns Labyrinth
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
widthSetter.oninput = function(){
    pointToDrow = [];
    rows = document.getElementById('widthSetter').value;
    if(rows > maxRows){
        rows = maxRows;
    }
    canv.width = rows * pixelSize;
}
heightSetter.oninput = function(){
    pointToDrow = [];
    columns = document.getElementById('heightSetter').value;
    if(rows > maxColumns){
        columns = maxColumns;
    }
    canv.height = columns * pixelSize;
}
function Create(){//Creates new Labyrinth
    if(pointToDrow.length > 0){
        pointToDrow = [];
    }
    ctx.clearRect(0, 0, canv.width, canv.height);
    console.log('create');   
    lol = Labyrinth(matrixArray(rows, columns), rows, columns);
    printPoint();
}
function printPoint(){//Animates how Labyrinth was drawning up

    let currentPoints = pointToDrow.splice(0, Math.ceil(pointToDrow.length * 0.0067));
    for(let i = 0; i < currentPoints.length; i++){
        if(currentPoints[i].type == 'inter'){
            ctx.fillStyle = 'red';
        }
        if(currentPoints[i].type == 'trail'){
            ctx.fillStyle = 'gray';
        }
        ctx.fillRect(currentPoints[i].x * pixelSize, currentPoints[i].y * pixelSize, pixelSize, pixelSize);   
    }
    if(pointToDrow.length > 0){
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
function point(x, y, type){
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