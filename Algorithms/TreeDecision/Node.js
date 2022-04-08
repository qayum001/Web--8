class TNode {

    constructor(CurrentNode) {
        this.Index = CurrentNode[0];
        this.Name = CurrentNode[1];
        this.Var1 = CurrentNode[2];
        this.Value1 = CurrentNode[3];
        this.Operator = CurrentNode[4];
        this.Var2 = CurrentNode[5];
        this.Value2 = CurrentNode[6];
        this.ChildIndex = CurrentNode.slice(7, CurrentNode.length);
        this.Position;
        this.Condition = '';
        this.SetCondition();
    }
    
    SetCondition() {
        if (this.Var1 != 'None') {
            this.Condition += this.Var1 + ' ';
        } else {
            this.Condition += this.Value1 + ' ';
        }
        this.Condition += this.Operator + ' ';
        if (this.Var2 != 'None') {
            this.Condition += this.Var2;
        } else {
            this.Condition += this.Value2;
        }
    }
    
}