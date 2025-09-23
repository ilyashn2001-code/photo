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

// ✅ ПРАВИЛЬНОЕ renderGallery
function renderGallery(filterText = "", status = "") {
  gallery.innerHTML = "";

  const filteredPhotos = photos.filter(({ title, status: s }) =>
    title.toLowerCase().includes(filterText.toLowerCase()) &&
    (!status || s === status)
  );

  filteredPhotos.forEach((photo) => {
    const originalIndex = photos.findIndex(p => p.img === photo.img);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="images/${photo.img}" alt="${photo.title}" />
      <div class="card-content">
        <div class="card-title">${photo.title}</div>
        <div class="card-status ${photo.statusClass}">${photo.status}</div>
<div class="card-actions">
  <a href="images/${photo.img}" target="_blank" class="open-photo-link">Открыть</a>
</div>

      </div>
    `;

    gallery.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  renderGallery(searchInput.value, statusFilter.value);
});
statusFilter.addEventListener("change", () => {
  renderGallery(searchInput.value, statusFilter.value);
});
renderGallery(); // 🎉 Вызов первой отрисовки

// ==========================
// МОДАЛКА "Добавить фото"
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

document.getElementById("openAddModal").addEventListener("click", () => {
  document.getElementById("addModal").style.display = "flex";
});
document.addEventListener("click", (e) => {
  if (e.target.matches(".modal-close")) {
    const id = e.target.dataset.close;
    document.getElementById(id).style.display = "none";
  }
});

// ==========================
// ФОТО-МОДАЛКА
// ==========================
const photoModal = document.getElementById("photoModal");
let currentPhotoIndex = 0;

function openPhotoModal(index) {
  currentPhotoIndex = index;
  const { title, img } = photos[index];

  photoModal.innerHTML = `
    <div class="modal-content" style="width: auto; max-width: 90vw; max-height: 90vh; padding: 0; border-radius: 8px; position: relative; background: white; display: flex; flex-direction: column; align-items: center;">
      <div class="modal-header" style="width: 100%; background: var(--sidebar-bg); padding: 16px 24px; color: white; display: flex; justify-content: space-between; align-items: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h3 style="margin: 0; font-size: 18px;">Фото-отчет по объекту</h3>
        <span class="modal-close" id="closePhotoModal" style="font-size: 22px; cursor: pointer;">&times;</span>
      </div>
      <div style="width: 100%; text-align: center; background: #f2f2f2; padding: 8px; font-weight: 500; color: #333;">
        ${title}
      </div>
      <div class="slider-wrapper" style="position: relative; width: 100%; max-width: 720px; display: flex; justify-content: center; align-items: center; background: #fff; padding: 20px;">
        <button id="prevPhoto" class="slider-btn" style="position: absolute; left: -40px; top: 50%; transform: translateY(-50%); background: #fff; border: 1px solid #ccc; border-radius: 50%; width: 36px; height: 36px; font-size: 18px; cursor: pointer;">❮</button>
        <img id="modalPhoto" src="images/${img}" alt="Фото" style="max-width: 640px; max-height: 480px; object-fit: contain; border-radius: 6px;" />
        <button id="nextPhoto" class="slider-btn" style="position: absolute; right: -40px; top: 50%; transform: translateY(-50%); background: #fff; border: 1px solid #ccc; border-radius: 50%; width: 36px; height: 36px; font-size: 18px; cursor: pointer;">❯</button>
      </div>
      <div id="photoIndex" style="margin: 10px 0 20px; font-size: 14px; color: #555;">
        Фото ${index + 1} из ${photos.length}
      </div>
    </div>
  `;

  photoModal.style.display = "flex";

  document.getElementById("closePhotoModal").onclick = () => {
    photoModal.style.display = "none";
  };
  document.getElementById("prevPhoto").onclick = () => {
    openPhotoModal((currentPhotoIndex - 1 + photos.length) % photos.length);
  };
  document.getElementById("nextPhoto").onclick = () => {
    openPhotoModal((currentPhotoIndex + 1) % photos.length);
  };
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".open-photo")) {
    const index = parseInt(e.target.dataset.index);
    openPhotoModal(index);
  }
});
