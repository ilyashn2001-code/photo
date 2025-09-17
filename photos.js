const photos = [
  { title: 'Автосалон Hyundai', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Hyundai' },
  { title: 'Жилой дом', status: 'Ожидают проверки', imageUrl: 'https://via.placeholder.com/400x200?text=Жилой+дом' },
  { title: 'Школа №5', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Школа+№5' },
  { title: 'Парк "Северный"', status: 'Проблемные', imageUrl: 'https://via.placeholder.com/400x200?text=Парк+Северный' },
  { title: 'Метро "Центр"', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Метро+Центр' },
  { title: 'Кафе "БургХаус"', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Кафе+BurgHouse' },
  { title: 'Магазин "Уют"', status: 'Ожидают проверки', imageUrl: 'https://via.placeholder.com/400x200?text=Магазин+Уют' },
  { title: 'Больница №3', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Больница+№3' },
  { title: 'Салон красоты "Мила"', status: 'Проблемные', imageUrl: 'https://via.placeholder.com/400x200?text=Салон+Мила' },
  { title: 'Спорткомплекс', status: 'Ожидают проверки', imageUrl: 'https://via.placeholder.com/400x200?text=Спорткомплекс' },
  { title: 'Офисное здание "Грин"', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Офис+Грин' },
  { title: 'Мечеть "Свет мира"', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Мечеть+Свет+мира' },
  { title: 'Завод "ТехПром"', status: 'Проблемные', imageUrl: 'https://via.placeholder.com/400x200?text=Завод+ТехПром' },
  { title: 'Библиотека', status: 'Ожидают проверки', imageUrl: 'https://via.placeholder.com/400x200?text=Библиотека' },
  { title: 'Почтовое отделение', status: 'Проверено', imageUrl: 'https://via.placeholder.com/400x200?text=Почтовое+отделение' },
];

function renderPhotos(list) {
  const container = document.getElementById('photoList');
  container.innerHTML = '';
  list.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
      <img src="${photo.imageUrl}" alt="${photo.title}">
      <div class="card-body">
        <h3>${photo.title}</h3>
        <span class="status">${photo.status}</span>
        <div class="actions">
          <button>Открыть</button>
          <button>✏️</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', function() {
  const val = this.value.toLowerCase();
  const filtered = photos.filter(p => p.title.toLowerCase().includes(val));
  renderPhotos(filtered);
});

renderPhotos(photos);
