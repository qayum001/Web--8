let mass = new Array();

let canv = document.getElementById("matrix");
let ctx = canv.getContext("2d");

canv.width = 1600;
canv.height = 1000;

let TREE_CSV = document.getElementById('TreeSettings').value;
let ANSW_CSV = document.getElementById('InputParams').value;

let launched = false;

let GlobalCurrentNode;
let GlobalCurrentTree;


document.getElementById('TreeSettings').addEventListener('keyup', function() {
    TREE_CSV = document.getElementById('TreeSettings').value;
}, false);

document.getElementById('InputParams').addEventListener('keyup', function() {
    ANSW_CSV = document.getElementById('InputParams').value;
}, false);

function CreateTree() {
    mass = new Array();

    let CurrentNode = Papa.parse(TREE_CSV);
    for (let i = 0; i < CurrentNode.data.length; i++) {
        if (CurrentNode.data[i].length > 7) {
            mass.push(new TNode(CurrentNode.data[i]))
        } else {
            mass.push(new TLeaf(CurrentNode.data[i]));
        }
    }

    GlobalCurrentTree = new Tree(mass);
    GlobalCurrentTree.PrintTree();
}

function Launch() {
    let CurrentNode = Papa.parse(ANSW_CSV);

    for (let i = 0; i < CurrentNode.data[0].length; i += 2) {
        for (let j = 0; j < mass.length; j++) {

            if (mass[j].Var1 == CurrentNode.data[0][i]) {
                mass[j].Value1 = CurrentNode.data[0][i + 1];
            }

            if (mass[j].Var2 == CurrentNode.data[0][i]) {
                mass[j].Value2 = CurrentNode.data[0][i + 1];
            }

        }
    }
    GlobalCurrentNode = mass[0];
    launched = true;
} 

function Render() {
    if (launched) {
        let NextNode = null;
        
        if (GlobalCurrentNode instanceof TNode) {
            if (GlobalCurrentNode.Operator == '<') {
                if (GlobalCurrentNode.Value1 < GlobalCurrentNode.Value2) {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[GlobalCurrentNode.ChildIndex.length - 1] - 1];
                } else {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[0] - 1];
                }
            } else if (GlobalCurrentNode.Operator == '<=') {
                if (GlobalCurrentNode.Value1 <= GlobalCurrentNode.Value2) {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[GlobalCurrentNode.ChildIndex.length - 1] - 1];
                } else {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[0] - 1];
                }
            } else if (GlobalCurrentNode.Operator == '==') {
                if (GlobalCurrentNode.Value1 == GlobalCurrentNode.Value2) {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[GlobalCurrentNode.ChildIndex.length - 1] - 1];
                } else {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[0] - 1];
                }
            } else if (GlobalCurrentNode.Operator == '>') {
                if (GlobalCurrentNode.Value1 > GlobalCurrentNode.Value2) {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[GlobalCurrentNode.ChildIndex.length - 1] - 1];
                } else {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[0] - 1];
                }
            } else if (GlobalCurrentNode.Operator == '>=') {
                if (GlobalCurrentNode.Value1 >= GlobalCurrentNode.Value2) {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[GlobalCurrentNode.ChildIndex.length - 1] - 1];
                } else {
                    NextNode = mass[GlobalCurrentNode.ChildIndex[0] - 1];
                }
            }
        }

        GlobalCurrentTree.PrintTree();
        GlobalCurrentTree.PrintNode(GlobalCurrentNode, GlobalCurrentNode.Position.x, GlobalCurrentNode.Position.y, '#0090FF')

        if (NextNode == null) {
            document.getElementById('Answer').textContent = GlobalCurrentNode.Name;
            launched = false;
        } else {
            GlobalCurrentNode = NextNode;
        }
    }
}

setInterval("Render()", 1000);

function Position(x, y) {
    return {
        x: x = x,
        y: y = y,
    }
}