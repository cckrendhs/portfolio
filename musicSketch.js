let song;
let fft;
let amp;

function preload() {
  song = loadSound('music/資訊化音樂3.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  amp = new p5.Amplitude();
  song.loop(); // 循環播放音樂
}

function draw() {
  let spectrum = fft.analyze(); // 獲取音頻頻譜

  // 根據音樂頻譜改變背景顏色
  let bgColor = map(spectrum[0], 0, 256, 0, 255); // 用最小頻譜數據來改變背景顏色
  background(bgColor, 0, 100); // 設置動態背景

  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, TWO_PI);
    let radius = map(spectrum[i], 0, 256, 50, 300); // 頻譜數據影響圓形半徑
    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);

    // 設置彩虹顏色
    let r = map(sin(angle), -1, 1, 100, 255);
    let g = map(cos(angle), -1, 1, 100, 255);
    let b = map(sin(angle + PI), -1, 1, 100, 255);

    fill(r, g, b);
    noStroke();
    ellipse(x, y, 20, 20); // 繪製圓形
  }
}
