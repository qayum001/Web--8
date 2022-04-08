class TLeaf {

    constructor(CurrentNode) {
        this.Index = CurrentNode[0];
        this.Name = CurrentNode[1];
        this.Var1 = CurrentNode[2];
        this.Value1 = CurrentNode[3];
        this.Operator = CurrentNode[4];
        this.Var2 = CurrentNode[5];
        this.Value2 = CurrentNode[6];
        this.ChildIndex = null;
        this.Position;
    }
    
}