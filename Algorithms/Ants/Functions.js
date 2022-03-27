function wallMatrix(rows, columns) {//returns a matrix filled with Walls
    let arr = new Array();
    for(let i = 0; i < rows; i++) {
        arr[i] = new Array();
        for(let j = 0; j < columns; j++) {
            arr[i][j] = new Wall(new Position(i, j));
        }
    }
    return arr;
}

function AntSpawner(antCount, array){
    for(let i = 0; i < antCount; i++){
        array.push(new TestAnts(colony.position, 1, 1, rand(0, 360), 'food', Number(rand(20000, 30000))));
    }
}

function foodSpawner(foodCount, array, worldMatrix){
    for(let i = 0; i < foodCount; i++){
        array.push(new Food(new Position(rand(4, 996),rand(4, 996)), 2, 20));
        worldMatrix[array[i].position.x][array[i].position.y] = array[i];
    }
}

function rand(min, max){//random int
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}

function inRange(num, left, right){
    if(num > left && num < right){
       return true; 
    }
    return false;
}

function search(world, obj, array){
    let wayX = Math.ceil(obj.x);
    let wayY = Math.ceil(obj.y);
    for(let i = wayX - 2; i <= wayX + 2; i++){
        for(let j = wayY - 2; j <= wayY + 2; j++){
            if(world.objects[i][j] instanceof Food){
                array.push(world.objects[i][j]);
                //console.log(inSight);
            }
        }
    }
}

function resizeArray(array_1 = [], array_2 = [], coeff){//array_1 must be smaller than array_2
    for(let i = 0; i < array_1.length; i++){
        for(let j = 0; j < array_1[i].length; j++){
            for(let k = i * coeff; k < i * coeff + coeff; k++){
                for(let n = j * coeff; n < j * coeff + coeff; n++){
                    array_2[k][n] = array_1[i][j];
                }
            }
        }
    }
}

function GetNewAngle(point1, point2) {
    if (point1.x == point2.x && point1.y > point2.y) {
        return 0;
    }
    if (point1.x < point2.x && point.y > point2.y) {
        return 45;
    }
    if (point1.x < point2.x && point.y == point2.y) {
        return 90;
    }
    if (point1.x < point2.x && point.y < point2.y) {
        return 135;
    }
    if (point1.x == point2.x && point.y < point2.y) {
        return 180;
    }
    if (point1.x > point2.x && point.y < point2.y) {
        return 225;
    }
    if (point1.x > point2.x && point.y == point2.y) {
        return 270;
    }
    if (point1.x > point2.x && point.y > point2.y) {
        return 315;
    }
}