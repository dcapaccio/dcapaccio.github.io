let capture;

// Your code will go here

// Open up your console - if everything loaded properly you should see the version number
// corresponding to the latest version of ml5 printed to the console and in the p5.js canvas.
console.log("ml5 version:", ml5.version);
let d;
let inc;
let colorRot;
function setup() {
  var w = 720,
    h = 720;
  capture = createCapture(VIDEO, WEBGL);
  capture.size(w, h);
  // capture.parent("container");
  // capture hide hides the HTML video tags that make up the canvas.
  capture.hide();
  // cnv = createCanvas(w, h);
  // cnv.parent("container");
  createCanvas(w, h);
  rectMode(CENTER);
  d = pixelDensity();
  inc = 0;
  colorRot = 0;
  // textSize(width / 3);
  // textAlign(CENTER, CENTER);
}

function draw() {
  background(0,0,0,2);
  // text(ml5.version, width/2, height/2);
  capture.loadPixels();

  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < 18; i++) {
    push();
    // if (i > 15) {
    //   tint(255, 200 - (i - 22) * 50);
    // }
    // first 6
    if (i < 6) {
      trsCapture(0, 0, 6 * 0.16 * i, .4, .4);
      // noStroke();
      // fill(
      //   capture.pixels[600 * d],
      //   capture.pixels[601 * d],
      //   capture.pixels[602 * d],
      //   100
      // );
      // trsRect(0, 0, 0.16 * i, .1, .1);
    } else if (i >= 6 && i < 12) {
      // fill(pixels[1000],155,155,200);
      // noStroke();
      // fill(
      //   capture.pixels[600 * d],
      //   capture.pixels[601 * d],
      //   capture.pixels[602 * d],
      //   50
      // );
      // trsRect(0, 0, 6 * 0.16 * i, .5, .5);
      trsCapture(0, 0, 6 * 0.16 * i, 0.2, 0.2);
    } else if (i >= 12) {
      trsCapture(0, 0, 6 * 0.16 * i, 0.1, 0.1);
      // noStroke();
      // fill(
      //   capture.pixels[200 * d],
      //   capture.pixels[201 * d],
      //   capture.pixels[202 * d],
      //   100
      // );
      // trsRect(0, 0, 0.16 * i, .2,.2);
    }
    // trsCapture(0, 0, 6 * 0.16 * i, 1, 1);
    // fill(0,0,0,.5);
    // rect(0,0,150,150);
    // trsCapture(0,0,2*.04*i,.4-.01*i);

    pop();
  }
  pop();
  for(let r =0; r < 100; r++ ) {
    push();
    translate(width/2, height/2);
    rotate(inc+r);
    scale(1 * r * .01 );
    stroke(colorRot+0,colorRot+90,colorRot+140,200);
    noFill();
    // noStroke();
    rect(0,0,50,50);
    pop();
  }
  inc+= .005;
  colorRot += .1;
  if(colorRot > 255) {
    colorRot = 0;
  }
}

function trsCapture(tx, ty, theta, sx, sy) {
  translate(tx, ty);
  rotate(theta + inc);
  scale(sx, sy);
  // left half
  image(capture, 0, 0, width/4, height*2, width/4, 0, width/4, height);
  push();
  translate(width/4,0);
  scale(-1,1);
  // image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight], [fit], [xAlign], [yAlign])
  image(capture, width/4, 0, width/4, height*2, width/4, 0, width/4, height);
  pop();
  noStroke();
  // fill(colorRot+0,colorRot+90,colorRot+140,200);
  fill(colorRot,colorRot,colorRot,25);
  rect(width/4,0,20,height*4);
}

function trsRect(tx, ty, theta, sx, sy) {
  translate(tx, ty);
  rotate(theta + inc);
  scale(sx, sy);
  rect(0, 0, sx * width, sy * height);
}
