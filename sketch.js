let video;

let mult = 5;
let baseW = 160 * mult;
let baseH = 120 * mult;
let pxS = 6 * mult;

let neon = 2;

let asciis = [];

let myFont;

function preload() {
  // Load the font from the same directory
  myFont = loadFont("./bitdust1.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);

  // User interaction to enable webcam
  let startButton = createButton("Start Webcam");
  startButton.position(width / 2 - 50, height / 2);
  startButton.mousePressed(() => {
    startButton.hide();
    initWebcam();
  });
}

function initWebcam() {
  video = createCapture(VIDEO);
  video.size(baseW, baseH);
  video.hide();

  rectMode(CENTER);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(pxS);

  for (let i = 0; i <= 255; i++) {
    asciis.push(String.fromCharCode(i));
  }
}

function draw() {
  background(0);

  if (video && video.loadedmetadata) {
    video.loadPixels();
    pixelate();
  } else {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Waiting for webcam...", width / 2, height / 2);
  }
}

function pixelate() {
  let wV = video.width;
  let hV = video.height;
  let pxV = video.pixels;

  for (let x = 0; x < wV; x += pxS) {
    for (let y = 0; y < hV; y += pxS) {
      let i = (x + y * wV) * 4;

      let r = pxV[i + 0];
      let g = pxV[i + 1];
      let b = pxV[i + 2];

      let brightness = (r + g + b) / 3;
      let threshold = 160;
      let tColor = brightness > threshold ? color(r, g, b) : color(0, 0, 0);

      let nnR = constrain(r * neon, 0, 255);
      let nnG = constrain(g * neon, 0, 255);
      let nnB = constrain(b * neon, 0, 255);

      let values = (r + g + b) / 3;
      let charIndex = int(map(values, 0, 255, 0, asciis.length - 1, 0));

      let cX = x + width / 2 - wV / 2;
      let cY = y + height / 2 - hV / 2;

      fill(tColor);
      noStroke();
      rect(cX, cY, pxS, pxS);

      fill(nnR, nnG, nnB, 100);
      textSize(pxS * 1.3);
      text(asciis[charIndex], cX, cY);

      fill(nnR, nnG, nnB);
      textSize(pxS);
      text(asciis[charIndex], cX, cY);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
