<?php
require_once 'config.php';
require_once 'functions.php';

session_start();

// Get order ID from session
$order_id = $_SESSION['payfast_order_id'] ?? null;

if ($order_id) {
    // Update order status to cancelled
    updateOrderStatus($order_id, 'cancelled');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Cancelled</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
</head>
<body class="bg-zinc-900 text-white">
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-zinc-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <div class="mb-4">
                <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <h1 class="text-2xl font-bold mb-2">Payment Cancelled</h1>
                <p class="text-gray-300">Your payment was cancelled or failed.</p>
            </div>

            <a href="/" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Try Again
            </a>
        </div>
    </div>
</body>
</html>
