class Pheromone extends BaseObject{
    constructor(positon, radius, type = 'to_food'){
        super(positon, radius);
        this.type = type;
    }
}