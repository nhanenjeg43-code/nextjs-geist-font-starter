<?php
// ==============================
// PayFast Configuration
// ==============================

// Environment settings
define('PAYFAST_SANDBOX', true); // Set to false for live mode
define('PAYFAST_DEBUG', true); // Log all transactions

// PayFast credentials
define('PAYFAST_MERCHANT_ID', '10000100'); // Sandbox: replace with live
define('PAYFAST_MERCHANT_KEY', '46f0cd694581a'); // Sandbox: replace with live
define('PAYFAST_PASSPHRASE', 'your_passphrase_here'); // Set in PayFast dashboard

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

// URLs
define('SITE_URL', 'https://yourwebsite.com');
define('RETURN_URL', SITE_URL . '/payfast/success.php');
define('CANCEL_URL', SITE_URL . '/payfast/cancel.php');
define('NOTIFY_URL', SITE_URL . '/payfast/ipn.php');

// PayFast endpoints
define('PAYFAST_URL', PAYFAST_SANDBOX 
    ? 'https://sandbox.payfast.co.za/eng/process' 
    : 'https://www.payfast.co.za/eng/process');

// Valid PayFast IP ranges for IPN validation
$payfast_ips = [
    '197.97.170.0/24',
    '197.97.173.0/24',
    '197.97.174.0/24',
    '197.97.175.0/24',
    '197.97.176.0/24',
    '197.97.177.0/24',
    '197.97.178.0/24',
    '197.97.179.0/24',
    '197.97.180.0/24',
    '197.97.181.0/24',
    '197.97.182.0/24',
    '197.97.183.0/24',
    '197.97.184.0/24',
    '197.97.185.0/24',
    '197.97.186.0/24',
    '197.97.187.0/24',
    '197.97.188.0/24',
    '197.97.189.0/24',
    '197.97.190.0/24',
    '197.97.191.0/24'
];
?>
