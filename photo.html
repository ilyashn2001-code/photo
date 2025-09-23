<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Фото-отчет по объекту</title>
  <!-- Подключи CSS, где определены переменные и стили -->
  <link rel="stylesheet" href="photos.css" />
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      background: var(--bg-color);
      color: var(--text-color);
    }
    .modal-header {
      background: var(--sidebar-bg);
      color: var(--sidebar-text);
      padding: 16px 24px;
      font-size: 18px;
      font-weight: 600;
    }
    .photo-title {
      padding: 12px 16px;
      background: #f2f2f2;
      font-weight: 500;
      font-size: 14px;
    }
    .slider {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 20px;
      background: white;
    }
    .slider img {
      max-width: 90vw;
      max-height: 80vh;
      border-radius: 8px;
      object-fit: contain;
    }
    .slider-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      font-size: 18px;
      cursor: pointer;
      user-select: none;
    }
    #prevPhoto { left: 20px; }
    #nextPhoto { right: 20px; }
  </style>
</head>
<body>

  <div class="modal-header">Фото-отчет по объекту</div>
  <div class="photo-title" id="photoTitle">Загрузка...</div>
  <div class="slider">
    <button class="slider-btn" id="prevPhoto">❮</button>
    <img id="photoView" src="" alt="Фото" />
    <button class="slider-btn" id="nextPhoto">❯</button>
  </div>

  <script>
    // Получаем параметры из URL
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title") || "Без названия объекта";
    const photosParam = params.get("photos") || "[]";

    let photos = [];
    try {
      photos = JSON.parse(decodeURIComponent(photosParam));
    } catch(e) {
      console.error("Не удалось распарсить photos:", e);
      photos = [];
    }

    // Защита: если нет фото — показываем что‑то
    if (!photos.length) {
      document.getElementById("photoTitle").textContent = title;
      document.getElementById("photoView").alt = "Нет фото";
      document.getElementById("photoView").src = "";
    } else {
      let currentIndex = 0;

      function renderPhoto() {
        document.getElementById("photoView").src = "images/" + photos[currentIndex];
        document.getElementById("photoView").alt = photos[currentIndex];
        document.getElementById("photoTitle").textContent = title;
      }

      document.getElementById("prevPhoto").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        renderPhoto();
      });

      document.getElementById("nextPhoto").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % photos.length;
        renderPhoto();
      });

      renderPhoto();
    }
  </script>

</body>
</html>
