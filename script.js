// Переключение страниц
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    // Убираем класс active с текущего пункта меню
    document.querySelector('.nav .active')?.classList.remove('active');
    // Добавляем класс active к выбранному пункту
    link.classList.add('active');

    // Скрываем все страницы
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });

    // Показываем выбранную страницу
    const pageId = link.dataset.page;
    document.getElementById(pageId).classList.remove('hidden');
  });
});

// По умолчанию показываем страницу "Мои записи"
document.addEventListener('DOMContentLoaded', () => {
  const defaultPage = document.querySelector('.nav .active');
  if (defaultPage) {
    const pageId = defaultPage.dataset.page;
    document.getElementById(pageId).classList.remove('hidden');
  }
});

// Добавление записи
const addRecordBtn = document.querySelector('.add-record-btn');
const recordsList = document.querySelector('.records-list');

addRecordBtn.addEventListener('click', () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Добавить запись</h3>
      
      <!-- Настроение -->
      <div class="form-group">
        <label>Настроение:</label>
        <div class="button-group mood-buttons">
          <button class="mood-btn excellent-btn" data-value="Отлично">Отлично</button>
          <button class="mood-btn good-btn" data-value="Хорошо">Хорошо</button>
          <button class="mood-btn normal-btn" data-value="Нормально">Нормально</button>
          <button class="mood-btn bad-btn" data-value="Плохо">Плохо</button>
          <button class="mood-btn terribly-btn" data-value="Ужасно">Ужасно</button>
        </div>
      </div>

      <!-- Эмоции -->
      <div class="form-group">
        <label>Эмоции:</label>
        <div class="button-group emotion-buttons">
          <button class="emotion-btn" data-value="Счастье">Счастье</button>
          <button class="emotion-btn" data-value="Радость">Радость</button>
          <button class="emotion-btn" data-value="Волнение">Волнение</button>
          <button class="emotion-btn" data-value="Расслабленность">Расслабленность</button>
          <button class="emotion-btn" data-value="Скука">Скука</button>
          <button class="emotion-btn" data-value="Тревожность">Тревожность</button>
          <button class="emotion-btn" data-value="Грусть">Грусть</button>
          <button class="emotion-btn" data-value="Отчаяние">Отчаяние</button>
          <button class="emotion-btn" data-value="Стресс">Стресс</button>
          <button class="emotion-btn" data-value="Страх">Страх</button>
          <button class="emotion-btn" data-value="Злость">Злость</button>
        </div>
      </div>

      <!-- Полезные привычки -->
      <div class="form-group">
        <label>Полезные привычки:</label>
        <div class="button-group habit-buttons good-habits">
          <button class="habit-btn" data-value="Пить много воды">Пить много воды</button>
          <button class="habit-btn" data-value="Заниматься спортом">Заниматься спортом</button>
          <button class="habit-btn" data-value="Много ходить">Много ходить</button>
          <button class="habit-btn" data-value="Читать книги">Читать книги</button>
        </div>
      </div>

      <!-- Вредные привычки -->
      <div class="form-group">
        <label>Вредные привычки:</label>
        <div class="button-group habit-buttons bad-habits">
          <button class="habit-btn" data-value="Курить">Курить</button>
          <button class="habit-btn" data-value="Употреблять алкоголь">Употреблять алкоголь</button>
          <button class="habit-btn" data-value="Фаст-фуд">Фаст-фуд</button>
          <button class="habit-btn" data-value="Прокрастинация">Прокрастинация</button>
        </div>
      </div>

      <!-- Текстовая заметка -->
      <div class="form-group">
        <label>Текстовая заметка:</label>
        <textarea class="note-input" placeholder="Введите заметку"></textarea>
      </div>

      <button onclick="addRecord(this)">Готово</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.style.display = 'block';

  // Логика для кнопок выбора
  setupButtonSelection(modal);
});

// Функция для настройки выбора кнопок
function setupButtonSelection(modal) {
  modal.querySelectorAll('.button-group button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected');
    });
  });
}

// Функция для добавления записи
function addRecord(button) {
  const modal = button.closest('.modal');

  // Настроение
  const moodButtons = modal.querySelectorAll('.mood-buttons .mood-btn.selected');
  const mood = moodButtons.length > 0 ? moodButtons[0].dataset.value : '';

  // Эмоции
  const emotionButtons = modal.querySelectorAll('.emotion-buttons .emotion-btn.selected');
  const emotions = Array.from(emotionButtons).map(btn => btn.dataset.value).join(', ');

  // Полезные привычки
  const goodHabitButtons = modal.querySelectorAll('.good-habits .habit-btn.selected');
  const goodHabits = Array.from(goodHabitButtons).map(btn => btn.dataset.value).join(', ');

  // Вредные привычки
  const badHabitButtons = modal.querySelectorAll('.bad-habits .habit-btn.selected');
  const badHabits = Array.from(badHabitButtons).map(btn => btn.dataset.value).join(', ');

  // Текстовая заметка
  const noteInput = modal.querySelector('.note-input');
  const note = noteInput.value.trim();

  if (mood || emotions || goodHabits || badHabits || note) {
    const recordItem = document.createElement('div');
    const recordId = Date.now(); // Генерация уникального ID
    recordItem.classList.add('record-item');
    recordItem.dataset.id = recordId; // Присваиваем ID записи
    recordItem.innerHTML = `
      <strong>Настроение: ${mood || 'Нет данных'}</strong>
      <p><strong>Эмоции:</strong> ${emotions || 'Нет данных'}</p>
      <p><strong>Полезные привычки:</strong> ${goodHabits || 'Нет данных'}</p>
      <p><strong>Вредные привычки:</strong> ${badHabits || 'Нет данных'}</p>
      <p><strong>Заметка:</strong> ${note || 'Нет данных'}</p>
      <button class="edit-record-btn">Редактировать</button>
    `;

    // Сохраняем текущие данные записи в атрибутах data-*
    recordItem.dataset.mood = mood;
    recordItem.dataset.emotions = emotions;
    recordItem.dataset.goodHabits = goodHabits;
    recordItem.dataset.badHabits = badHabits;
    recordItem.dataset.note = note;

    // Добавляем функционал редактирования записи
    recordItem.querySelector('.edit-record-btn').addEventListener('click', () => {
      editRecord(recordItem);
    });

    recordsList.prepend(recordItem);
  }

  modal.remove();
}

// Функция для редактирования записи
function editRecord(recordItem) {
  const oldMood = recordItem.dataset.mood;
  const oldEmotions = recordItem.dataset.emotions.split(', ');
  const oldGoodHabits = recordItem.dataset.goodHabits.split(', ');
  const oldBadHabits = recordItem.dataset.badHabits.split(', ');
  const oldNote = recordItem.dataset.note;
  const recordId = recordItem.dataset.id;

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Редактировать запись</h3>
      
      <!-- Настроение -->
      <div class="form-group">
        <label>Настроение:</label>
        <div class="button-group mood-buttons">
          <button class="mood-btn ${oldMood === 'Отлично' ? 'selected' : ''}" data-value="Отлично">Отлично</button>
          <button class="mood-btn ${oldMood === 'Хорошо' ? 'selected' : ''}" data-value="Хорошо">Хорошо</button>
          <button class="mood-btn ${oldMood === 'Нормально' ? 'selected' : ''}" data-value="Нормально">Нормально</button>
          <button class="mood-btn ${oldMood === 'Плохо' ? 'selected' : ''}" data-value="Плохо">Плохо</button>
          <button class="mood-btn ${oldMood === 'Ужасно' ? 'selected' : ''}" data-value="Ужасно">Ужасно</button>
        </div>
      </div>

      <!-- Эмоции -->
      <div class="form-group">
        <label>Эмоции:</label>
        <div class="button-group emotion-buttons">
          <button class="emotion-btn ${oldEmotions.includes('Счастье') ? 'selected' : ''}" data-value="Счастье">Счастье</button>
          <button class="emotion-btn ${oldEmotions.includes('Радость') ? 'selected' : ''}" data-value="Радость">Радость</button>
          <button class="emotion-btn ${oldEmotions.includes('Волнение') ? 'selected' : ''}" data-value="Волнение">Волнение</button>
          <button class="emotion-btn ${oldEmotions.includes('Расслабленность') ? 'selected' : ''}" data-value="Расслабленность">Расслабленность</button>
          <button class="emotion-btn ${oldEmotions.includes('Скука') ? 'selected' : ''}" data-value="Скука">Скука</button>
          <button class="emotion-btn ${oldEmotions.includes('Тревожность') ? 'selected' : ''}" data-value="Тревожность">Тревожность</button>
          <button class="emotion-btn ${oldEmotions.includes('Грусть') ? 'selected' : ''}" data-value="Грусть">Грусть</button>
          <button class="emotion-btn ${oldEmotions.includes('Отчаяние') ? 'selected' : ''}" data-value="Отчаяние">Отчаяние</button>
          <button class="emotion-btn ${oldEmotions.includes('Стресс') ? 'selected' : ''}" data-value="Стресс">Стресс</button>
          <button class="emotion-btn ${oldEmotions.includes('Страх') ? 'selected' : ''}" data-value="Страх">Страх</button>
          <button class="emotion-btn ${oldEmotions.includes('Злость') ? 'selected' : ''}" data-value="Злость">Злость</button>
        </div>
      </div>

      <!-- Полезные привычки -->
      <div class="form-group">
        <label>Полезные привычки:</label>
        <div class="button-group habit-buttons good-habits">
          <button class="habit-btn ${oldGoodHabits.includes('Пить много воды') ? 'selected' : ''}" data-value="Пить много воды">Пить много воды</button>
          <button class="habit-btn ${oldGoodHabits.includes('Заниматься спортом') ? 'selected' : ''}" data-value="Заниматься спортом">Заниматься спортом</button>
          <button class="habit-btn ${oldGoodHabits.includes('Много ходить') ? 'selected' : ''}" data-value="Много ходить">Много ходить</button>
          <button class="habit-btn ${oldGoodHabits.includes('Читать книги') ? 'selected' : ''}" data-value="Читать книги">Читать книги</button>
        </div>
      </div>

      <!-- Вредные привычки -->
      <div class="form-group">
        <label>Вредные привычки:</label>
        <div class="button-group habit-buttons bad-habits">
          <button class="habit-btn ${oldBadHabits.includes('Курить') ? 'selected' : ''}" data-value="Курить">Курить</button>
          <button class="habit-btn ${oldBadHabits.includes('Употреблять алкоголь') ? 'selected' : ''}" data-value="Употреблять алкоголь">Употреблять алкоголь</button>
          <button class="habit-btn ${oldBadHabits.includes('Фаст-фуд') ? 'selected' : ''}" data-value="Фаст-фуд">Фаст-фуд</button>
          <button class="habit-btn ${oldBadHabits.includes('Прокрастинация') ? 'selected' : ''}" data-value="Прокрастинация">Прокрастинация</button>
        </div>
      </div>

      <!-- Текстовая заметка -->
      <div class="form-group">
        <label>Текстовая заметка:</label>
        <textarea class="note-input">${oldNote}</textarea>
      </div>

      <button onclick="saveEditedRecord(this, '${recordId}')">Сохранить изменения</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.style.display = 'block';

  // Логика для кнопок выбора
  setupButtonSelection(modal);
}

// Функция для сохранения изменений
function saveEditedRecord(button, recordId) {
  const modal = button.closest('.modal');

  // Настроение
  const moodButtons = modal.querySelectorAll('.mood-buttons .mood-btn.selected');
  const newMood = moodButtons.length > 0 ? moodButtons[0].dataset.value : '';

  // Эмоции
  const emotionButtons = modal.querySelectorAll('.emotion-buttons .emotion-btn.selected');
  const newEmotions = Array.from(emotionButtons).map(btn => btn.dataset.value).join(', ');

  // Полезные привычки
  const goodHabitButtons = modal.querySelectorAll('.good-habits .habit-btn.selected');
  const newGoodHabits = Array.from(goodHabitButtons).map(btn => btn.dataset.value).join(', ');

  // Вредные привычки
  const badHabitButtons = modal.querySelectorAll('.bad-habits .habit-btn.selected');
  const newBadHabits = Array.from(badHabitButtons).map(btn => btn.dataset.value).join(', ');

  // Текстовая заметка
  const noteInput = modal.querySelector('.note-input');
  const newNote = noteInput.value.trim();

  // Находим запись по её ID
  const recordItem = document.querySelector(`[data-id="${recordId}"]`);

  if (recordItem) {
    // Обновляем данные записи в DOM
    recordItem.querySelector('strong').textContent = `Настроение: ${newMood || 'Нет данных'}`;
    recordItem.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Эмоции:</strong> ${newEmotions || 'Нет данных'}`;
    recordItem.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Полезные привычки:</strong> ${newGoodHabits || 'Нет данных'}`;
    recordItem.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Вредные привычки:</strong> ${newBadHabits || 'Нет данных'}`;
    recordItem.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Заметка:</strong> ${newNote || 'Нет данных'}`;

    // Обновляем атрибуты data-* для новых данных
    recordItem.dataset.mood = newMood;
    recordItem.dataset.emotions = newEmotions;
    recordItem.dataset.goodHabits = newGoodHabits;
    recordItem.dataset.badHabits = newBadHabits;
    recordItem.dataset.note = newNote;
  }

  modal.remove();
}

// Добавление цели
const addGoalBtn = document.querySelector('.add-goal-btn');
const goalsList = document.querySelector('.goals-list');

addGoalBtn.addEventListener('click', () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Добавить цель</h3>
      <input type="text" placeholder="Введите цель" />
      <button onclick="addGoal(this)">Готово</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.style.display = 'block';
});

// Функция для добавления цели
function addGoal(button) {
  const modal = button.closest('.modal');
  const goalInput = modal.querySelector('input');
  const goalText = goalInput.value.trim();

  if (goalText) {
    const goalItem = document.createElement('div');
    goalItem.classList.add('goal-item');
    goalItem.innerHTML = `
      <span>${goalText}</span>
      <button class="delete-goal-btn">Удалить</button>
      <button class="mark-complete-btn">Отметить как выполнено</button>
    `;

    // Удаление цели
    goalItem.querySelector('.delete-goal-btn').addEventListener('click', () => {
      goalItem.remove();
    });

    // Отметить как выполненное
    goalItem.querySelector('.mark-complete-btn').addEventListener('click', () => {
      goalItem.querySelector('.mark-complete-btn').remove();
      goalItem.querySelector('.delete-goal-btn').remove();
      goalItem.innerHTML = `
      <span>${goalItem.querySelector('span').textContent}</span>
      <button class="complete-btn">Выполнено</button>
    `
    });

    goalsList.prepend(goalItem);
  }

  modal.remove();
}

// Добавление фото
const addPhotoBtn = document.querySelector('.add-photo-btn');
const photoList = document.querySelector('.cat-gallery');

addPhotoBtn.addEventListener('click', () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Добавить фото</h3>
      <input class="url" type="url" placeholder="Вставьте ссылку на фото" />
      <button onclick="addPhoto(this)">Готово</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.style.display = 'block';
});

// Функция для добавления фото
function addPhoto(button) {
  const modal = button.closest('.modal');
  const urlInput = modal.querySelector('.url');

  const url = urlInput.value.trim();

  if (url) {
    const photoItem = document.createElement('div');
    const photoId = Date.now(); // Генерация уникального ID
    photoItem.classList.add('photo-item');
    photoItem.dataset.id = photoId; // Присваиваем ID записи
    photoItem.innerHTML = `
      <img src="${url}" alt="Ваше фото">
      <button class="delete-photo-btn">X</button>
    `;
    // Добавляем обработчик события для удаления фото
    photoItem.querySelector('.delete-photo-btn').addEventListener('click', () => {
      photoItem.remove();
    });

    // Сохраняем текущие данные записи в атрибутах data-*
    photoItem.dataset.url = url;

    photoList.prepend(photoItem);
  }

  modal.remove();
}

// Поп-ап для изображений
document.addEventListener('click', (event) => {
  const target = event.target;

  // Если кликнули по изображению
  if (target.tagName === 'IMG' && target.closest('.cat-gallery')) {
    openPhotoModal(target.src);
  }

  // Если кликнули по модальному окну или изображению внутри него
  if (target.classList.contains('photo-modal') || target.closest('.photo-modal img')) {
    closePhotoModal();
  }
});

// Функция для открытия поп-апа
function openPhotoModal(imageSrc) {
  const modal = document.createElement('div');
  modal.classList.add('photo-modal');
  modal.innerHTML = `
    <img src="${imageSrc}" alt="Просмотр фото">
  `;
  document.body.appendChild(modal);

  modal.style.display = 'flex'; // Показываем модальное окно
}

// Функция для закрытия поп-апа
function closePhotoModal() {
  const modal = document.querySelector('.photo-modal');
  if (modal) {
    modal.remove(); // Удаляем модальное окно
  }
}

// Закрытие модального окна при клике вне его
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.remove();
  }
});
