// ==========================
// ГАЛЕРЕЯ
// ==========================
const photos = [
  { title: "Дворовая территория по адресу: Путевой пр. 38", img: "school_modern.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Дворовая территория по адресу: Флотская ул. 54, 58 к.1", img: "office_building.png", status: "Ожидают проверки", statusClass: "status-pending" },
  { title: "Дворовая территория по адресу: Каргопольская ул. 18", img: "metro_yug.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Дворовая территория по адресу: Бестужевых ул. 27А", img: "park_central.png", status: "Проблемные", statusClass: "status-problem" },
  { title: "Дворовая территория по адресу: Челобитьевское шоссе 14 к.3, 14 к.4, 14 к.5", img: "kindergarten_12.png", status: "Ожидают проверки", statusClass: "status-pending" },
  { title: "Дворовая территория по адресу: Мира просп. 194", img: "residential_lesnaya.png", status: "Проверено", statusClass: "status-checked" }
];

const gallery = document.getElementById("gallery");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function renderGallery(filterText = "", status = "") {
  gallery.innerHTML = "";

  const filteredPhotos = photos.filter(({ title, status: s }) => {
    const matchesSearch = title.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus = !status || s === status;
    return matchesSearch && matchesStatus;
  });

  filteredPhotos.forEach(({ title, img, status, statusClass }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="images/${img}" alt="${title}" />
      <div class="card-content">
        <div class="card-title">${title}</div>
        <div class="card-status ${statusClass}">${status}</div>
        <div class="card-actions">
          <button>Открыть</button>
        </div>
      </div>
    `;
    gallery.appendChild(card);
  });
}



// Слушатели событий
searchInput.addEventListener("input", () => {
  renderGallery(searchInput.value, statusFilter.value);
});

statusFilter.addEventListener("change", () => {
  renderGallery(searchInput.value, statusFilter.value);
});

// Первая отрисовка
renderGallery();


// ==========================
// МОДАЛКИ
// ==========================
function createModal(id, title, contentHTML) {
  const modal = document.createElement("div");
  modal.id = id;
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <span class="modal-close" data-close="${id}">&times;</span>
      </div>
      <div class="modal-body">${contentHTML}</div>
      <div class="modal-footer">
        <button>Сохранить</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}


createModal("addModal", "Добавить фото", `
  <label>Фото:</label>
  <input type="file" accept="image/*" />

  <label>Описание:</label>
  <textarea rows="2" placeholder="Краткое описание фото"></textarea>

  <label>Журнал:</label>
  <select disabled>
    <option value="">Определяется автоматически</option>
  </select>

  <div style="display: flex; gap: 10px; margin-top: 10px;">
    <div style="flex: 1;">
      <label>Широта:</label>
      <input type="text" disabled placeholder="..." />
    </div>
    <div style="flex: 1;">
      <label>Долгота:</label>
      <input type="text" disabled placeholder="..." />
    </div>
    <div style="flex: 1;">
      <label>Точность (м):</label>
      <input type="text" disabled placeholder="..." />
    </div>
  </div>
`);



// ==========================
// ОБРАБОТЧИКИ МОДАЛОК
// ==========================

document.getElementById("openAddModal").addEventListener("click", () => {
  document.getElementById("addModal").style.display = "flex";
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".modal-close")) {
    const id = e.target.dataset.close;
    document.getElementById(id).style.display = "none";
  }
});


// === ФОТО-МОДАЛКА ===
const photoModal = document.createElement("div");
photoModal.id = "photoModal";
photoModal.className = "modal";
photoModal.innerHTML = `
  <div class="modal-content" style="width: 77%; padding: 20px; border-radius: 8px; position: relative; background: white; display: flex; flex-direction: column; align-items: center;">
    
    <div class="modal-header" style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h3 style="margin: 0; font-size: 20px;">Фото-отчет по объекту</h3>
      <span class="modal-close" id="closePhotoModal" style="font-size: 28px; cursor: pointer;">&times;</span>
    </div>

    <div class="slider-wrapper" style="position: relative; width: 100%; display: flex; justify-content: center; align-items: center;">
      <button id="prevPhoto" class="slider-btn" style="position: absolute; left: -40px; font-size: 28px; background: none; border: none; cursor: pointer;">←</button>
      
      <img id="modalPhoto" src="" alt="Фото" style="max-width: 100%; max-height: 600px; object-fit: contain; border-radius: 6px;" />

      <button id="nextPhoto" class="slider-btn" style="position: absolute; right: -40px; font-size: 28px; background: none; border: none; cursor: pointer;">→</button>
    </div>

    <div id="photoIndex" style="margin-top: 14px; font-size: 15px; color: #555;">Фото №1</div>
  </div>
`;
document.body.appendChild(photoModal);

// Фотка
let currentPhoto = "";

document.addEventListener("click", (e) => {
  if (e.target.textContent === "Открыть") {
    const card = e.target.closest(".card");
    const imgSrc = card.querySelector("img").getAttribute("src");

    currentPhoto = imgSrc;
    document.getElementById("modalPhoto").src = currentPhoto;
    document.getElementById("photoIndex").textContent = "Фото №1";
    document.getElementById("photoModal").style.display = "flex";
  }

  if (e.target.id === "closePhotoModal") {
    document.getElementById("photoModal").style.display = "none";
  }

  if (e.target.id === "prevPhoto" || e.target.id === "nextPhoto") {
    document.getElementById("modalPhoto").src = currentPhoto;
    document.getElementById("photoIndex").textContent = "Фото №1";
  }
});
