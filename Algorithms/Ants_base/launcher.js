let canv = document.getElementById('canvas');
let ctx = canv.getContext("2d");

canv.width = 1600;
canv.height = 1000;

let defoultPcount = 1;

let Nodes = new Array();

let index = 0;

let setNodeFlag = false;
let removeNodeFlag = false;
let launched = false;

function setNode(){
    setNodeFlag = true;
    removeNodeFlag = false;
}

function removeNode(){
    removeNodeFlag = true;
    setNodeFlag = false;
}

canv.onclick = function(event){
    let x = event.offsetX;
    let y = event.offsetY;

    if(setNodeFlag){
        Nodes.push(new Point(new Position(x, y), index, new Array(), new Array()));
        ctx.fillStyle = 'rgb(217, 0, 101)';
        for(let i = 0; i < Nodes.length; i++){
            let newWays = new Array();
                ctx.beginPath();
                ctx.arc(Nodes[i].position.x, Nodes[i].position.y, 6, 0, Math.PI * 2, true);
                ctx.fill();
            for(let j = 0; j < Nodes.length; j++){
                if(i == j) continue;
                newWays.push(new Edge(Nodes[i], Nodes[j], distance(Nodes[i].position, Nodes[j].position), defoultPcount));

            }
            Nodes[i].ways = newWays;
        }
        index++;
    }
    if(removeNodeFlag){
        
    }
}

function Launch(){
    launched = true;
    Render();
}

function Render(){
    let edgesToRender = ants(Nodes);
    console.log(edgesToRender);
    ctx.fillStyle = 'rgb(217, 0, 55)';
    for(let i = 0; i < edgesToRender.length; i++){
        ctx.beginPath();
        ctx.moveTo(edgesToRender[i].startNode.position.x, edgesToRender[i].startNode.position.y);
        ctx.lineTo(edgesToRender[i].startNode.position.x, edgesToRender[i].startNode.position.y);
        ctx.stroke();
    }
    ctx.fillStyle = 'rgb(217, 0, 101)';
    for(let i = 0; i < Nodes.length; i++){
        ctx.beginPath();
        ctx.arc(Nodes[i].position.x, Nodes[i].position.y, 6, 0, Math.PI * 2, true);
        ctx.fill();
    }
    if(launched){
        window.requestAnimationFrame(Render);
    }
    
}
window.requestAnimationFrame(Render);