
CREATE schema IF NOT EXISTS comparativo;
ALTER USER 'techteam'@'%' IDENTIFIED WITH mysql_native_password BY '123456Aa@';
use comparativo;
CREATE TABLE IF NOT EXISTS chave_valor (

                             valor varchar(255),
                             chave varchar(255),
                             expiration datetime
);