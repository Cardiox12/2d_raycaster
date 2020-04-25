const KEY_A = 65;
const KEY_D = 68;
const CLOCKWISE = true;
const FACTOR = 100;
const FOV = 66;
const STEP = 5;
const WALLS_NUMBER = 5;
const events = {}
let walls = null;
let raycaster = null;

function setup() {
  createCanvas(1280, 665);

  angleMode(DEGREES);

  walls = new Walls(WALLS_NUMBER);
  raycaster = new Raycaster(FOV);
}

function draw() {
  background(220);
  checkEvent();
  raycaster.update();
  raycaster.draw();
  walls.draw();
  raycaster.collide(walls.walls);
}

function checkEvent() {
  if (events[KEY_A]) {
    raycaster.rotateAnticlockwise();
  } else if (events[KEY_D]) {
    raycaster.rotateClockwise();
  }
}

function keyPressed() {
  events[keyCode] = true;
}

function keyReleased() {
  events[keyCode] = false;
}