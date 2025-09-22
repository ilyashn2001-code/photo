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


// === Добавить Фото — обновлённый дизайн
createModal("addModal", "Добавить фото", `
  <label>Фото:</label>
  <input type="file" accept="image/*" />

  <label>Описание:</label>
  <textarea rows="2" placeholder="Краткое описание фото"></textarea>

  <label>Журнал:</label>
  <select>
    <option value="">Выберите журнал</option>
    <option>Журнал строительства</option>
    <option>Технический надзор</option>
    <option>Контроль качества</option>
  </select>

  <div style="display: flex; gap: 10px;">
    <div style="flex: 1;">
      <label>Широта:</label>
      <input type="text" placeholder="55.7558" />
    </div>
    <div style="flex: 1;">
      <label>Долгота:</label>
      <input type="text" placeholder="37.6173" />
    </div>
    <div style="flex: 1;">
      <label>Точность (м):</label>
      <input type="text" placeholder="5.0" />
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
