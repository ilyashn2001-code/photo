const photos = [
  { title: "Дворовая территория по адресу: Путевой пр. 38",   img: "Путевой_1.png", additional: ["Путевой_2.png", "Путевой_3.png"], status: "Проверено", statusClass: "status-checked" },
  { title: "Дворовая территория по адресу: Флотская ул. 54, 58 к.1", img: "Флотская_1.png",  additional: ["Флотская_2.png", "Флотская_3.png"], status: "Ожидают проверки", statusClass: "status-pending" },
  { title: "Дворовая территория по адресу: Каргопольская ул. 18", img: "Каргопольская_1.png",  additional: ["Каргопольская_2.png", "Каргопольская_3.png"], status: "Проверено", statusClass: "status-checked" },
  { title: "Дворовая территория по адресу: Бестужевых ул. 27А", img: "Бестужевых_1.png",  additional: ["Бестужевых_2.png", "Бестужевых_3.png"], status: "Проблемные", statusClass: "status-problem" },
  { title: "Дворовая территория по адресу: Челобитьевское шоссе 14 к.3, 14 к.4, 14 к.5", img: "Челобитьевское_1.png",  additional: ["Челобитьевское_2.png"], status: "Ожидают проверки", statusClass: "status-pending" },
  { title: "Дворовая территория по адресу: Мира просп. 194", img: "Мира_1.png",  additional: ["Мира_2.png", "Мира_3.png"], status: "Проверено", statusClass: "status-checked" }
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// Галерея
function renderGallery(filterText = "", status = "") {
  gallery.innerHTML = "";

  const filteredPhotos = photos.filter(({ title, status: s }) =>
    title.toLowerCase().includes(filterText.toLowerCase()) &&
    (!status || s === status)
  );

  filteredPhotos.forEach((photo, index) => {
    const originalIndex = photos.findIndex(p => p.img === photo.img);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="images/${photo.img}" alt="${photo.title}" />
      <div class="card-content">
        <div class="card-title">${photo.title}</div>
        <div class="card-status ${photo.statusClass}">${photo.status}</div>
   <div class="card-actions">
  <a href="./photo.html?title=${encodeURIComponent(photo.title)}&photos=${encodeURIComponent(JSON.stringify([photo.img, ...(photo.additional || [])]))}"
     target="_blank"
     class="open-photo-link">Открыть</a>
  <button class="btn-description" data-desc="${encodeURIComponent(photo.description || 'Описание отсутствует')}">Описание работ</button>
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

renderGallery(); // при загрузке

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-description")) {
    const desc = decodeURIComponent(e.target.dataset.desc);
    document.getElementById("descModalText").textContent = desc;
    document.getElementById("descModal").style.display = "flex";
  }
});


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
