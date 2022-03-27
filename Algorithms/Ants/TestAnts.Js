class TestAnts extends BaseObject{
    constructor(position, radius, vector, angle, target = 'food', satiety = 500){
        super(position, radius);
        this.radius = radius;
        this.vector = vector;
        this.angle = angle;
        this.target = target;
        this.satiety = satiety;//сытость
    }

    movement(world) {
        let ArrayFeromon = new Array();
        search(world, this.position, ArrayFeromon);

        let a = 1, b = 2, Value, Max = 0, MaxIter;
        let Sum = 0, Probability; 
        for (let i = 0; i < ArrayFeromon.length; i++) {
            if (this.target == 'food') {
                Sum += Math.pow(ArrayFeromon[i].tofood, a) * Math.pow(Value, b);
                if (Max < Math.pow(ArrayFeromon[i].tofood, a) * Math.pow(Value, b)) {
                    Max = Math.pow(ArrayFeromon[i].tofood, a) * Math.pow(Value, b);
                    MaxIter = i;
                }
            }
            else {
                Sum += Math.pow(ArrayFeromon[i].tohome, a) * Math.pow(Value, b);
                if (Math.pow(ArrayFeromon[i].tohome, a) * Math.pow(Value, b)) {
                    Max = Math.pow(ArrayFeromon[i].tohome, a) * Math.pow(Value, b);
                    MaxIter = i;
                }
            }
        }
        if (this.target == 'food') {
            Probability = Max / Sum;
        }
        else {
            Probability = Max / Sum;
        }
        if (Math.random <= Probability) {
            let newX = ArrayFeromon[MaxIter].position.x;
            let newY = ArrayFeromon[MaxIter].position.y;
            this.angle = GetNewAngle(this.position, ArrayFeromon[MaxIter].position);
            let newAnt = new TestAnts(new Position(newX, newY), this.radius, this.vector, this.angle, this.target, this.satiety);
            return newAnt;
        }
        else {
            //console.log(world.objects);
            this.angle = (this.angle + rand(-7, 7)) % 360;
            let direction = (Math.PI / 180) * this.angle;
            let newX = this.position.x + (this.vector * Math.cos(direction));
            let newY = this.position.y + (this.vector * Math.sin(direction));
            if(world.objects[Math.ceil(newX)][Math.ceil(this.position.y)] instanceof Wall || (newX < this.radius + this.vector || newX > world.width - this.radius - this.vector)){
                this.angle = 180 - this.angle;
                direction = (Math.PI / 180) * this.angle;
                newX = this.position.x + (this.vector * Math.cos(direction));
            }
            if(world.objects[Math.ceil(this.position.x)][Math.ceil(newY)] instanceof Wall || (newY < this.radius + this.vector || newY > world.height - this.radius - this.vector)){
                this.angle = -this.angle;
                direction = (Math.PI / 180) * this.angle;
                newY = this.position.y + (this.vector * Math.sin(direction));
            }
            let newAnt = new TestAnts(new Position(newX, newY), this.radius, this.vector, this.angle, this.target, this.satiety);
            return newAnt;
        }
    }
    leavePheromone(world, pArray){
        let cX = Math.ceil(this.position.x);
        let cY = Math.ceil(this.position.y);
        let C = world.objects[cX][cY];// C - current thing in world array
        let leaveP = 0;
        leaveP = this.PheramomeCount - Math.round((this.PheramomeCount * 0.02));
        if(!(C instanceof Food) && !(C instanceof Pheromone)){
            world.objects[cX][cY] = new Pheromone(new Position(cX, cY), 1, this.target, leaveP);
            pArray.push(world.objects[cX][cY]);
        }
    }
}