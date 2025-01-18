use coffee_shop;

ALTER TABLE user DROP INDEX email;
ALTER TABLE user ADD UNIQUE INDEX email (email);
