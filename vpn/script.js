// script.js

// Эмуляция данных пользователя (позже заменится на API)
let currentUser = {
    id: 10000,
    balance: 450,
    daysLeft: 14,
    totalSpent: 2350,
    keys: [
        { id: 10001, name: 'Устройство 1', key: 'vless://...', daysLeft: 14, price: 150 },
        { id: 10002, name: 'Устройство 2', key: 'vless://...', daysLeft: 8, price: 150 }
    ]
};

// Эмуляция расходов
let expenses = [
    { date: '01.06.2025', desc: 'Подписка 1 месяц', amount: 150 },
    { date: '15.05.2025', desc: 'Доп. устройство', amount: 100 },
    { date: '01.05.2025', desc: 'Подписка 3 месяца', amount: 350 }
];

// Функция обновления интерфейса
function updateUI() {
    // Главная страница
    document.getElementById('userId').innerText = currentUser.id;
    document.getElementById('balance').innerText = currentUser.balance + ' ₽';
    document.getElementById('daysLeft').innerText = currentUser.daysLeft;
    document.getElementById('devicesCount').innerHTML = `${currentUser.keys.length} / 5`;
    
    // Общий расход
    let total = 0;
    expenses.forEach(e => total += e.amount);
    document.getElementById('totalSpent').innerText = total + ' ₽';
    document.getElementById('totalKeysCount').innerText = currentUser.keys.length;
    
    // Детализация расходов
    const breakdownDiv = document.getElementById('expenseBreakdown');
    breakdownDiv.innerHTML = '';
    expenses.forEach(exp => {
        breakdownDiv.innerHTML += `
            <div class="stat-row">
                <span>${exp.date} — ${exp.desc}</span>
                <span>${exp.amount} ₽</span>
            </div>
        `;
    });
    
    // Список устройств
    const devicesDiv = document.getElementById('devicesList');
    devicesDiv.innerHTML = '';
    currentUser.keys.forEach(device => {
        devicesDiv.innerHTML += `
            <div class="device-card">
                <div class="device-header">
                    <strong>🔐 ${device.name}</strong>
                    <span class="price-badge">${device.price} ₽</span>
                </div>
                <div class="key-text">${device.key}</div>
                <div class="small-btns">
                    <button class="setup-btn" data-device-id="${device.id}">📖 Настроить</button>
                    <button class="copy-btn" data-key="${device.key}">📋 Копировать</button>
                </div>
            </div>
        `;
    });
    
    // Добавляем обработчики для кнопок копирования
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const key = btn.getAttribute('data-key');
            navigator.clipboard.writeText(key);
            alert('✅ Ключ скопирован!');
        });
    });
    
    // Добавляем обработчики для кнопок настройки
    document.querySelectorAll('.setup-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const deviceId = btn.getAttribute('data-device-id');
            showSetupModal(deviceId);
        });
    });
}

// Модальное окно с инструкцией
function showSetupModal(deviceId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h3 style="margin-bottom: 12px;">📱 Настройка устройства</h3>
        <p style="margin-bottom: 12px;">Выберите вашу платформу:</p>
        <div class="small-btns" style="flex-wrap: wrap;">
            <button class="setup-platform" data-platform="ios">🍏 iOS</button>
            <button class="setup-platform" data-platform="android">🤖 Android</button>
            <button class="setup-platform" data-platform="windows">💻 Windows</button>
            <button class="setup-platform" data-platform="linux">🐧 Linux</button>
            <button class="setup-platform" data-platform="mac">🍎 Mac</button>
        </div>
        <div id="platformInstructions" style="margin-top: 16px; font-size: 0.8rem;"></div>
    `;
    
    modal.classList.remove('hidden');
    
    document.querySelectorAll('.setup-platform').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = btn.getAttribute('data-platform');
            const instrDiv = document.getElementById('platformInstructions');
            const instructions = {
                ios: '📱 iOS: Скачайте Happ из App Store → скопируйте ключ → нажмите «+» → «Из буфера обмена» → сохраните → подключитесь.',
                android: '🤖 Android: Скачайте Happ или v2rayNG → добавьте профиль → вставьте ключ → сохраните → подключитесь.',
                windows: '💻 Windows: Скачайте v2rayN → нажмите «Серверы» → «Добавить вручную» → вставьте ключ → сохраните.',
                linux: '🐧 Linux: Используйте Nekoray или Qv2ray → импортируйте конфигурацию по ссылке.',
                mac: '🍎 Mac: Используйте V2RayX или Nekoray → вставьте ключ → сохраните.'
            };
            instrDiv.innerHTML = `<div style="background:#0f111a; padding:12px; border-radius:20px;">${instructions[platform]}</div>`;
        });
    });
}

// Навигация между страницами
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    document.getElementById(pageId).classList.add('active-page');
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });
}

// Обработчики кнопок
document.getElementById('topUpBtn').addEventListener('click', () => {
    alert('💳 Пополнение баланса будет доступно после интеграции Paypear API');
});
document.getElementById('supportBtn').addEventListener('click', () => {
    window.location.href = 'https://t.me/dubikvpn_support';
});
document.getElementById('freeProxyBtn').addEventListener('click', () => {
    alert('🆓 Бесплатный прокси для Telegram: t.me/socks?start=heomp');
});
document.getElementById('newsBtn').addEventListener('click', () => {
    alert('📢 Новости сервиса: скоро добавим поддержку ML-KEM и постквантовое шифрование!');
});
document.getElementById('addDeviceBtn').addEventListener('click', () => {
    alert('➕ Добавление нового устройства (100 ₽). Оплата через Paypear — скоро.');
});

// Выбор тарифа (оплата)
document.querySelectorAll('.pricing-item').forEach(item => {
    item.addEventListener('click', () => {
        const days = item.getAttribute('data-days');
        const price = item.getAttribute('data-price');
        alert(`💎 Выбран тариф на ${days} дней за ${price} ₽. После оплаты ключ придёт в бот.`);
    });
});

// Навигация
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const pageId = btn.getAttribute('data-page');
        navigateTo(pageId);
    });
});

// Закрытие модалки
document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) modal.classList.add('hidden');
});

// Инициализация
updateUI();
navigateTo('mainPage');

// Эмуляция Telegram WebApp (если запущено внутри мини-приложения)
if (window.Telegram?.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
}