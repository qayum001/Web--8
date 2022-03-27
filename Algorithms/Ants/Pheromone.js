class Pheromone extends BaseObject{
    constructor(positon, radius, type = 'food', count){
        super(positon, radius);
        this.type = type;
        this.count = count;
    }
}