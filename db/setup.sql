DROP DATABASE IF EXISTS job_board;
CREATE DATABASE job_board;
\c job_board;
CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(64), password TEXT, name VARCHAR(42), admin BOOL);
CREATE TABLE booster_jobs(
    id SERIAL PRIMARY KEY,
    job_order_number VARCHAR(20), 
    date_created DATE, 
    description TEXT,
    requested_by VARCHAR(60),
    job_address VARCHAR(100),
    stage INT,
    pump_po VARCHAR(20),
    pump_eta DATE,
    pump_received BOOL,
    updated_by VARCHAR(50),
    last_updated DATE,
    controller_po VARCHAR(60),
    controller_eta DATE,
    controller_received BOOL,
    due_date DATE,
    completed BOOL,
    shipdate_packlist VARCHAR(12),
    deposit_amount VARCHAR(15),
    notes TEXT,
    carrier VARCHAR(40),
    bol_number VARCHAR(20),
    pro_number VARCHAR(20),
    invoice_number VARCHAR(15)
);
CREATE TABLE sewage_jobs(
    id SERIAL PRIMARY KEY,
    job_order_number VARCHAR(20), 
    date_created DATE, 
    description TEXT,
    requested_by VARCHAR(60),
    job_address VARCHAR(100),
    stage INT,
    pump_po VARCHAR(20),
    pump_eta DATE,
    pump_received BOOL,
    updated_by VARCHAR(50),
    last_updated DATE,
    controller_po VARCHAR(60),
    controller_eta DATE,
    controller_received BOOL,
    basin_cover VARCHAR(60),
    basin_cover_eta DATE,
    basin_cover_received BOOL,
    due_date DATE,
    completed BOOL,
    shipdate_packlist VARCHAR(12),
    deposit_amount VARCHAR(15),
    notes TEXT,
    carrier VARCHAR(40),
    bol_number VARCHAR(20),
    pro_number VARCHAR(20),
    invoice_number VARCHAR(15)
);
CREATE TABLE fire_jobs(
    id SERIAL PRIMARY KEY,
    job_order_number VARCHAR(20), 
    date_created DATE, 
    description TEXT,
    requested_by VARCHAR(60),
    job_address VARCHAR(100),
    stage INT,
    pump_po VARCHAR(20),
    pump_eta DATE,
    pump_erp VARCHAR(15),
    pump_received BOOL,
    updated_by VARCHAR(50),
    last_updated DATE,
    due_date DATE,
    completed BOOL,
    shipdate_packlist VARCHAR(12),
    deposit_amount VARCHAR(15),
    notes TEXT,
    carrier VARCHAR(40),
    bol_number VARCHAR(20),
    pro_number VARCHAR(20),
    invoice_number VARCHAR(15)
);
CREATE TABLE tankfill_jobs(
    id SERIAL PRIMARY KEY,
    job_order_number VARCHAR(20), 
    date_created DATE, 
    description TEXT,
    requested_by VARCHAR(60),
    job_address VARCHAR(100),
    stage INT,
    pump_po VARCHAR(20),
    pump_eta DATE,
    pump_received BOOL,
    updated_by VARCHAR(50),
    last_updated DATE,
    controller_po VARCHAR(60),
    controller_eta DATE,
    controller_received BOOL,
    due_date DATE,
    completed BOOL,
    shipdate_packlist VARCHAR(12),
    deposit_amount VARCHAR(15),
    notes TEXT,
    carrier VARCHAR(40),
    bol_number VARCHAR(20),
    pro_number VARCHAR(20),
    invoice_number VARCHAR(15)
);
INSERT INTO users(username, password, name, admin) VALUES ('admin', 'admin', 'Naftali', true);