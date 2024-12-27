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
    DECLARE item_id INT;
    DECLARE quantity INT;
    DECLARE sub_total FLOAT;
    DECLARE total FLOAT DEFAULT 0;
    DECLARE delivery_total FLOAT DEFAULT 0;
    DECLARE done INT DEFAULT 0;
    DECLARE item_cursor CURSOR FOR 
        SELECT item_id FROM json_table(p_item_ids, '$[*]' COLUMNS (item_id INT PATH '$')) AS jt;
    DECLARE qty_cursor CURSOR FOR 
        SELECT quantity FROM json_table(p_quantities, '$[*]' COLUMNS (quantity INT PATH '$')) AS jt;
    
    -- Check if the user exists
    IF NOT EXISTS (SELECT 1 FROM user WHERE user_id = p_user_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not found';
    END IF;

    -- Create the cart for the user
    INSERT INTO cart (user_id) VALUES (p_user_id);
    SET cart_id = LAST_INSERT_ID();

    -- Add items to the cart and calculate subtotal
    OPEN item_cursor;
    OPEN qty_cursor;

    read_loop: LOOP
        FETCH item_cursor INTO item_id;
        FETCH qty_cursor INTO quantity;
        
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Calculate the subtotal for each item
        SELECT price INTO sub_total FROM item WHERE item_id = item_id;
        SET sub_total = sub_total * quantity;

        -- Add item to cart_items table
        INSERT INTO cart_items (cart_id, item_id, quantity, sub_total)
        VALUES (cart_id, item_id, quantity, sub_total);

        -- Add the item's subtotal to the cart's total
        SET total = total + sub_total;
    END LOOP;

    CLOSE item_cursor;
    CLOSE qty_cursor;

    -- Update the cart total
    UPDATE cart SET total = total WHERE cart_id = cart_id;

    -- Add delivery information
    SET delivery_total = total + 5.00;  -- Example delivery fee of 5.00 (adjust as necessary)

    INSERT INTO delivery (cart_id, user_id, street, city, state, zip, phone_num, tot_with_delivery)
    VALUES (cart_id, p_user_id, p_street, p_city, p_state, p_zip, p_phone_num, delivery_total);

END $$

DELIMITER ;
