let canv = document.getElementById("myCanv");
let ctx = canv.getContext("2d");

let rows = 1000;
let columns = 1000;

canv.width = rows;
canv.height = columns;


class lol{
    constructor(s){
        this.s = s;
    }
}
class kek{
    constructor(s){
        this.s = s;
    }
}

let array = [];
let array2 = [];
for(let i = 0; i < 10; i++){
    array.push(new lol(1));
}

for(let i = 0; i < 10; i++){
    array2.push(array[i]);
}

console.log(array);
console.log(array2);

function Point(x, y, r, vector, angle){
      return{
        x: x = x,
        y: y = y,
        r: r = r,
        vector: vector = vector,
        angle: angle = angle,
    }
}

let pointsToDrow = new Array();

for(let i = 0; i < 10; i++){
    let r = 6;
    let x = Number(rand(r, rows - r));
    let y = Number(rand(r, columns - r));
    pointsToDrow.push(new Point(x, y, r, 1, rand(0, 360)));
}

function Move(p){// p = Point
    let newAngle = (p.angle + rand(-5, 5)) % 360;
    let direction = (Math.PI / 180) * newAngle;
    let newX = p.x + (p.vector * Math.cos(direction));
    let newY = p.y + (p.vector * Math.sin(direction));
    if(newX < p.r + p.vector || newX > 1000 - p.r - p.vector){
        newAngle = 180 - newAngle;
        direction = (Math.PI / 180) * newAngle;
        newX = p.x + (p.vector * Math.cos(direction));
    }
    if(newY < p.r + p.vector || newY > 1000 - p.r - p.vector){
        newAngle = -newAngle;
        direction = (Math.PI / 180) * newAngle;
        newY = p.y + (p.vector * Math.sin(direction));
    }
    return new Point(newX, newY, p.r, p.vector, newAngle);
}
ctx.strokeStyle = 'blue';
ctx.fillStyle = 'red';
ctx.lineWidth = 1;

function movePoint(){
    for(let i = 0; i < pointsToDrow.length; i++){        
        ctx.beginPath();
        ctx.arc(pointsToDrow[i].x, pointsToDrow[i].y, pointsToDrow[i].r, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        pointsToDrow[i] = Move(pointsToDrow[i]);
    }
  window.requestAnimationFrame(movePoint);
}
window.requestAnimationFrame(movePoint);
setInterval("ctx.clearRect(0, 0, 1000, 1000)", 10);
function rand(min, max){//random int
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}
function isAvailable(x, y, rows, columns) {//returns true if point is not out of matrix 
    if (0 < x && 0 < y && x < (rows) && y < (columns)){
        return true;
    }
    else{
        return false;
    }
}