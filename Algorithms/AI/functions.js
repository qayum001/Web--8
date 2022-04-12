function Brush(x, y, r, context, Color){
    context.fillStyle = Color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    context.fill();
}
function GetMatrixFromImage(context){
    let resultInput = new Array()
    resultInput.length = 28*28;
    let k = 0;
    for(let i = 0; i < 28; i++){
        for(let j = 0; j < 28; j++){
            let pixel = context.getImageData(j, i, 1, 1);
            if((pixel.data[0] + pixel.data[1] + pixel.data[2]) / 3 > 0) resultInput[k] = 1;
            else resultInput[k] = 0;
            k++;
        }
    }
    return resultInput;
}
function AIAnswer(neuralNetwork, inputs){
    let results = [];
    results.length = 10;
    results = neuralNetwork.FeedForward(inputs);
    let maxValueIndex = 0;
    for(let i = 0; i < results.length; i++){
        if(results[maxValueIndex] < results[i]) maxValueIndex = i;
    }
    return maxValueIndex;
}
function sigmoid(a = 0){
    let res = 1 / (1 + Math.pow(Math.E, -a));
    return res;
}