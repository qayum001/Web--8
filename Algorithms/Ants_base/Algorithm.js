function ants(points = []){

    //let fullLength = 0;
    //let minLenght = 0;
    let queue = new Array();
    //cloneArray(points, queue);
    queue.push(points[0]);
    
    let edges = new Array();
    edges.length = points.length;
    for(let i = 0; i < edges.length; i++){
        edges[i] = new Way();
    }
    let edgesToRender = new Array();

    while(queue.length > 0){
        let currentPoint = queue.splice(0, 1);
        let randFloat = Math.random();
        let chances = new Array();
        chance(currentPoint[0].ways, chances);
        let curP = chances[0];
        for(let i = 1; i < chances.length; i++){
            if(randFloat <= curP){
                let p = currentPoint[0].ways[i - 1].endNode;
                let newWays = new Array();
                for(let j = 0; j < p.ways.length; j++){
                    //if(p.ways[j].endNode.index == currentPoint[0].index) continue;
                    newWays.push(new Edge(p.ways[j].startNode, p.ways[j].endNode, p.ways[j].len, p.ways[j].pCount));
                    edgesToRender.push(newWays[newWays.length - 1]);
                }
                queue.push(new Point(p.position, p.index, newWays))
                edges[currentPoint[0].index].Edges.push(currentPoint[0].ways[i - 1]);
                break;
            }
            curP += chances[i];
        }
    }
    return edgesToRender;
}