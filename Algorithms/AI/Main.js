let canv = document.getElementById('canvas');
let downScaleCanv = document.getElementById('downScale');
let ctx = canv.getContext("2d");
let downScaleContex = downScaleCanv.getContext("2d");

canv.width = 700;
canv.height = 700;
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, 700, 700);

downScaleCanv.width = 28;
downScaleCanv.height = 28;

let radius = 20;

console.log(InputLayer);
console.log(HiddenLAyer);
console.log(OutputLayer);

let drawFlag = false;
let EraseFlag = false;
let isDrawable = false;

let image = new Image();

//#region Buttuns
function Draw(){
    drawFlag = true;
    EraseFlag = false;
}
function Erase(){
    drawFlag = false;
    EraseFlag = true;
}
function Clear(){
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, 700, 700);
    image.src = canv.toDataURL();
}
canv.onmousedown = function(){
    isDrawable = true;
}
canv.onmouseup = function(){
    isDrawable = false;
}
//#endregion

let neuralNetwork = new NeuralNetwork();

console.log(neuralNetwork);

canv.onmousemove = function(event){
    let x = event.offsetX;
    let y = event.offsetY;
    if(drawFlag && isDrawable){
        Brush(x, y, radius, ctx, 'white');
        downScaleContex.drawImage(image, 0, 0, 28, 28);
    }
    if(EraseFlag && isDrawable){
        Brush(x, y, radius, ctx, 'rgb(0, 0, 0)');
        downScaleContex.drawImage(image, 0, 0, 28, 28);
    }
    image.src = canv.toDataURL();
}
function Render(){
    downScaleContex.drawImage(image, 0, 0, 28, 28);
    let answer = AIAnswer(neuralNetwork, GetMatrixFromImage(downScaleContex));
    document.getElementById('output').textContent = answer;
}
setInterval("Render()", 33);