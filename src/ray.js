class Ray {
	constructor(x1, y1, dir, height){
		this.pos = createVector(x1, y1);
		this.dir = dir;
		this.height = height;
		this.step = 2;
		this.heading = 0;
	}

	rotate(theta, clockwise){
		const v = createVector(0, 0);
		
		if (clockwise)
		{
			this.heading = (this.heading + theta) % 360;
			v.x = cos(theta) * this.dir.x - sin(theta) * this.dir.y;
			v.y = sin(theta) * this.dir.x + cos(theta) * this.dir.y;
		} 
		else 
		{
			this.heading = (this.heading - theta) % 360;
			v.x = cos(theta) * this.dir.x + sin(theta) * this.dir.y;
			v.y = -sin(theta) * this.dir.x + cos(theta) * this.dir.y;
		}
		this.dir = v;
	}

	getAngle(){
		return (this.heading);
	}

	extend(){
		const proj = p5.Vector.mult(this.dir, this.height + this.step);

		proj.add(this.pos);
		this.height += this.step;
		this.resize(this.height);
	}
	
	resize(height){
		this.height = height;
	}

	update(pos){
		this.pos = pos;
	}

	getProj(){
		let proj = p5.Vector.mult(this.dir, this.height);
		proj = p5.Vector.add(this.pos, proj);
		return (proj);
	}

	draw(){
		const proj = this.getProj();

		line(this.pos.x, this.pos.y, proj.x, proj.y);
	}
}