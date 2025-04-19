let shapes = [];
let shapeCount = 30;
let isSecondAnimation = false; // 用於標記當前動畫狀態

function preload() {
  song = loadSound('music/資訊化音樂1.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeAnimation();
  song.loop(); // 循環播放音樂
}

function draw() {
  if (isSecondAnimation) {
    secondAnimation(); // 切換到第二種動畫（線條）
  } else {
    firstAnimation(); // 第一種動畫（圓形）
  }
}

function initializeAnimation() {
  noStroke();
  background(0);

  // 初始化幾何形狀
  for (let i = 0; i < shapeCount; i++) {
    shapes.push(new MovingShape());
  }
}

function firstAnimation() {
  background(0, 20); // 第一動畫的拖尾背景

  for (let shape of shapes) {
    shape.update();
    shape.displayAsCircle(); // 第一動畫使用圓形
  }
}

function secondAnimation() {
  background(20, 20, 50, 50); // 第二動畫的背景顏色

  for (let shape of shapes) {
    shape.update();
    shape.displayAsLine(); // 第二動畫使用線條
  }
}

// 切換動畫模式
document.addEventListener('DOMContentLoaded', () => {
  const homeBtn = document.getElementById("home-btn");
  homeBtn.addEventListener("click", (event) => {
    event.preventDefault(); // 阻止默認跳轉
    isSecondAnimation = !isSecondAnimation; // 切換動畫狀態
    shapes = []; // 清空舊形狀
    initializeAnimation(); // 重新初始化形狀
  });
});

// 當滑鼠點擊時，改變形狀的顏色和運動速度
function mousePressed() {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].color = color(random(255), random(255), random(255));
    shapes[i].speedX = random(-5, 5);
    shapes[i].speedY = random(-5, 5);
  }
}

// 當滑鼠滑動時，改變形狀的運動方向
function mouseDragged() {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].speedX = map(mouseX, 0, width, -5, 5);
    shapes[i].speedY = map(mouseY, 0, height, -5, 5);
  }
}

class MovingShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 50);
    this.color = color(random(255), random(255), random(255));
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.targetX = random(width); // 線條的終點X
    this.targetY = random(height); // 線條的終點Y
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 如果形狀超出邊界，反彈回來
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }

    // 線條終點隨機抖動
    this.targetX += random(-2, 2);
    this.targetY += random(-2, 2);

    // 根據滑鼠位置改變顏色
    this.color = color(
      map(mouseX, 0, width, 0, 255),
      map(mouseY, 0, height, 0, 255),
      map(sin(frameCount * 0.05), -1, 1, 100, 255)
    );
  }

  displayAsCircle() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  displayAsLine() {
    stroke(this.color);
    strokeWeight(map(this.size, 10, 50, 1, 5)); // 線條粗細與原大小相關
    line(this.x, this.y, this.targetX, this.targetY); // 繪製線條
  }
}
