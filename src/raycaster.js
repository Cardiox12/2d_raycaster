class Raycaster {
	constructor(fov, n) {
		this.FACTOR = 100;
		this.n = n;
		this.fov = fov;
		this.pos = createVector(mouseX, mouseY);
		this.STEP = 5;
		this.heading = 0
		
		this.rays = [];
		this.records = [];
		this.scenes = [];
		
		const step = this.fov / n;
		for (let i = 0 ; i < n ; i++)
		{
			this.rays = [...this.rays, new Ray(this.pos.x, this.pos.y, createVector(1, 0), this.FACTOR)];
			this.rays[i].rotate(i * step, false);
		}
		
		for (let i = 0 ; i < this.rays.length ; i++)
		{
			this.rays[i].rotate(this.fov / 2, true);
		}
	}
	
	update(x, y) {
		if (x <= (width / 2 - this.FACTOR))
			this.pos = createVector(x, y);
		
		for (let i = 0 ; i < this.rays.length ; i++){
			this.rays[i].update(this.pos);
		}
	}
	
	draw() {
		noStroke();
		fill(255);
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
		this.records = []
		this.scenes = []
		let perp_dist = 0;
		

		for (let i = 0 ; i < this.rays.length ; i++){
			closest = null;
			record = Infinity;

			for (const w of walls) {
				p = Raycaster.intersect(this.rays[i].pos, this.rays[i].getProj(), w.p1, w.p2);	
				if (p != null)
				{
					dist = p5.Vector.dist(p, this.pos);
					perp_dist = dist * cos(this.rays[i].getAngle() - this.heading);
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
				this.records = [...this.records, {"record" : record, "ray" : this.rays[i]}];
				this.scenes = [...this.scenes, perp_dist];
			}
			else
			{
				this.rays[i].extend();
			}
		}
		for (const rec of this.records){
			rec["ray"].resize(rec["record"]);
		}
		this.render()
		this.draw();
	}


	render(){
		if (this.scenes.length != 0)
		{
			const midx = width / 2;
			const slice = midx / this.scenes.length;

			for (let i = this.scenes.length ; i > 0 ; i--){
				const h = map(this.scenes[i], 0, midx, height, 0);
				const c = map(this.scenes[i], 100, midx, 255, 0);
				
				fill(c);
				noStroke();
				rect(width - i * slice, 0, slice, h);
			}
		}
	}

	rotateClockwise(angle) {
		this.heading = (this.heading + angle) % 360;
		for (const r of this.rays){
			r.rotate(angle, true);
		}
	}
	
	rotateAnticlockwise(angle) {
		this.heading = (this.heading - angle) % 360;
		for (const r of this.rays){
			r.rotate(angle, false);
		}
	}
	
	static intersect(v1, v2, v3, v4) {
		const den = (v1.x - v2.x) * (v3.y - v4.y) - (v1.y - v2.y) * (v3.x - v4.x);
		
		if (den === null)
		{
			return (null);
		}
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