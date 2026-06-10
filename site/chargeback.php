<?php
// chargeback.php — обработка чарджбэка

file_put_contents('chargeback_log.txt', date('Y-m-d H:i:s') . " - " . file_get_contents('php://input') . "\n", FILE_APPEND);

// Блокируем пользователя
// Здесь логика блокировки

http_response_code(200);
echo json_encode(['status' => 'ok', 'message' => 'Chargeback processed']);
?>