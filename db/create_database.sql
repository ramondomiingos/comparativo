
CREATE schema IF NOT EXISTS comparativo;

use comparativo;
CREATE TABLE IF NOT EXISTS chave_valor (

                             valor varchar(255),
                             chave varchar(255),
                             expiration datetime
);