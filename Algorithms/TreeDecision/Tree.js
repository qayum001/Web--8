class Tree {

    constructor(mass) {
        this.mass = mass;
        this.MaxRows = 0;
        this.MaxColumns = 1;
        this.WidthNode;
        this.HeightNode;
        this.DefineParams();
        this.DefineSize();
    }

    DefineParams() {
        let CurArray = new Array();
        CurArray.push(mass[0]);
        this.CheckRows(CurArray);
    }

    CheckRows(CurArray) {
        let NextArray = new Array();
        
        for (let i = 0; i < CurArray.length; i++) {
            if (CurArray[i].ChildIndex != null) {
                for (let j = 0; j < CurArray[i].ChildIndex.length; j++) {
                    NextArray.push(mass[CurArray[i].ChildIndex[j] - 1]);
                }
            }
        }

        if (this.MaxColumns < NextArray.length) {
            this.MaxColumns = NextArray.length;
        }
        this.MaxRows++;

        if (NextArray.length > 0) {
            this.CheckRows(NextArray);
        }
    }

    DefineSize() {
        this.HeightNode = 800/this.MaxRows/2;
        this.WidthNode = 1200/this.MaxColumns/2;
    }

    PrintTree() {
        let CurArray = new Array();
        CurArray.push(mass[0]);

        let CurY = 200 / (this.MaxRows + 1), StepY = 200 / (this.MaxRows + 1) + this.HeightNode;
        
        this.PrintRows(CurArray, CurY, StepY);

        this.PrintArrowTree();

        this.PrintRows(CurArray, CurY, StepY);
    }
    
    PrintRows(CurArray, CurY, StepY) {
        let NextArray = new Array();

        for (let i = 0; i < CurArray.length; i++) {
            if (CurArray[i].ChildIndex != null) {
                for (let j = 0; j < CurArray[i].ChildIndex.length; j++) {
                    NextArray.push(mass[CurArray[i].ChildIndex[j] - 1]);
                }
            }
        }

        let CurX = 400 / (CurArray.length + 1) + 1200 / (CurArray.length + 1), StepX = 400 / (CurArray.length + 1) + 1200 / (CurArray.length + 1);
        CurY += StepY;
        
        for (let i = 0; i < CurArray.length; i++) {
            this.PrintNode(CurArray[i], CurX, CurY);
            CurArray[i].Position = Position(CurX, CurY);
            CurX += StepX;
        }

        

        if (NextArray.length > 0) {
            this.PrintRows(NextArray, CurY, StepY);
        }

    }
    
    PrintNode(CurrentNode, CurX, CurY, ColorNode = '#004275') {
        let X = Math.round(CurX);
        let Y = Math.round(CurY);

        ctx.beginPath();
        ctx.rect(X, Y, this.WidthNode, this.HeightNode);
        ctx.closePath();

        ctx.strokeStyle = 'aquamarine';
        ctx.lineWidth = 5;
        ctx.fillStyle = ColorNode;
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#F00";
        ctx.font = "italic 20pt Arial";
        ctx.fillText(CurrentNode.Name, X, Y + 25);

        if (CurrentNode instanceof TNode) {
            ctx.fillText(CurrentNode.Condition, X, Y + this.HeightNode / 2 + 25);
        }
    }

    PrintArrowTree() {
        let CurArray = new Array();
        CurArray.push(mass[0]);
        this.PrintArrowRows(CurArray);
    }

    PrintArrowRows(CurArray) {
        let NextArray = new Array();

        for (let i = 0; i < CurArray.length; i++) {
            if (CurArray[i].ChildIndex != null) {
                for (let j = 0; j < CurArray[i].ChildIndex.length; j++) {
                    NextArray.push(mass[CurArray[i].ChildIndex[j] - 1]);
                    this.PrintArrowNode(CurArray[i], mass[CurArray[i].ChildIndex[j] - 1]);
                }
            }
        }

        if (NextArray.length > 0) {
            this.PrintArrowRows(NextArray);
        }
    }

    PrintArrowNode(Node1, Node2) {
        ctx.strokeStyle = 'aquamarine';
        ctx.beginPath();
        ctx.moveTo(Node1.Position.x + this.WidthNode / 2, Node1.Position.y + this.HeightNode);
        ctx.lineTo(Node2.Position.x + this.WidthNode / 2, Node2.Position.y);
        ctx.closePath();
        ctx.stroke();
    }

}