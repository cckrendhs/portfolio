let circles = [];
let circleCount = 20;
let fft;


function preload() {
  song = loadSound('music/資訊化音樂4.mp3');
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('portfolio-sketch-container'); // 將畫布附加到容器
    fft = new p5.FFT();
    for (let i = 0; i < circleCount; i++) {
      circles.push(new MovingCircle());
    }
    
    song.loop(); // 循環播放音樂
}

function draw() {
  background(0);
  let spectrum = fft.analyze();

  for (let circle of circles) {
    let energy = spectrum[int(random(0, spectrum.length))];
    circle.size = map(energy, 0, 255, 20, 100);
    circle.update();
    circle.display();
  }
}

class MovingCircle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(40, 100);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.color = color(random(255), random(255), random(255), 150);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

function mousePressed() {
  circles = [];
  for (let i = 0; i < int(random(10, 30)); i++) {
    circles.push(new MovingCircle());
  }
}

function keyPressed() {
  if (key === ' ') {
    circles = [];
    for (let i = 0; i < circleCount; i++) {
      circles.push(new MovingCircle());
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
