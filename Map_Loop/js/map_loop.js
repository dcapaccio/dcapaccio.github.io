var newX;
var newY;
var centerX;
var centerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  newX = 0;
  newY = 0;
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;
}

function draw() {
  ellipse(mouseX, mouseY, 10, 10);
  newX = map(mouseX, 0, windowWidth, centerX - 200, centerX + 200);
  newY = map(mouseY, 0, windowHeight, centerY - 200, centerY + 200);
  rect(newX, newY, 10, 10);

  for (var i = 0; i < 10; i++) {
    console.log("i " + i);
    for (var j = 0; j < 10; j++) {
      ellipse(i * 50, j * 50, i, j);
    }
  }
}