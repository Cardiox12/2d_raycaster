const KEY_A = 65;
const KEY_D = 68;
const CLOCKWISE = true;
const FACTOR = 100;
const FOV = 66;
const STEP = 5;
const WALLS_NUMBER = 10;
const RAYS = 1;
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

  walls = new Walls(0);

  let b1 = createVector(width / 2, 0);
  let b2 = createVector(width / 2, height);
  walls.add(new Wall(b1, b2));

  b1 = createVector(0, 0);
  b2 = createVector(width / 2, 0);
  walls.add(new Wall(b1, b2));

  b2 = createVector(0, height);
  walls.add(new Wall(b1, b2));

  b1 = createVector(0, height);
  b2 = createVector(width / 2, height);
  walls.add(new Wall(b1, b2));
  raycaster = new Raycaster(FOV, RAYS);
}

function draw() {
	background(220);
	checkEvent();

	raycaster.update(mouseX, mouseY);
	// raycaster.update(noise(xoff) * width / 2, noise(yoff) * height);
	raycaster.cast(walls.walls)
	walls.draw();

	// xoff += 0.001;
	// yoff += 0.001;
}

function checkEvent() {
  if (events[KEY_A]) {
    raycaster.rotateAnticlockwise(1);
  } else if (events[KEY_D]) {
    raycaster.rotateClockwise(1);
  }
}

function keyPressed() {
  events[keyCode] = true;
}

function keyReleased() {
  events[keyCode] = false;
}