//this file contains the ball class, containing all behavior of the ball

class Ball {
	
	constructor(x, y) {
		//variable info
		this.x = x;
		this.y = y;
		this.velX = 0;
		this.velY = 0;
		
		//static info
		this.r = 7;
	}
	
	moveFrame(field, real) {
		if (this.velX == 0 && this.velY == 0) {
			return false;
		}
		
		//define space to be moved
		let moveX = this.velX;
		let moveY = this.velY;
		//perform move
		while (moveX != 0 && moveY != 0) {
			//find all potential intersection points
			let iscts = [];
			let route = ({
				x1: this.x,
				y1: this.y,
				x2: this.x + moveX,
				y2: this.y + moveY,
			});
			
			for (const wall of field.walls) {
				let curIsct = wall.findIsct(route, wall);
				if (curIsct != null) {
					iscts.push({
						isct: curIsct,
						wall: wall,
					});
				}
			}
			
			//find all potential goal points
			let goals = [];
			for (const goal of field.goals) {
				let curGoal = findGoal(route, goal);
				if (curGoal != null) {
					goals.push(curGoal);
				}
			}
			//do actual move
			if (iscts.length == 0) {
				if (goals.length != 0) {
					//goal found!
					
					//play win sound
					if (real) {
						playSound("win");
						particleBurst(this.x, this.y);
					}
					
					this.x = field.startPosition.x;
					this.y = field.startPosition.y;
					this.velX = 0;
					this.velY = 0;
					
					return true;
				}
				//no intersections are found, just move
				this.x += moveX;
				this.y += moveY;
				moveX = 0;
				moveY = 0;
			} else {
				//determine closest intersection point
				let intersection = iscts[0].isct;
				let isctWall = iscts[0].wall;
				let curIsct;
				for (const isct of iscts) {
					curIsct = isct.isct;
					if (dist(this.x, this.y, curIsct.x, curIsct.y) <
						dist(this.x, this.y, intersection.x, intersection.y)) {
						intersection = curIsct;
						isctWall = isct.wall;
					}
				}
				//check if there's a goal closer than the nearest intersection
				for (const goal of goals) {
					if (dist(this.x, this.y, goal.x, goal.y) <
						dist(this.x, this.y, intersection.x, intersection.y)) {
							if (real) {
								playSound("win");
								particleBurst(goal.x, goal.y);
							}
							
							this.x = field.startPosition.x;
							this.y = field.startPosition.y;
							this.velX = 0;
							this.velY = 0;
							
							return true;
						}
				}
				//move to intersection point
				moveX -= intersection.x - this.x - epsilon * moveX;
				moveY -= intersection.y - this.y - epsilon * moveY;
				this.x = intersection.x - epsilon * moveX;
				this.y = intersection.y - epsilon * moveY;
				//mirror the move and velocity vectors
					/*normalize vectors*/
				let velR = Math.sqrt(this.velX**2 + this.velY**2);
				let moveR = Math.sqrt(moveX**2 + moveY**2);
				let newDirX = moveX / moveR;
				let newDirY = moveY / moveR;
					/*find normalized wall normal*/
				let wall = isctWall;
				let wallNormal = wall.getNormal(intersection);
					/*make sure the normal points in the direction the ball came from*/
				if (moveX * wallNormal.x + moveY * wallNormal.y < 0) {
					wallNormal = {
						x: -1 * wallNormal.x,
						y: -1 * wallNormal.y,
					};
				}
					/*reflect the move vector*/
				let newMoveX = newDirX - 2*( newDirX*wallNormal.x + newDirY*wallNormal.y )*wallNormal.x;
				let newMoveY = newDirY - 2*( newDirX*wallNormal.x + newDirY*wallNormal.y )*wallNormal.y;
					/*set move and vel vectors to correct proportions of reflection vector*/
				moveX = moveR * newMoveX;
				moveY = moveR * newMoveY;
				this.velX = velR * newMoveX;
				this.velY = velR * newMoveY;
				
				//play collision sound
				if (real) playSound("hit");
			}
		}
		//apply friction
		this.velX /= friction;
		this.velY /= friction;
		return false;
	}
	
	//hit the ball
	hit(x, y) {
		this.velX += strength * (this.x - x);
		this.velY += strength * (this.y - y);
	}
	
	//return a copy of the ball
	copy() {
		return new Ball(this.x, this.y);
	}
	
	//stops ball movement if speed is too low
	settle() {
		if (Math.sqrt(this.velX**2 + this.velY**2) < 0.05) {
			this.velX = 0;
			this.velY = 0;
		}
	}
}