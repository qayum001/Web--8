function ants(points = []){

    //let fullLength = 0;
    //let minLenght = 0;
    let clonePoints = new Array();
    let queue = new Array();
    cloneArray(points, queue);

    let edges = new Array();
    let edgesToRender = new Array();

    
    let arrayToRender = new Array();

    while(queue.length > 0){
        let currentPoint = queue.splice(0, 1);
        let randFloat = Math.random();
        let chances = new Array();
        chance(currentPoint[0].ways, chances);
        for(let i = 1; i < chances.length; i++){
            if(randFloat <= chances[i]){
                let p = currentPoint[0].ways[i - 1].endNode;
                let newWays = new Array();
                for(let j = 0; j < p.ways.length; j++){
                    if(p.ways[j].endNode.index == currentPoint[0].index) continue;
                    newWays.push(new Edge(p.ways[j].startNode, p.ways[j].endNode, p.ways[j].len, p.ways[j].pCount));
                    edgesToRender.push(newWays[j]);
                }
                //arrayToRender.push(p);
                queue.push(new Point(p.position, p.index, newWays))
                //console.log(queue);
                break;
            }
        }
    }
    return edgesToRender;
    console.log('lol');
}