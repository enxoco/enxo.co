CREATE DATABASE enxo_admin;
CREATE USER 'enxo_admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON enxo_admin.* to 'enxo_admin'@'localhost';
FLUSH PRIVILEGES;
