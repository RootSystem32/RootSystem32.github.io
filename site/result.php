<?php
// result.php — обработка подтверждения платежа от Paypalych

// Логируем входящие данные для отладки
file_put_contents('paypalych_log.txt', date('Y-m-d H:i:s') . " - " . file_get_contents('php://input') . "\n", FILE_APPEND);

// Получаем данные
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    // Если JSON не пришёл, пробуем получить POST параметры
    $data = $_POST;
}

// Проверяем подпись (если Paypalych отправляет)
$signature = $data['signature'] ?? '';
$order_id = $data['order_id'] ?? '';
$amount = $data['amount'] ?? '';
$status = $data['status'] ?? '';

// Здесь должна быть проверка подписи и обновление статуса в БД бота
// После подтверждения платежа — активируем подписку через API бота

if ($status === 'success') {
    // Активация подписки через бота (HTTP запрос к твоему серверу)
    // Пример: file_get_contents("https://x-ui.heompvpn.pro:2096/api/activate?order_id=" . $order_id);
    
    http_response_code(200);
    echo json_encode(['status' => 'ok', 'message' => 'Payment processed']);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid payment status']);
}
?>