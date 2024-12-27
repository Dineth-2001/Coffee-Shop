DROP DATABASE IF EXISTS coffee_shop;
CREATE DATABASE coffee_shop;
USE coffee_shop;

-- User Table
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id INT AUTO_INCREMENT,
  user_name VARCHAR(50),
  password VARCHAR(255),
  email VARCHAR(100),
  PRIMARY KEY (user_id)
);

-- Item Table
DROP TABLE IF EXISTS item;
CREATE TABLE item (
  item_id INT AUTO_INCREMENT,
  name VARCHAR(50),
  price FLOAT,
  category VARCHAR(50),
  description VARCHAR(255),
  PRIMARY KEY (item_id)
);

-- Cart Table
DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
  cart_id INT AUTO_INCREMENT,
  user_id INT,  
  total FLOAT DEFAULT 0,
  PRIMARY KEY (cart_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Cart_Items Table
DROP TABLE IF EXISTS cart_items;
CREATE TABLE cart_items (
  cart_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  sub_total FLOAT NOT NULL,
  PRIMARY KEY (cart_id, item_id),
  FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES item(item_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Delivery Table
DROP TABLE IF EXISTS delivery;
CREATE TABLE delivery (
  delivery_id INT AUTO_INCREMENT,
  cart_id INT NOT NULL,
  user_id INT,
  street VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  zip INT,
  phone_num BIGINT,
  tot_with_delivery FLOAT,
  PRIMARY KEY (delivery_id),
  FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (user_id) references user(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);
