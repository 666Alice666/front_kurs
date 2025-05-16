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
      <input type="text" placeholder="Заголовок записи" />
      <textarea placeholder="Текст записи"></textarea>
      <button onclick="addRecord(this)">Готово</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.style.display = 'block';
});

// Функция для добавления записи
function addRecord(button) {
  const modal = button.closest('.modal');
  const titleInput = modal.querySelector('input');
  const textArea = modal.querySelector('textarea');

  const title = titleInput.value.trim();
  const text = textArea.value.trim();

  if (title && text) {
    const recordItem = document.createElement('div');
    const recordId = Date.now(); // Генерация уникального ID
    recordItem.classList.add('record-item');
    recordItem.dataset.id = recordId; // Присваиваем ID записи
    recordItem.innerHTML = `
      <strong>${title}</strong>
      <p>${text}</p>
      <button class="edit-record-btn">Редактировать</button>
    `;

    // Сохраняем текущие данные записи в атрибутах data-*
    recordItem.dataset.title = title;
    recordItem.dataset.text = text;

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
  const oldTitle = recordItem.dataset.title;
  const oldText = recordItem.dataset.text;
  const recordId = recordItem.dataset.id;

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Редактировать запись</h3>
      <input type="text" placeholder="Заголовок записи" value="${oldTitle}" />
      <textarea placeholder="Текст записи">${oldText}</textarea>
      <button onclick="saveEditedRecord(this, '${recordId}')">Сохранить изменения</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.style.display = 'block';
}

// Функция для сохранения изменений
function saveEditedRecord(button, recordId) {
  const modal = button.closest('.modal');
  const titleInput = modal.querySelector('input');
  const textArea = modal.querySelector('textarea');

  const newTitle = titleInput.value.trim();
  const newText = textArea.value.trim();

  if (newTitle && newText) {
    // Находим запись по её ID
    const recordItem = document.querySelector(`[data-id="${recordId}"]`);

    // Обновляем данные записи
    recordItem.querySelector('strong').textContent = newTitle;
    recordItem.querySelector('p').textContent = newText;

    // Обновляем атрибуты data-* для новых данных
    recordItem.dataset.title = newTitle;
    recordItem.dataset.text = newText;
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

// Закрытие модального окна при клике вне его
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.remove();
  }
});