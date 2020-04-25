class Walls {
	constructor(n) {
		this.n = n;
		this.walls = [];

		for (let i = 0; i < this.n; i++) {
		this.walls = [...this.walls, new Wall()];
		}
	}

	draw() {
		this.walls.forEach(w => {
		w.draw()
		});
	}
}