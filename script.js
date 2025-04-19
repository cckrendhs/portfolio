document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
  
    // 點擊按鈕切換 sidebar 的 "open" class
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  });
  