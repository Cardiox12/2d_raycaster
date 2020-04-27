class Walls {
	constructor(n) {
		this.n = n;
		this.walls = [];

		for (let i = 0; i < this.n; i++) {
			const p1 = createVector(random(0, width / 2), random(0, height));
			const p2 = createVector(random(0, width / 2), random(0, height));
			this.walls = [...this.walls, new Wall(p1, p2)];
		}
	}

	draw() {
		this.walls.forEach(w => {
		w.draw()
		});
	}

	add(wall){
		this.walls = [...this.walls, wall];
	}
}