// script.js
document.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const plan = e.target.closest('.plan');
        const days = plan.dataset.days;
        const price = plan.dataset.price;
        
        // Здесь будет интеграция с Paypalych API
        // Перенаправление на страницу оплаты
        
        alert(`Оплата ${price}₽. Перенаправление на платёжный шлюз...`);
        
        // Пример редиректа на Paypalych (замени на реальный URL)
        // window.location.href = `https://paypalych.com/pay?amount=${price}&order_id=HEOMP_${Date.now()}&success_url=https://ваш-сайт/success.html&fail_url=https://ваш-сайт/fail.html`;
    });
});