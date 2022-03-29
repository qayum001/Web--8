function matrixArray(rows, columns) {//returns a matrix filled with Walls
    let arr = new Array();
    for(let i = 0; i < rows; i++) {
        arr[i] = new Array();
        for(let j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}
function Point(x = 0, y = 0, astroid = CreateAstroid(1, 1, 'gray')) {
    return {
        x: x = x,
        y: y = y,
        astroid: astroid = astroid,
    }
}
function CheckPoint(mass, curPoint){
    for (let i = 0; i < mass.length; i++) {
        if (mass[i].x == curPoint.x && mass[i].y == curPoint.y) {
            return true;
        }
    }
    return false;
}
function CreateAstroid(x, y, param) {
    return {
        x: x = x,
        y: y = y,
        param: param = param,
    }
}
function CreateAstroidHierarchy(x, y, param = "lime", arrayPoints = new Array()) {
    return {
        x: x = x,
        y: y = y,
        param: param = param,
        arrayPoints: arrayPoints = arrayPoints,
    }
}
function rand(min, max){
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}
function CheckEquals(node1, node2) {
    if (node1.x == node2.x && node1.y == node2.y) {
        return true;
    } else {
        return false;
    }
}
function GetDistance(node, astroid) {
    return Math.round(Math.sqrt((node.x - astroid.x) * (node.x - astroid.x) + (node.y - astroid.y) * (node.y - astroid.y)));
}
function SetLocateNewAstroids(mass, countAstroid) {
    massAstroid = new Array();
    let R = 1; 
    let midX = 0;
    let midY = 0;

    for (let i = 0; i < mass.length; i++) {
        midX += mass[i].x;
        midY += mass[i].y;
    }

    midX = midX / mass.length;
    midY = midY / mass.length;

    for (let i = 0; i < mass.length; i++) {
        if (R < GetDistance(Point(mass[i].x, mass[i].y), Point(midX, midY))) {
            R = GetDistance(Point(mass[i].x, mass[i].y), Point(midX, midY));
        }
    }
    let a = 0;
    let a_sum = Math.PI * 2 / countAstroid;
    for (let i = 0; i < countAstroid; i++) {
        let param;
        switch(i % 10) {
            case 0:param = 'red'; break;
            case 1:param = 'green'; break;
            case 2:param = 'blue'; break;
            case 3:param = 'goldenrod'; break;
            case 4:param = 'lime'; break;
            case 5:param = 'aquamarine'; break;
            case 6:param = 'violet'; break;
            case 7:param = 'salmon'; break;//Сушенный лосось
            case 8:param = 'yellow'; break;
            case 9:param = 'indigo'; break;
        }
        let AstroidX = Math.round(midX + R / 2 * Math.cos(a));
        let AstroidY = Math.round(midY + R / 2 * Math.sin(a));

        let currentAstroid = CreateAstroid(AstroidX, AstroidY, param);

        massAstroid.push(currentAstroid);
        a += a_sum;
    }
    return massAstroid;
}
function SetLocateNewAstroidsRandom(mass, countAstroid) {
    massAstroid = new Array();

    for (let i = 0; i < countAstroid; i++) {
        let param;
        switch(i % 10) {
            case 0:
                param = 'red';
                break;
            case 1:
                param = 'green';
                break;
            case 2:
                param = 'blue';
                break;
            case 3:
                param = 'goldenrod';
                break;
            case 4:
                param = 'yellow';
                break;
            case 5:
                param = 'lime';
                break;
            case 6:
                param = 'aquamarine';
                break;
            case 7:
                param = 'salmon';//Сушенный лосось
                break;
            case 8:
                param = 'fuchsia';
                break;
            case 9:
                param = 'snow';
                break;
        }
        let RandomNumber = rand(0, mass.length - 1);

        let AstroidX = mass[RandomNumber].x;
        let AstroidY = mass[RandomNumber].y;

        let currentAstroid = CreateAstroid(AstroidX, AstroidY, param);

        massAstroid.push(currentAstroid);
    }
    return massAstroid;
}
function SetLocateAstroid(massAstroid, mass) {
    for (let i = 0; i < massAstroid.length; i++) {
        let sumX = 0, sumY = 0, count = 0;

        for (let j = 0; j < mass.length; j++) {
            if (mass[j].astroid.param == massAstroid[i].param) {
                sumX += mass[j].x;
                sumY += mass[j].y; 
                count++;
            }
        }
        if (count != 0) {
            massAstroid[i].x = Math.round(sumX / count);
            massAstroid[i].y = Math.round(sumY / count); 
        }
    }
    return massAstroid;
}
function SetMassWithAstroid(mass, massAstroid) {
    for (let i = 0; i < mass.length; i++) {
        mass[i].astroid = massAstroid[0];
        for (let j = 0; j < massAstroid.length; j++) {
            if (GetDistance(Point(mass[i].astroid.x, mass[i].astroid.y), Point(mass[i].x, mass[i].y) > GetDistance(Point(massAstroid[j].x, massAstroid[j].y), Point(mass[i].x, mass[i].y)))) {
                mass[i].astroid = massAstroid[j];
            }
        }
    }
}
function AlgorithmClusterKmeans(mass, countAstroid) {

    let massAstroid = SetLocateNewAstroidsRandom(mass, countAstroid)

    SetMassWithAstroid(mass, massAstroid);

    let change = true;
    while(change) {
        change = false;

        for (let i = 0; i < mass.length; i++) {
            let currentNode = mass[i].astroid.param;

            for(let j = 0; j < massAstroid.length; j++) {
                if (GetDistance(mass[i], mass[i].astroid) > GetDistance(mass[i], massAstroid[j])) {
                    mass[i].astroid = massAstroid[j];
                }
            }
            
            if (currentNode != mass[i].astroid.param) {
                change = true;
            }
        }
        massAstroid = SetLocateAstroid(massAstroid, mass);
    }
    PrintCluster();
}
function CreateMatrixAffinity(mass) {
    let arr = new Array();
    for(let i = 0; i < mass.length; i++) {
        arr[i] = new Array();
        for(let j = 0; j < mass.length; j++) {
            arr[i][j] = GetDistance(mass[i], mass[j]);
        }
    }
    return arr;
}
function CreateAstroidAffinity(param = 'aquamarine') {
    return {
        mark: mark = new Array(),
        param: param = param,
    }
}
function AlgorithmAffinityPropagation(mass) {
    let S = CreateMatrixAffinity(mass);
    let R = matrixArray(mass.length, mass.length);
    let A = matrixArray(mass.length, mass.length);
    let iter = 0, MaxIteration = 300, radious = 500;
    while (iter < MaxIteration) {
        for (let i = 0; i < mass.length; i++) {
            for (let k = 0; k < mass.length; k++) {
                let MaxNumber;
                for (let j = 0; j < mass.length; j++) {
                    if (j == k) {
                        continue;
                    }
                    if (typeof(MaxNumber) == 'undefined') {
                        MaxNumber = A[i][j] + S[i][j];
                    }
                    if (typeof(MaxNumber) != 'undefined' && MaxNumber < A[i][j] + S[i][j]) {
                        MaxNumber = A[i][j] + S[i][j];
                    }
                }
                R[i][k] = S[i][k] - MaxNumber;
            }
        }
        for (let i = 0; i < mass.length; i++) {
            for (let k = 0; k < mass.length; k++) {
                if (i == k) {
                    continue;
                }
                let Sum = 0;
                for (let j = 0; j < mass.length; j++) {
                    if (j == i || j == k) {
                        continue;
                    }
                    Sum += Math.max(0, R[j][k]);
                }
                A[i][k] = Math.min(0, R[k][k] + Sum);
            }
        }
        for (let k = 0; k < mass.length; k++) {
            let Sum = 0;
            for (let j = 0; j < mass.length; j++) {
                if (j == k) {
                    continue;
                }
                Sum += Math.max(0, R[j][k]);
            }
            A[k][k] = Sum;
        }
        iter++;
    }
    massAstroid = new Array();
    for (let i = 0; i < mass.length; i++) {
        let CheckAffinity = false;
        let MaxNumber = A[i][0] + R[i][0];
        for (let k = 0; k < mass.length; k++) {
            if (MaxNumber < A[i][k] + R[i][k]) {
                MaxNumber = A[i][k] + R[i][k];
            }
        }
        console.log(MaxNumber);
        for (let j = 0; j < massAstroid.length; j++) {
            for (let k = 0; k < massAstroid[j].mark.length; k++) {
                if (Math.abs(massAstroid[j].mark[k] - MaxNumber) < radious) {
                    mass[i].astroid = massAstroid[j];
                    massAstroid[j].mark.push(MaxNumber);
                    
                    CheckAffinity = true;
                    j = massAstroid.length;
                    break;
                }
            }
        }
        if (!CheckAffinity) {
            massAstroid.push(CreateAstroidAffinity());
            massAstroid[massAstroid.length - 1].mark.push(MaxNumber);
            mass[i].astroid = massAstroid[massAstroid.length - 1];
        }
    }
    for (let i = 0; i < massAstroid.length; i++) {
        switch(i % 10) {
            case 0:
                massAstroid[i].param = 'red';
                break;
            case 1:
                massAstroid[i].param = 'green';
                break;
            case 2:
                massAstroid[i].param = 'blue';
                break;
            case 3:
                massAstroid[i].param = 'goldenrod';
                break;
            case 4:
                massAstroid[i].param = 'yellow';
                break;
            case 5:
                massAstroid[i].param = 'lime';
                break;
            case 6:
                massAstroid[i].param = 'aquamarine';
                break;
            case 7:
                massAstroid[i].param = 'salmon';//Сушенный лосось
                break;
            case 8:
                massAstroid[i].param = 'fuchsia';
                break;
            case 9:
                massAstroid[i].param = 'snow';
                break;
        }
    }
    PrintCluster();
}
function SetLocateNewAstroidHierarchy(mass) {
    let currentMassAstroid = new Array();
    for (let i = 0; i < mass.length; i++) {
        currentMassAstroid.push(CreateAstroidHierarchy(mass[i].x, mass[i].y));
        currentMassAstroid[i].arrayPoints.push(mass[i])
    }
    return currentMassAstroid;
}
function AlgorithmHierarchy(mass, countAstroid) {
    let massAstroid = SetLocateNewAstroidHierarchy(mass);
    for (let i = 0; i < mass.length; i++) {
        mass[i].astroid = CreateAstroid(1, 1, 'gray');
    }
    while(true) {
        if (massAstroid.length == countAstroid) {
            break;
        }

        //Метод одиночной связи
        let minIndex1, minIndex2, minValue;
        for (let i = 0; i < massAstroid.length; i++) {
            for (let j = i + 1; j < massAstroid.length; j++) {
                for (let l = 0; l < massAstroid[i].arrayPoints.length; l++) {
                    for (let k = 0; k < massAstroid[j].arrayPoints.length; k++) {
                        if (typeof(minValue) == 'undefined') {
                            minValue = GetDistance(massAstroid[i].arrayPoints[l], massAstroid[j].arrayPoints[k]);
                            minIndex1 = i;
                            minIndex2 = j;
                        }
                        if (typeof(minValue) != 'undefined' && minValue > GetDistance(massAstroid[i].arrayPoints[l], massAstroid[j].arrayPoints[k])) {
                            minValue = GetDistance(massAstroid[i].arrayPoints[l], massAstroid[j].arrayPoints[k]);
                            minIndex1 = i;
                            minIndex2 = j;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < massAstroid[minIndex2].arrayPoints.length; i++) {
            massAstroid[minIndex1].arrayPoints.push(massAstroid[minIndex2].arrayPoints[i]);
        }
        massAstroid.splice(minIndex2, 1);
    }
    for (let i = 0; i < massAstroid.length; i++) {
        for (let j = 0; j < massAstroid[i].arrayPoints.length; j++) {
            switch(i) {
                case 0:
                    massAstroid[i].arrayPoints[j].astroid.param = 'red';
                    break;
                case 1:
                    massAstroid[i].arrayPoints[j].astroid.param = 'green';
                    break;
                case 2:
                    massAstroid[i].arrayPoints[j].astroid.param = 'blue';
                    break;
                case 3:
                    massAstroid[i].arrayPoints[j].astroid.param = 'goldenrod';
                    break;
                case 4:
                    massAstroid[i].arrayPoints[j].astroid.param = 'yellow';
                    break;
                case 5:
                    massAstroid[i].arrayPoints[j].astroid.param = 'lime';
                    break;
                case 6:
                    massAstroid[i].arrayPoints[j].astroid.param = 'aquamarine';
                    break;
                case 7:
                    massAstroid[i].arrayPoints[j].astroid.param = 'salmon';//Сушенный лосось
                    break;
                case 8:
                    massAstroid[i].arrayPoints[j].astroid.param = 'fuchsia';
                    break;
                case 9:
                    massAstroid[i].arrayPoints[j].astroid.param = 'snow';
                    break;
            }
        }
    }
    PrintCluster();
}
function LaunchKmeans() {
    AlgorithmClusterKmeans(mass, countAstroid);
}
function LaunchAffinityPropagation() {
    AlgorithmAffinityPropagation(mass);
}
function LaunchHierarchy() {
    AlgorithmHierarchy(mass, countAstroid);
}
function Donut() {
    ClearMatrixCluster();
    let a = 0;
    let a_sum = Math.PI * 2 / 200;
    let midX = 150;
    let midY = 70;
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 20; j++) {
            mass.push(Point(Math.round(midX + j + 30 * Math.cos(a)), Math.round(midY + 10 + 30 * Math.sin(a))));
            mass.push(Point(Math.round(midX + 10 + 30 * Math.cos(a)), Math.round(midY + j + 30 * Math.sin(a))));
        }
        a += a_sum;
    }
    a = 0;
    a_sum = Math.PI * 2 / 380;
    midX = 150;
    midY = 70;
    for (let i = 0; i < 380; i++) {
        for (let j = 0; j < 20; j++) {
            mass.push(Point(Math.round(midX + j + 60 * Math.cos(a)), Math.round(midY + 10 + 60 * Math.sin(a))));
            mass.push(Point(Math.round(midX + 10 + 60 * Math.cos(a)), Math.round(midY + j + 60 * Math.sin(a))));
        }
        a += a_sum;
    }
    PrintCluster();
}
function Square() {
    ClearMatrixCluster();
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            mass.push(Point(110 + i,  30 + j))
        }
    }
    PrintCluster();
}   
function Triangle() {
    ClearMatrixCluster();
    let count = 1/110;
    for (let i = 1; i < 110; i++) {
        let widthCircle = Math.round(55 * count);
        for (let j = 0; j < widthCircle; j++) {
            mass.push(Point(155 + j, i + 30));
            mass.push(Point(155 - j, i + 30));
        }
        count += 1/110;
    }
    PrintCluster();
}   
function Circle() {
    ClearMatrixCluster();
    
    let x = 0;
    let y = 50;
    let midX = 155;
    let midY = 80; 
    let delta = 1 - 2 * y;
    let error = 0;
    while (y >= 0) {
        for (let i = 0; i < x; i++) {
            mass.push(Point(midX + i, midY - y));
            mass.push(Point(midX - i, midY - y));
            mass.push(Point(midX + i, midY + y));
            mass.push(Point(midX - i, midY + y));
        }
        error = 2 * (delta + y) - 1;
        if (delta < 0 && error <= 0) {
            delta += 2 * ++x + 1;
            continue;
        }
        if (delta > 0 && error > 0) {
            delta -= 2 * --y + 1;
            continue;
        }
        delta += 2 * (++x - --y);
    }

    PrintCluster();
}  
function RemoveThisPointFromMass(mass, curPoint) {
    for (let i = 0; i < mass.length; i++) {
        if (CheckEquals(mass[i], curPoint)) {
            mass.splice(i, 1);
        }
    }
}
function ClearMatrixCluster() {    
    ctx.clearRect(0, 0, canv.width, canv.height);
    mass = new Array();
}
function PrintCluster() {
    for (let i = 0; i < mass.length; i++){
        ctx.fillStyle = mass[i].astroid.param;
        ctx.fillRect(mass[i].x*pixelSize, mass[i].y*pixelSize, pixelSize, pixelSize);   
    }
}
function RemoveNode(){
    isSetBtnActive = true;
    isRemuveBtnActive = false;
}
function SetNode(){
    isSetBtnActive = false;
    isRemuveBtnActive = true;
}
let countAstroid = 3;

let isDrowable = false;
let isSetBtnActive = false;
let isRemuveBtnActive = false;

let mass = new Array();

let canv = document.getElementById("matrix");
let ctx = canv.getContext("2d");

let rows = 795;
let columns = 500;
let pixelSize = 5;

let maxRows = 1590 / pixelSize;
let maxColumns = 1000 / pixelSize;

let pointToDrowCluster = new Array();

canv.width = maxRows * pixelSize;
canv.height = maxColumns * pixelSize;

canv.onmousedown = function(){
    isDrowable = true;
}
canv.onmouseup = function(){
    isDrowable = false;
}
canv.onmousemove = function(event){
    if(isDrowable){
        let flag = true;
        let x = Number(event.offsetX);
        let y = Number(event.offsetY);
        let correctX = x - (x % pixelSize);
        let correctY = y - (y % pixelSize);
        if(isSetBtnActive){
            RemoveThisPointFromMass(mass, Point(correctX/pixelSize, correctY/pixelSize));
            ctx.clearRect(correctX, correctY, pixelSize, pixelSize);
            flag = false;
        } else if(isRemuveBtnActive && flag) {
            if (!CheckPoint(mass, Point(correctX/pixelSize, correctY/pixelSize))) {
                mass.push(Point(correctX/pixelSize, correctY/pixelSize))
                ctx.fillStyle = 'gray';
                ctx.fillRect(correctX, correctY, pixelSize, pixelSize);
            }
        }
        flag = true;
    } 
}
astroidSetter.oninput = function() {
    countAstroid = document.getElementById('astroidSetter').value;
}
canv.onclick = function(event){
    let flag = true;
    let x = event.offsetX;
    let y = event.offsetY;
    let correctX = x - (x % pixelSize);
    let correctY = y - (y % pixelSize);
    if(isDrowable){
        if(isSetBtnActive){
            RemoveThisPointFromMass(mass, Point(correctX, correctY));
            ctx.clearRect(correctX, correctY, pixelSize, pixelSize);
            flag = false;
        } else if(isRemuveBtnActive && flag) {
            mass.push(Point(correctX/pixelSize, correctY/pixelSize))
            ctx.fillStyle = 'gray';
            ctx.fillRect(correctX, correctY, pixelSize, pixelSize);
        }
        flag = true;
    } 
}