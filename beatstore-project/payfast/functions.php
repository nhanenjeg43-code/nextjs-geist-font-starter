<?php
require_once 'config.php';

/**
 * Generate unique order ID
 */
function generateOrderId() {
    return 'ORD_' . date('YmdHis') . '_' . uniqid();
}

/**
 * Create order in database
 */
function createOrder($order_id, $customer_name, $customer_email, $item_name, $amount) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("
            INSERT INTO orders (order_id, customer_name, customer_email, item_name, amount) 
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([$order_id, $customer_name, $customer_email, $item_name, $amount]);
        return true;
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}

/**
 * Update order status
 */
function updateOrderStatus($order_id, $status, $payment_id = null, $token = null) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "UPDATE orders SET status = ?";
        $params = [$status];
        
        if ($payment_id) {
            $sql .= ", payfast_payment_id = ?";
            $params[] = $payment_id;
        }
        
        if ($token) {
            $sql .= ", payfast_token = ?";
            $params[] = $token;
        }
        
        $sql .= " WHERE order_id = ?";
        $params[] = $order_id;
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        return true;
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}

/**
 * Get order details
 */
function getOrder($order_id) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE order_id = ?");
        $stmt->execute([$order_id]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}

/**
 * Generate PayFast signature
 */
function generateSignature($data) {
    $pfOutput = '';
    
    // Sort data by key
    ksort($data);
    
    foreach ($data as $key => $value) {
        if ($key !== 'signature' && !empty($value)) {
            $pfOutput .= $key . '=' . urlencode(trim($value)) . '&';
        }
    }
    
    // Remove last ampersand
    $pfOutput = substr($pfOutput, 0, -1);
    
    // Add passphrase if set
    if (defined('PAYFAST_PASSPHRASE') && PAYFAST_PASSPHRASE !== '') {
        $pfOutput .= '&passphrase=' . urlencode(PAYFAST_PASSPHRASE);
    }
    
    return md5($pfOutput);
}

/**
 * Validate PayFast IPN
 */
function validatePayFastIPN($data) {
    // Check signature
    $received_signature = $data['signature'];
    unset($data['signature']);
    
    $calculated_signature = generateSignature($data);
    
    if ($received_signature !== $calculated_signature) {
        return false;
    }
    
    // Validate required fields
    $required_fields = ['m_payment_id', 'pf_payment_id', 'payment_status'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field])) {
            return false;
        }
    }
    
    return true;
}

/**
 * Log payment event
 */
function logPaymentEvent($order_id, $payment_id, $event_type, $raw_data) {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("
            INSERT INTO payment_logs (order_id, payfast_payment_id, event_type, raw_data) 
            VALUES (?, ?, ?, ?)
        ");
        
        $stmt->execute([$order_id, $payment_id, $event_type, json_encode($raw_data)]);
        return true;
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}

/**
 * Check if IP is from PayFast
 */
function isValidPayFastIP($ip) {
    global $payfast_ips;
    
    foreach ($payfast_ips as $range) {
        if (ipInRange($ip, $range)) {
            return true;
        }
    }
    
    return false;
}

/**
 * Check if IP is in range
 */
function ipInRange($ip, $range) {
    if (strpos($range, '/') === false) {
        return $ip === $range;
    }
    
    list($subnet, $bits) = explode('/', $range);
    $ip = ip2long($ip);
    $subnet = ip2long($subnet);
    $mask = -1 << (32 - $bits);
    
    return ($ip & $mask) === ($subnet & $mask);
}
?>
