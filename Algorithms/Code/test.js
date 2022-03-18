let canv = document.getElementById('myCanv');
let a = document.getElementById('tes');
canv.width = 1000;
canv.height = 1000;

let ctx = canv.getContext("2d");

let matrix = matchMedia(100, 100);
function point(x, y){
    return {
        x: x = x,
        y: y = y,
    };
}
let pointArr = new Array();

for(let i = 0; i < 100; i++){
    for(let j = 0; j < 100; j++){
        pointArr.push(new point(j*10, i*10));
    }    
}
console.log(pointArr.length)

console.log('lol');

let i = 0;
let flag = true;
function setMat(){
    c = pointArr[i];
    i++;
    ctx.fillStyle = 'red';
    ctx.fillRect(c.x, c.y, 5, 5);
    if(i < 100){
        flag = false;
    }
    if(i < 10000){
        window.requestAnimationFrame(setMat);
    }
}
window.requestAnimationFrame(setMat);
