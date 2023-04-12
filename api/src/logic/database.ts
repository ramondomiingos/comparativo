import { createConnection} from 'mysql';

import AppConfig from '../config/configs';

export async function makeQuery(query:string) {
   
    var con = createConnection({
        host: AppConfig.MYSQL_HOST,
        user: 'user',
        password: '123456Aa@', 
        port: 3306
      });
      return new Promise((resolve, reject) => {
        con.connect(async function(err) {
          if (err) throw err ;
           await con.query(query, async function (err, result, fields) {
            if (err) throw err;
          
            return   resolve(JSON.parse(JSON.stringify(result)) )
          });
        });
      });
       

}