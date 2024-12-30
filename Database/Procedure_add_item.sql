USE coffee_shop;
DROP PROCEDURE IF EXISTS add_item;

DELIMITER $$

CREATE PROCEDURE add_item(
    IN p_name VARCHAR(50),
    IN p_price DECIMAL(10,2),
    IN p_category VARCHAR(50),
    IN p_description VARCHAR(255)
)
BEGIN
    -- Insert the new item into the item table
    INSERT INTO item (name, price, category, description)
    VALUES (p_name, p_price, p_category, p_description);
END $$

DELIMITER ;
