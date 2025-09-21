// ==========================
// ГАЛЕРЕЯ
// ==========================
const photos = [
  { title: "Строительство школы", img: "school_modern.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Офисное здание", img: "office_building.png", status: "Ожидают проверки", statusClass: "status-pending" },
  { title: "Метро 'Юг'", img: "metro_yug.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Парк 'Центральный'", img: "park_central.png", status: "Проблемные", statusClass: "status-problem" },
  { title: "Детский сад №12", img: "kindergarten_12.png", status: "Ожидают проверки", statusClass: "status-pending" },
  { title: "Жилой дом, ул. Лесная", img: "residential_lesnaya.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Завод 'ТехПром'", img: "factory_techprom.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Торговый центр", img: "mall_main.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Кафе 'БургХаус'", img: "cafe_burghaus.png", status: "Ожидают проверки", statusClass: "status-pending" },
  { title: "Автосалон Hyundai", img: "dealer_hyundai.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Мечеть 'Свет мира'", img: "mosque_light_of_world.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Больница №3", img: "hospital_3.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Салон красоты 'Мила'", img: "salon_mila.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Спорткомплекс", img: "sports_complex.png", status: "Проверено", statusClass: "status-checked" },
  { title: "Почтовое отделение", img: "post_office.png", status: "Проверено", statusClass: "status-checked" }
];

const gallery = document.getElementById("gallery");

photos.forEach(({ title, img, status, statusClass }) => {
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

// === Загрузить Фото
createModal("uploadModal", "Загрузка фотографий", `
  <input type="file" accept="image/*" />
`);

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
document.getElementById("openUploadModal").addEventListener("click", () => {
  document.getElementById("uploadModal").style.display = "flex";
});

document.getElementById("openAddModal").addEventListener("click", () => {
  document.getElementById("addModal").style.display = "flex";
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".modal-close")) {
    const id = e.target.dataset.close;
    document.getElementById(id).style.display = "none";
  }
});
