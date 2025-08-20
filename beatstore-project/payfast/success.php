<?php
require_once 'config.php';
require_once 'functions.php';

session_start();

// Get order ID from session
$order_id = $_SESSION['payfast_order_id'] ?? null;

if (!$order_id) {
    die('No order found');
}

// Get order details
$order = getOrder($order_id);

if (!$order) {
    die('Order not found');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
</head>
<body class="bg-zinc-900 text-white">
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-zinc-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <div class="mb-4">
                <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h1 class="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p class="text-gray-300">Thank you for your purchase.</p>
            </div>

            <div class="bg-zinc-700 p-4 rounded mb-4">
                <p class="text-sm text-gray-300">Order ID: <strong><?php echo $order['order_id']; ?></strong></p>
                <p class="text-sm text-gray-300">Item: <strong><?php echo htmlspecialchars($order['item_name']); ?></strong></p>
                <p class="text-sm text-gray-300">Amount: <strong>R<?php echo number_format($order['amount'], 2); ?></strong></p>
            </div>

            <a href="/" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Continue Shopping
            </a>
        </div>
    </div>
</body>
</html>
