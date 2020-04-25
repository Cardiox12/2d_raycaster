class Raycaster {
	constructor(fov) {
		this.FACTOR = 100;
		this.fov = fov;
		this.pos = createVector(mouseX, mouseY);
		this.STEP = 5;
		
		this.rays = [
			new Ray(this.pos.x, this.pos.y, createVector(1, 0), this.FACTOR),
			new Ray(this.pos.x, this.pos.y, createVector(1, 0), this.FACTOR)
		];
		
		this.rays[0].rotate(this.fov / 2, false);
		this.rays[1].rotate(this.fov / 2, true);
	}
	
	update() {
		this.pos = createVector(mouseX, mouseY);
		
		for (const r of this.rays){
			r.update(this.pos);
		}
	}
	
	draw() {
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.FACTOR * 2);
		
		stroke(0);
		for (const r of this.rays) {
			r.draw();
		}
	}

	cast(walls){
		let p = null;
		let dist = null;
		let closest;
		let record;
		
		for (const r of this.rays){
			closest = null;
			record = Infinity;

			for (const w of walls) {
				p = Raycaster.intersect(r.pos, r.getProj(), w.p1, w.p2);	
				if (p != null)
				{
					dist = p5.Vector.dist(p, this.pos);
					
					if (dist < record)
					{
						record = dist;
						closest = p;
					}
				}
			}
			if (closest != null)
			{
				ellipse(closest.x, closest.y, 10, 10);
				r.resize(record);
			}
			else
				r.resize(this.FACTOR);
		}
	}
	
	rotateClockwise() {
		for (const r of this.rays){
			r.rotate(this.STEP, true);
		}
	}
	
	rotateAnticlockwise() {
		for (const r of this.rays){
			r.rotate(this.STEP, false);
		}
	}
	
	static intersect(v1, v2, v3, v4) {
		const den = (v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x);
		
		if (den === null)
		return (null);
		const t = ((v1.x - v3.x) * (v3.y - v4.y) - (v1.y - v3.y) * (v3.x - v4.x)) / den;
		const u = -((v1.x - v2.x) * (v1.y - v3.y) - (v1.y - v2.y) * (v1.x - v3.x)) / den;
		
		if (t >= 0 && t <= 1 && u >= 0 && u <= 1){
			const x = v1.x + t * (v2.x - v1.x);
			const y = v1.y + t * (v2.y - v1.y);
			return (createVector(x, y));
		}
		return (null);
	}
}