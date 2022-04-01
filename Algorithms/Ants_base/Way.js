class Way{
    constructor(){
        this.dis = 0;
        this.Edges = new Array();
    }
    setDis(){
        for(let i = 0; i < this.Edges.length; i++){
            this.dis += this.Edges[i].len;
        }
    }
}