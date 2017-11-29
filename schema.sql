DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
  	product_name VARCHAR(45),
  	department_name VARCHAR(45),
  	price DECIMAL(10,2),
  	stock_quantity INT,
  	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("IPhone X", "Electronic", 999.99, 80000), 
("McLaren P1 GTR", "Car", 2000000, 300000),
("Tesla Model 3", "Car", 35000.99, 8000), 
("Overwatch", "Video Game", 39.99, 80000),
("Game of Throne", "TV Series", 19.99, 9000),
("Monopoly", "Toys", 30.50, 35),
("Mini USB Vacuum Cleaner","Office",19.99,15),
("XBoxOneX","Electronics", 499.66,2),
("Batman: Arkham Knight","Video Games",39.99,3), 
("HTC Vive", "Electronics", 599.66, 299);



SELECT * FROM products;
