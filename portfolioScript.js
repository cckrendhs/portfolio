// 初始化每個輪播的當前索引
let currentIndex = {
  slider1: 0,
  slider2: 0,
  slider4: 0,
  slider6: 0, // ✅ 新增 slider6
  slider7: 0,
};

// 根據 slider ID 傳入對應索引名稱
function moveSlide(direction, sliderId) {
  const slider = document.getElementById(sliderId);
  const container = slider.querySelector(".slider-container");

  let slideClass = '';
  if (sliderId === "slider1") slideClass = ".slide";
  else if (sliderId === "slider2") slideClass = ".slide2";
  else if (sliderId === "slider4") slideClass = ".slide4";
  else if (sliderId === "slider6") slideClass = ".slide6"; // ✅ 加入 slider6
    else if (sliderId === "slider7") slideClass = ".slide7";
  else return;

  const slides = slider.querySelectorAll(slideClass);
  const totalSlides = slides.length;

  if (totalSlides === 0) return;

  const slideWidth = slides[0].offsetWidth;

  currentIndex[sliderId] += direction;

  if (currentIndex[sliderId] < 0) {
    currentIndex[sliderId] = totalSlides - 1;
  } else if (currentIndex[sliderId] >= totalSlides) {
    currentIndex[sliderId] = 0;
  }

  const offset = -currentIndex[sliderId] * slideWidth;
  container.style.transform = `translateX(${offset}px)`;
}

document.addEventListener("DOMContentLoaded", () => {
  // 初始化輪播位置
  ["slider1", "slider2", "slider4", "slider6"].forEach((sliderId) => {
    const slider = document.getElementById(sliderId);
    const container = slider?.querySelector(".slider-container");
    if (container) container.style.transform = "translateX(0px)";
  });

  // 綁定每組按鈕
  const buttonSets = [
    { sliderId: "slider1", className: ".image-slider" },
    { sliderId: "slider2", className: ".image-slider2" },
    { sliderId: "slider4", className: ".image-slider4" },
    { sliderId: "slider6", className: ".image-slider6" }, // ✅ 新增 slider6
    { sliderId: "slider7", className: ".image-slider7" },
  ];

  buttonSets.forEach(({ sliderId, className }) => {
    const prev = document.querySelector(`${className} .prev`);
    const next = document.querySelector(`${className} .next`);

    if (prev && next) {
      prev.addEventListener("click", () => moveSlide(-1, sliderId));
      next.addEventListener("click", () => moveSlide(1, sliderId));
    }
  });

  // 側邊欄按鈕
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggle-btn");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
});
