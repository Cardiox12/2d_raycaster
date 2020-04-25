const KEY_A = 65;
const KEY_D = 68;
const CLOCKWISE = true;
const FACTOR = 100;
const FOV = 70;
const STEP = 5;
const WALLS_NUMBER = 10;
const RAYS = 80;
const events = {}
const DEBUG = true;
let walls = null;
let raycaster = null;
let xoff = 0;
let yoff = 1000;
let alpha_off = 0;

function setup() {
  createCanvas(1280, 665);

  angleMode(DEGREES);

  walls = new Walls(WALLS_NUMBER);
  raycaster = new Raycaster(FOV, RAYS);
}

function draw() {
	background(220);
	checkEvent();

	raycaster.update(noise(xoff) * width, noise(yoff) * height);
	xoff += 0.001;
	yoff += 0.001;
	raycaster.draw();
	walls.draw();
	raycaster.cast(walls.walls)

	const prob = noise(alpha_off) * 1;

	print(prob)
	if (prob >= 0.5)
		raycaster.rotateClockwise(prob);
	else if (prob <= 0.5)
		raycaster.rotateAnticlockwise(prob)
	alpha_off += 0.001;
}

function checkEvent() {
  if (events[KEY_A]) {
    raycaster.rotateAnticlockwise(angle);
  } else if (events[KEY_D]) {
    raycaster.rotateClockwise(angle);
  }
}

function keyPressed() {
  events[keyCode] = true;
}

function keyReleased() {
  events[keyCode] = false;
}