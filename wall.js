class Wall {
	constructor() {
	  this.p1 = createVector(random(0, width), random(0, height));
	  this.p2 = createVector(random(0, width), random(0, height));
	}
  
	draw() {
	  line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
  }