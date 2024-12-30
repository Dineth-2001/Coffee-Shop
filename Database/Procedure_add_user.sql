USE coffee_shop;
DROP PROCEDURE IF EXISTS add_user;

DELIMITER $$

CREATE PROCEDURE add_user(
    IN p_user_name VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100)
)
BEGIN
    -- Check if the email already exists
    IF EXISTS (SELECT 1 FROM user WHERE email = p_email) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email already exists. Please use a different email.';
    ELSE
        -- Insert the new user into the user table
        INSERT INTO user (user_name, password, email)
        VALUES (p_user_name, p_password, p_email);
    END IF;
END $$

DELIMITER ;
