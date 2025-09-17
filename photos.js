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
        <button>✏️</button>
      </div>
    </div>
  `;
  gallery.appendChild(card);
});
