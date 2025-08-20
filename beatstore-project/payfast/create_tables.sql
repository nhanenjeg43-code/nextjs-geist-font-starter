-- PayFast Integration Database Schema
-- Create this in your MySQL database

CREATE DATABASE IF NOT EXISTS payfast_integration;
USE payfast_integration;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    item_name VARCHAR(255),
    amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'ZAR',
    status ENUM('pending', 'completed', 'cancelled', 'failed') DEFAULT 'pending',
    payfast_payment_id VARCHAR(50),
    payfast_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_id (order_id),
    INDEX idx_status (status),
    INDEX idx_email (customer_email)
);

-- Payment logs table for debugging
CREATE TABLE IF NOT EXISTS payment_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50),
    payfast_payment_id VARCHAR(50),
    event_type VARCHAR(50),
    raw_data TEXT,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order_id (order_id),
    INDEX idx_payment_id (payfast_payment_id)
);

-- Sample data for testing
INSERT INTO orders (order_id, customer_name, customer_email, item_name, amount) VALUES
('TEST001', 'John Doe', 'john@example.com', 'Test Beat License', 100.00);
