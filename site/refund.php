<?php
// refund.php — обработка возврата

file_put_contents('refund_log.txt', date('Y-m-d H:i:s') . " - " . file_get_contents('php://input') . "\n", FILE_APPEND);

// Отключаем подписку в боте
// Здесь логика отключения ключа

http_response_code(200);
echo json_encode(['status' => 'ok', 'message' => 'Refund processed']);
?>