let video;

let mult = 7;
let baseW = 160 * mult;
let baseH = 120 * mult;
let pxS = 3 * mult;

let neon = 2;

let asciis = [];

let myFont;

function preload(){

  myFont = loadFont("./bitdust1.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);

  video = createCapture(VIDEO);
  video.size(baseW,baseH);
  video.hide();

  rectMode(CENTER);

  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(pxS);

  ///// StackOverflow DecentDabbler https://stackoverflow.com/questions/2444447/string-that-contains-all-ascii-characters

  for (let i = 0; i <= 255; i++) {

    asciis.push(String.fromCharCode(i));
  }

  /////
}

function draw() {

  background(0)

  video.loadPixels();
  pixelate();
  
  //filter(BLUR,.1)
  //filter(THRESHOLD,.65)
  //filter(POSTERIZE,1.5)
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
      let a = pxV[i + 3];

      ///// ChatGPT made this possible

      let brightness = (r + g + b) / 3;
      let threshold = 160; 
      let tColor = brightness > threshold ? color(r, g, b) : color(0, 0, 0);

      /////

      let nnR = constrain(r * neon, 0, 255)
      let nnG = constrain(g * neon, 0, 255)
      let nnB = constrain(b * neon, 0, 255)

      let values = (r + g + b) / 3;
      let charIndex = int(map(values, 0, 255, 0, asciis.length - 1, 0));

      let cX = x + width/2 - wV / 2;
      let cY = y + height/2 - hV / 2;

      fill(tColor);
      noStroke();
      rect(cX, cY, pxS, pxS);
      
      noStroke();
      fill(nnR, nnG, nnB, 100); 
      textSize(pxS * 1.3);
      text(asciis[charIndex], cX, cY);

      fill(nnR,nnG,nnB);
      textSize(pxS);
      text(asciis[charIndex], cX, cY);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

