import { createPool, Pool, createConnection} from 'mysql';

import AppConfig from '../config/configs';



let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export const initDatabase = () => {
  try {
    pool = createPool({

      host: AppConfig.MYSQL_HOST,
      user: 'techteam',
      password: '123456Aa@',
      database: 'comparativo', 
    });

    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};

/**
 * executes SQL queries in MySQL db 
 * 
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query 
 */
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error:any, results:any) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}



export async function makeQuery(query:string) {
    console.log(query)
    var con = createConnection({
        host: AppConfig.MYSQL_HOST,
        user: 'techteam',
        password: '123456Aa@',
       
      });
      
       return await con.connect(async function(err) {
        if (err) throw err;
         con.query(query, function (err, result, fields) {
          if (err) throw err;
          console.log(result[0]);
          return result
        });
      });
    
}