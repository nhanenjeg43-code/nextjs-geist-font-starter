<?php
require_once 'config.php';
require_once 'functions.php';

// Log raw POST data for debugging
$raw_data = $_POST;
logPaymentEvent(null, null, 'raw_ipn', $raw_data);

// Validate IP address
$client_ip = $_SERVER['REMOTE_ADDR'];
if (!isValidPayFastIP($client_ip)) {
    http_response_code(403);
    die('Invalid IP address');
}

// Validate POST data
if (empty($_POST)) {
    http_response_code(400);
    die('No POST data received');
}

// Validate signature
if (!validatePayFastIPN($_POST)) {
    http_response_code(400);
    die('Invalid signature');
}

// Extract data
$order_id = $_POST['m_payment_id'];
$payment_id = $_POST['pf_payment_id'];
$payment_status = $_POST['payment_status'];
$amount = $_POST['amount_gross'];
$fee = $_POST['amount_fee'] ?? 0;

// Get order details
$order = getOrder($order_id);
if (!$order) {
    http_response_code(404);
    die('Order not found');
}

// Process payment based on status
switch ($payment_status) {
    case 'COMPLETE':
        updateOrderStatus($order_id, 'completed', $payment_id);
        logPaymentEvent($order_id, $payment_id, 'payment_complete', $_POST);
        
        // Send confirmation email
        sendPaymentConfirmation($order);
        
        echo 'OK';
        break;
        
    case 'FAILED':
        updateOrderStatus($order_id, 'failed', $payment_id);
        logPaymentEvent($order_id, $payment_id, 'payment_failed', $_POST);
        
        echo 'OK';
        break;
        
    case 'CANCELLED':
        updateOrderStatus($order_id, 'cancelled', $payment_id);
        logPaymentEvent($order_id, $payment_id, 'payment_cancelled', $_POST);
        
        echo 'OK';
        break;
        
    default:
        logPaymentEvent($order_id, $payment_id, 'unknown_status', $_POST);
        echo 'OK';
}

/**
 * Send payment confirmation email
 */
function sendPaymentConfirmation($order) {
    $to = $order['customer_email'];
    $subject = 'Payment Confirmation - ' . $order['item_name'];
    
    $message = "
    <html>
    <head>
        <title>Payment Confirmation</title>
    </head>
    <body>
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase!</p>
        <p><strong>Order ID:</strong> {$order['order_id']}</p>
        <p><strong>Item:</strong> {$order['item_name']}</p>
        <p><strong>Amount:</strong> R{$order['amount']}</p>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: noreply@yourwebsite.com" . "\r\n";
    
    mail($to, $subject, $message, $headers);
}
?>
