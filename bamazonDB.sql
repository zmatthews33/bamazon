DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("This is Spinal Tap", "Movies", 12.99, 10),
		("Live Edge Slab Coffee Table", "Home", 700.00, 1),
		("Space Balls", "Movies", 13.04, 3),
		("Playstation 1", "Electronics", 62.35, 3),
		("Knife Set", "Kitchen", 22.00, 7),
		("Bean Bag Chair", "Home", 64.45, 3),
		("Magnavox VCR", "Electronics", 20.00, 1),
		("Espresso Machine", "Kitchen", 80.75, 12),
		("Osh Kosh Overalls", "Apparel", 29.99, 6),
		("Beastie Boys Hat", "Apparel", 22.99, 0);
