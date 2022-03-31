function CreateMatrixAdjacency(mass) {
    let matrix = new Array();

    for (let i = 0; i < mass.length; i++) {
        matrix[i] = new Array();
        
        for (let j = 0; j < mass.length; j++) {
            matrix[i].push(GetDistance(mass[i], mass[j]));
        }
    }

    return matrix;
}

let BestIndividualToRenderALL = new Array();

function AlgorithmGenetic(mass, Generations, Population, Mutation) {
    let Matrix = CreateMatrixAdjacency(mass);
    let CurrentGeneration = new Generation(mass, Matrix, Population, Mutation);
    
    for (let i = 0; i < mass.length; i++) {
        BestIndividualToRenderALL.push(CurrentGeneration.BestIndividual.Genes[i]);
    }
    
    let MinimalDistance = CurrentGeneration.BestIndividual.Distance + 0;
    let Count = 0;
    while (Count != Generations) {
        CurrentGeneration.NextGeneration(Matrix);

        if (MinimalDistance > CurrentGeneration.BestIndividual.Distance) {
            MinimalDistance = CurrentGeneration.BestIndividual.Distance + 0;
            Count = 0;
            for (let i = 0; i < mass.length; i++) {
                BestIndividualToRenderALL.push(CurrentGeneration.BestIndividual.Genes[i]);
            }
        }
        Count++;
    }
    document.getElementById('MinimalLength').textContent = Math.round(MinimalDistance);
    Render();
}

function Render() {
    ctx.clearRect(0, 0, canv.width, canv.height);

    let BestIndividualToRender = BestIndividualToRenderALL.splice(0, mass.length);

    ctx.fillStyle = 'rgb(37, 0, 161)';

    for (let i = 0; i < mass.length; i++) {
        ctx.beginPath();
        ctx.arc(mass[i].x * pixelSize, mass[i].y * pixelSize, 10, 0, Math.PI * 2, true);
        ctx.fill();
    }

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'blue';
    
    for (let i = 0; i < BestIndividualToRender.length; i++) {
        if (i == 0) {
            ctx.moveTo(mass[BestIndividualToRender[0]].x * pixelSize, mass[BestIndividualToRender[0]].y * pixelSize);
        }
        ctx.lineTo(mass[BestIndividualToRender[i]].x * pixelSize, mass[BestIndividualToRender[i]].y * pixelSize);
        if (i == BestIndividualToRender.length - 1) {
            ctx.lineTo(mass[BestIndividualToRender[0]].x * pixelSize, mass[BestIndividualToRender[0]].y * pixelSize)
        }
    }

    ctx.stroke();

    if (BestIndividualToRenderALL.length > 0) {
        window.requestAnimationFrame(Render);
    }
}
window.requestAnimationFrame(Render);