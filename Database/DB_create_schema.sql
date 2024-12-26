-- Create database and use it
DROP DATABASE IF EXISTS coffee_shop;
CREATE DATABASE coffee_shop;
USE coffee_shop;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  password VARCHAR(255),
  email VARCHAR(100),
  PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
  cart_id INT NOT NULL AUTO_INCREMENT,
  item_id INT,
  quantity int,
  sub_total float,
  PRIMARY KEY (cart_id),
  FOREIGN KEY (item_id) REFERENCES item(item_id) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS item;
CREATE TABLE item (
  item_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  price float,
  category VARCHAR(50),
  description varchar(255),
  PRIMARY KEY (item_id)
);

DROP TABLE IF EXISTS delivery;
CREATE TABLE delivery (
  delivery_id INT,
  cart_id INT,
  username VARCHAR(50),
  email VARCHAR(100),
  street VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  zip INT,
  phone_num INT(10),
  Total float,
  PRIMARY KEY (delivery_id),
  FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON UPDATE CASCADE
);
