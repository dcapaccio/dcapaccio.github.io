var centerX;
var centerY;
var iter; // for repetetive motion
var n; // for noise calculation
var colors;
var snowflakes;
var sobafaces;
var curFace;

function preload() {
    sobafaces = new Array();
    sobafaces.push(loadImage("assets/soba-face-1.png"));
    sobafaces.push(loadImage("assets/soba-face-2.png"));
    sobafaces.push(loadImage("assets/soba-face-3.png"));
    sobafaces.push(loadImage("assets/soba-face-4.png"));
    sobafaces.push(loadImage("assets/soba-face-5.png"));
    sobafaces.push(loadImage("assets/soba-face-6.png"));
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //initialize variables
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    iter = 0;
    n = 0;
    colors = new Array();
    colors.push(color(255, 0, 0, 50));
    colors.push(color(0, 255, 0, 20));
    snowflakes = new Array();
    for (var i = 0; i < 80; i++) {
        snowflakes.push(new Snowflake(map(i, 0, 80, 0, width), random(height), random(10)));
    }
    curFace = 0;
}

function draw() {
    background(0);

    fill(colors[0]);
    //draw the ellipse at the changing X position, and add noise to the Y to give it some jitter.
    //rEllipse(iter, centerY + 60 * noise(n), 100, 100, 20, 0, 3.2);
    iter += 1; //faster or slower 
    n += .03; // smoother or jumpier? (lower numbers smoother)

    fill(colors[1]);
    rEllipse(centerX, centerY, centerX, centerX, 40, 0, map(iter % windowWidth, 0, windowWidth, 2.5, 2.8));

    fill(colors[0]);
    //replace with soba's face'
    image(sobafaces[curFace], centerX + windowWidth * .1666, centerY, windowWidth * .1666, windowWidth * .1666);
    //ellipseMode(CORNER);
    //ellipse(centerX + windowWidth / 6, centerY, windowWidth / 6, windowWidth / 6);
    //ellipseMode(CENTER);

    for (var i = 0; i < snowflakes.length; i++) {
        snowflakes[i].move();
        snowflakes[i].display();
    }
    if (iter % 300 == 0) {
        increaseFace();
    }
    //reset variable to the left side when it hits the right side.
    if (iter > windowWidth) {
        iter = 0;
    }
}

function increaseFace() {
    if (curFace >= 5) {
        curFace = 0;
    } else {
        curFace++;
    }
}

function mouseClicked() {
    increaseFace();
}

function keyPressed() {
    if (keyCode === ENTER) {
        save('myCanvas.png');
    }
}

function rEllipse(x, y, w, h, depth, angle, angleMod) {
    if (depth <= 0) {
        //do nothing, this is our end condition.
    } else {
        //draw ellipse
        noStroke();
        ellipse(x, y, w, h);
        x = x + w * cos(angle);
        y = y + h * sin(angle);
        angle += angleMod;
        var scale = .99;
        rEllipse(x, y, w * scale, h * scale, depth - 1, angle, angleMod);
    }
}

//Object Person takes in an X, Y starting position. 
//Seed provides variation to the sin function so they all don't move in sync
function Snowflake(x, y, seed = 0) {

    this.radius = random(5, 9);
    this.x = x;
    this.y = y;
    this.dir = 0;
    this.dirY = 2;
    this.gravity = this.radius * .01;
    this.color = color(255, 255, 255, 90);
    this.iter = seed;

    this.move = function() {

        if (this.y > windowHeight) {
            this.y = 0;
        }
        if (this.x > windowWidth) {
            this.x = 0;
        }
        var n = noise(this.iter);
        this.x += n;
        this.y += this.dirY - n;
        //this.dirY += this.gravity;

    }

    this.twitch = function() {
        this.x += .9 * sin(this.iter);
        this.y += .9 * random(-1, 1);
    }

    this.display = function() {
        fill(this.color);
        ellipse(this.x, this.y, this.radius, this.radius);
        //console.log(this.x);
        this.iter += .02;
    }

}