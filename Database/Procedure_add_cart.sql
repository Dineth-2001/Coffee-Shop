USE coffee_shop;
DROP PROCEDURE IF EXISTS add_cart;

DELIMITER $$

CREATE PROCEDURE add_cart(
    IN p_user_id INT,
    IN p_item_ids TEXT,  -- A comma-separated list of item IDs
    IN p_quantities TEXT,  -- A comma-separated list of item quantities
    IN p_street VARCHAR(100),
    IN p_city VARCHAR(100),
    IN p_state VARCHAR(100),
    IN p_zip INT,
    IN p_phone_num BIGINT
)
BEGIN
    DECLARE cart_id INT;
    DECLARE p_item_id INT;
    DECLARE quantity INT;
    DECLARE sub_total FLOAT;
    DECLARE total FLOAT DEFAULT 0;
    DECLARE delivery_total FLOAT DEFAULT 0;
    DECLARE i INT DEFAULT 1;
    DECLARE num_items INT;

    -- Check if the user exists
    IF NOT EXISTS (SELECT 1 FROM user WHERE user_id = p_user_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not found';
    END IF;

    -- Create the cart for the user
    INSERT INTO cart (user_id) VALUES (p_user_id);
    SET cart_id = LAST_INSERT_ID();

    -- Count the number of items 
    SET num_items = LENGTH(p_item_ids) - LENGTH(REPLACE(p_item_ids, ',', '')) + 1;

    -- Loop through each item_id and quantity
    WHILE i <= num_items DO
        -- Extract the item_id and quantity from the strings
        SET p_item_id = CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(p_item_ids, ',', i), ',', -1) AS UNSIGNED);
        SET quantity = CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(p_quantities, ',', i), ',', -1) AS UNSIGNED);

        -- Calculate the subtotal for each item
        SELECT price INTO sub_total 
        FROM item 
        WHERE item_id = p_item_id 
        LIMIT 1;
        SET sub_total = sub_total * quantity;

        -- Add item to cart_items table
        INSERT INTO cart_items (cart_id, item_id, quantity, sub_total)
        VALUES (cart_id, p_item_id, quantity, sub_total);

        -- Add the item's subtotal to the cart's total
        SET total = total + sub_total;

        SET i = i + 1;
    END WHILE;

    -- Update the cart total
    UPDATE cart SET total = total WHERE cart_id = cart_id;

    -- Add delivery information
    SET delivery_total = total + 2.00;

    INSERT INTO delivery (cart_id, user_id, street, city, state, zip, phone_num, tot_with_delivery)
    VALUES (cart_id, p_user_id, p_street, p_city, p_state, p_zip, p_phone_num, delivery_total);

END $$

DELIMITER ;




-- USE coffee_shop;
-- DROP PROCEDURE IF EXISTS add_cart;

-- DELIMITER $$

-- CREATE PROCEDURE add_cart(
--     IN p_user_id INT,
--     IN p_item_ids TEXT,  -- A comma-separated list of item IDs
--     IN p_quantities TEXT,  -- A comma-separated list of item quantities
--     IN p_street VARCHAR(100),
--     IN p_city VARCHAR(100),
--     IN p_state VARCHAR(100),
--     IN p_zip INT,
--     IN p_phone_num BIGINT
-- )
-- BEGIN
--     DECLARE cart_id INT;
--     DECLARE item_id INT;
--     DECLARE quantity INT;
--     DECLARE sub_total FLOAT;
--     DECLARE total FLOAT DEFAULT 0;
--     DECLARE delivery_total FLOAT DEFAULT 0;
--     DECLARE done INT DEFAULT 0;
--     DECLARE i INT DEFAULT 1;
--     DECLARE num_items INT;

--     -- Check if the user exists
--     IF NOT EXISTS (SELECT 1 FROM user WHERE user_id = p_user_id) THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not found';
--     END IF;

--     -- Create the cart for the user
--     INSERT INTO cart (user_id) VALUES (p_user_id);
--     SET cart_id = LAST_INSERT_ID();

--     -- Count the number of items (assuming item_ids and quantities have the same length)
--     SET num_items = LENGTH(p_item_ids) - LENGTH(REPLACE(p_item_ids, ',', '')) + 1;

--     -- Loop through each item_id and quantity
--     WHILE i <= num_items DO
--         -- Extract the item_id and quantity from the strings
--         SET item_id = CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(p_item_ids, ',', i), ',', -1) AS UNSIGNED);
--         SET quantity = CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(p_quantities, ',', i), ',', -1) AS UNSIGNED);

--         -- Calculate the subtotal for each item
--         SELECT price INTO sub_total FROM item WHERE item_id = item_id limit 1;
--         SET sub_total = sub_total * quantity;

--         -- Add item to cart_items table
--         INSERT INTO cart_items (cart_id, item_id, quantity, sub_total)
--         VALUES (cart_id, item_id, quantity, sub_total);

--         -- Add the item's subtotal to the cart's total
--         SET total = total + sub_total;

--         SET i = i + 1;
--     END WHILE;

--     -- Update the cart total
--     UPDATE cart SET total = total WHERE cart_id = cart_id;

--     -- Add delivery information
--     SET delivery_total = total + 2.00;  

--     INSERT INTO delivery (cart_id, user_id, street, city, state, zip, phone_num, tot_with_delivery)
--     VALUES (cart_id, p_user_id, p_street, p_city, p_state, p_zip, p_phone_num, delivery_total);

-- END $$

-- DELIMITER ;
