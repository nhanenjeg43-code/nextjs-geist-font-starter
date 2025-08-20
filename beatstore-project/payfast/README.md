# PayFast Integration Guide

## Overview
This is a complete PayFast payment integration for your beat selling website. It includes secure payment processing, IPN handling, and database management.

## Setup Instructions

### 1. Database Setup
1. Create a MySQL database
2. Run the SQL commands in `create_tables.sql`
3. Update database credentials in `config.php`

### 2. PayFast Account Setup
1. Create a PayFast account at https://payfast.io
2. Get your Merchant ID and Merchant Key
3. Set up your passphrase in the PayFast dashboard
4. Update these values in `config.php`

### 3. Configuration
Update `config.php` with your:
- Database credentials
- PayFast credentials
- Site URLs
- Passphrase

### 4. File Structure
```
src/payfast/
├── config.php          # Configuration settings
├── functions.php       # Core functions
├── checkout.php        # Payment checkout page
├── ipn.php            # Instant Payment Notification handler
├── success.php        # Success page
├── cancel.php         # Cancel page
├── create_tables.sql  # Database schema
└── README.md          # This file
```

## Usage

### 1. Initiate Payment
```php
// From your beat purchase page
<form action="src/payfast/checkout.php" method="post">
    <input type="hidden" name="item_name" value="Beat Name">
    <input type="hidden" name="amount" value="100.00">
    <input type="hidden" name="customer_email" value="customer@email.com">
    <input type="hidden" name="customer_name" value="Customer Name">
    <button type="submit">Purchase</button>
</form>
```

### 2. Test Mode
- Use sandbox credentials in `config.php`
- Test with PayFast's test credit card: 4000000000000002

### 3. Go Live
1. Change `PAYFAST_SANDBOX` to `false`
2. Update to live credentials
3. Test with real transactions

## Security Features
- Signature validation for all transactions
- IP address validation for IPN
- SQL injection prevention with prepared statements
- Input sanitization and validation
- Secure session management

## Testing Checklist
- [ ] Database connection works
- [ ] Payment initiation works
- [ ] IPN handler receives notifications
- [ ] Success page displays correctly
- [ ] Cancel page displays correctly
- [ ] Order status updates properly
- [ ] Email notifications work (if configured)

## Support
For issues or questions, check the PayFast documentation at https://developers.payfast.io
