//this file contains the ball class, containing all behavior of the ball

// ball physics properties
var friction = 1.03;
var strength = 0.05;

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
		if (this.velX === 0 && this.velY === 0) return false;
		
		//define space to be moved
		let moveX = this.velX;
		let moveY = this.velY;

		let hits = false;

		//perform move
		move:
		while (moveX !== 0 && moveY !== 0) {
			// define route
			let route = ({
				x1: this.x,
				y1: this.y,
				x2: this.x + moveX,
				y2: this.y + moveY,
			});
			
			//find all potential intersection points
			let iscts = [];
			findwalls:
			for (const wall of field.walls) {
				if (distLinePoint_2(wall, this) - this.r > moveX * moveX + moveY * moveY) continue findwalls;
				
				const curIsct = findIsct(wall, route);
				if (curIsct === null) continue findwalls;
				
				iscts.push({
					isct: curIsct,
					wall: wall,
				});
			}

			//do actual move
			if (iscts.length === 0) {
				findgoals:
				for (const goal of field.goals) {
					if (!findGoal(route, goal)) continue findgoals;

					//goal found!
					if (real) {
						playSound("win");
						particleBurst(goal.x, goal.y);
						this.x = field.startPosition.x;
						this.y = field.startPosition.y;
						this.velX = 0;
						this.velY = 0;
					}
					
					return true;
				}

				//no intersections are found, just move
				this.x += moveX;
				this.y += moveY;
				moveX = 0;
				moveY = 0;

			} else {
				// remember a hit has occurred
				hits = true;

				//determine closest intersection point
				let intersection = iscts[0].isct;
				let isctWall = iscts[0].wall;
				let isctDist_2 = Infinity;
				for (const isct of iscts) {
					let curIsct = isct.isct;
					let curIsctDist_2 = dist_2(this.x, this.y, curIsct.x, curIsct.y);
					if (curIsctDist_2 < isctDist_2) {
						intersection = curIsct;
						isctWall = isct.wall;
						isctDist_2 = curIsctDist_2;
					}
				}

				//check if there's a goal closer than the nearest intersection
				for (const goal of field.goals) {
					if (findGoal(route, goal) && dist_2(this.x, this.y, goal.x, goal.y) < isctDist_2) {
						if (real) {
							playSound("win");
							particleBurst(goal.x, goal.y);
							this.x = field.startPosition.x;
							this.y = field.startPosition.y;
							this.velX = 0;
							this.velY = 0;
						}
						return true;
					}
				}

				//move to intersection point
				let epsilon_X = epsilon * moveX;
				let epsilon_Y = epsilon * moveY;
				moveX -= intersection.x - this.x - epsilon_X;
				moveY -= intersection.y - this.y - epsilon_Y;
				this.x = intersection.x - epsilon_X;
				this.y = intersection.y - epsilon_Y;

				//mirror the move and velocity vectors with the following steps:
				// normalize vectors
				let moveR = Math.sqrt(moveX**2 + moveY**2);
				let newDirX = moveX / moveR;
				let newDirY = moveY / moveR;

				// find normalized wall normal
				let wall = isctWall;
				let wallNormal = wall.getNormal(intersection);

				// make sure the normal points in the direction the ball came from
				/* if (moveX * wallNormal.x + moveY * wallNormal.y < 0) {
					wallNormal = {
						x: -wallNormal.x,
						y: -wallNormal.y,
					};
				} */

				// reflect the move vector
				let tmp = 2 * (newDirX*wallNormal.x + newDirY*wallNormal.y);
				let newMoveX = newDirX - tmp * wallNormal.x;
				let newMoveY = newDirY - tmp * wallNormal.y;

				// set move and vel vectors to correct proportions of reflection vector
				moveX = moveR * newMoveX;
				moveY = moveR * newMoveY;
				let velR = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
				this.velX = velR * newMoveX;
				this.velY = velR * newMoveY;
			}
		}

		//play collision sound
		if (real && hits) playSound("hit");

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