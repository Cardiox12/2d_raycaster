class Wall {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}

	draw() {
		stroke(0);
		line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
  }