class TestAnts extends BaseObject{
    constructor(position, radius, vector, angle, target = 'food', satiety = 500){
        super(position, radius);
        this.radius = radius;
        this.vector = vector;
        this.angle = angle;
        this.target = target;
        this.satiety = satiety;//сытость
    }

    movement(world){
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
        // if(newX < this.radius + this.vector || newX > world.width - this.radius - this.vector){
        //     this.angle = 180 - this.angle;
        //     direction = (Math.PI / 180) * this.angle;
        //     newX = this.position.x + (this.vector * Math.cos(direction));
        // }
        // if(newY < this.radius + this.vector || newY > world.height - this.radius - this.vector){
        //     this.angle = -this.angle;
        //     direction = (Math.PI / 180) * this.angle;
        //     newY = this.position.y + (this.vector * Math.sin(direction));
        // }