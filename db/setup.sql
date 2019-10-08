DROP DATABASE IF EXISTS job_board;
CREATE DATABASE job_board;
\c job_board;
CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(64), password TEXT, name VARCHAR(42));
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
    notes TEXT,
    carrier VARCHAR(40),
    bol_number VARCHAR(20),
    pro_number VARCHAR(20)
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
    notes TEXT,
    carrier VARCHAR(40),
    bol_number VARCHAR(20),
    pro_number VARCHAR(20)
);
INSERT INTO users(username, password, name) VALUES ('admin', 'admin', 'Naftali');