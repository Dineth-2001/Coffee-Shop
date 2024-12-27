USE coffee_shop;
DROP PROCEDURE IF EXISTS get_user_details;

DELIMITER $$

CREATE PROCEDURE get_user_details(IN in_user_id INT)
BEGIN
    IF in_user_id IS NOT NULL THEN
        -- Fetch details for a specific user
        SELECT user_id, user_name, email 
        FROM user 
        WHERE user_id = in_user_id;
    ELSE
        -- Fetch details for all users
        SELECT user_id, user_name, email 
        FROM user;
    END IF;
END $$

DELIMITER ;
