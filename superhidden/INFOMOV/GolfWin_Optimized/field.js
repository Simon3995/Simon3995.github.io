//this file contains the field class, containing all information and construction of the field

class Field {
	
	constructor() {
		//initialize existence of walls and goals
		this.walls = [];
		this.goals = [];
		this.startPosition;
		//do default wall setup
		this.setDefault();
	}
	
	//default walls setup
	setDefault() {
		//setup startposition
		this.startPosition = {
			x: 100,
			y: 100,
		}
		//setup goals
		this.goals.push({
			x: 100,
			y: c.width - 100,
			r: 10,
		});
		this.goals.push({
			x: c.width - 100,
			y: c.width - 400,
			r: 10,
		});
		//create outer walls
		this.walls.push(new Wall(0, 0, c.width, 0));
		this.walls.push(new Wall(c.width, 0, c.width, c.height));
		this.walls.push(new Wall(c.width, c.height, 0, c.height));
		this.walls.push(new Wall(0, c.height, 0, 0));
		//other walls
		this.walls.push(new Wall(0, 200, 200, 200));
		this.walls.push(new Wall(200, 0, 200, 100));
		this.walls.push(new Wall(400, 100, 400, 400));
		this.walls.push(new Wall(0, 600, 400, 600));
		this.walls.push(new Wall(200, 400, 400, 400));
	}
}