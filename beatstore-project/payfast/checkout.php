<?php
require_once 'config.php';
require_once 'functions.php';

// Start session for order tracking
session_start();

// Get order details from cart/session
$order_id = generateOrderId();
$item_name = $_POST['item_name'] ?? 'Beat License';
$amount = $_POST['amount'] ?? 100.00;
$customer_email = $_POST['customer_email'] ?? '';
$customer_name = $_POST['customer_name'] ?? '';

// Validate amount
if (!is_numeric($amount) || $amount <= 0) {
    die('Invalid amount');
}

// Create order in database
createOrder($order_id, $customer_name, $customer_email, $item_name, $amount);

// Build PayFast data
$payfast_data = [
    'merchant_id' => PAYFAST_MERCHANT_ID,
    'merchant_key' => PAYFAST_MERCHANT_KEY,
    'return_url' => RETURN_URL,
    'cancel_url' => CANCEL_URL,
    'notify_url' => NOTIFY_URL,
    'amount' => number_format($amount, 2, '.', ''),
    'item_name' => $item_name,
    'item_description' => $item_name,
    'm_payment_id' => $order_id,
    'email_address' => $customer_email,
    'name_first' => explode(' ', $customer_name)[0] ?? '',
    'name_last' => explode(' ', $customer_name)[1] ?? '',
];

// Generate signature
$signature = generateSignature($payfast_data);
$payfast_data['signature'] = $signature;

// Store order ID in session for tracking
$_SESSION['payfast_order_id'] = $order_id;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PayFast Checkout</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
</head>
<body class="bg-zinc-900 text-white">
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-zinc-800 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h1 class="text-2xl font-bold mb-4">PayFast Checkout</h1>
            
            <div class="mb-4">
                <p class="text-gray-300">Order: <strong><?php echo htmlspecialchars($item_name); ?></strong></p>
                <p class="text-gray-300">Amount: <strong>R<?php echo number_format($amount, 2); ?></strong></p>
                <p class="text-gray-300">Order ID: <strong><?php echo $order_id; ?></strong></p>
            </div>

            <form action="<?php echo PAYFAST_URL; ?>" method="post" class="space-y-4">
                <?php foreach ($payfast_data as $key => $value): ?>
                    <input type="hidden" name="<?php echo $key; ?>" value="<?php echo htmlspecialchars($value); ?>">
                <?php endforeach; ?>
                
                <button type="submit" 
                        class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300">
                    Proceed to PayFast
                </button>
            </form>
        </div>
    </div>
</body>
</html>
