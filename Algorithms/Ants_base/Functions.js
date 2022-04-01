let radToDeg = 180 / Math.PI;

let ALPHA = 1;
let BETA = 1;

function d(a){//returns distance weight
    return 200/a;
}

function wish(a, b){
    return Math.pow(a, ALPHA) * Math.pow(d(b), BETA);
}

function isNotUsed(item, array){
    for(let i = 0; i < array.length; i++){
        if(item == array[i]) return false;
    }
    return true;
}

function cloneArray(original, clone){
    for(let i = 0; i < original.length; i++){
        clone.push(original[i]);
    }
}

function chance(array = [], resultArr){//gets point's ways and returns chances
    for(let i = 0; i < array.length; i++){
        let a = wish(array[i].pCount, array[i].len);
        let P = 0;
        for(let j = 0; j < array.length; j++){
            P += (wish(array[j].pCount, array[j].len)); 
        }
        resultArr.push(a / P);
    }
}

function distance(node_1, node_2){
    return Math.sqrt(Math.pow(Math.abs(node_1.x - node_2.x), 2) + Math.pow(Math.abs(node_1.y - node_2.y), 2));
}
