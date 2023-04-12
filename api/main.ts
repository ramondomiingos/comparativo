import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import axios from 'axios';
import { createClient } from 'redis';
import AppConfig from './src/config/configs';
import { getExtrato } from './src/logic/logic';
import {  makeQuery} from './src/logic/database';
import moment from 'moment';
const  main =async () =>{

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8002;

app.use(morgan('tiny'))
app.use(bodyParser.json())



const client =createClient({
  url: 'redis://'+AppConfig.REDIS_HOST
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bem vindo a API do usuario'} );
});



app.get('/mysql/extrato',async  (req: Request, res: Response) => {
  const inicio = Date.now();
  let actions:string[] = []
  let data;

  let hour =  moment().format('YYYY-MM-DD HH:mm:ss') 
  

  const token:any = await makeQuery('SELECT comparativo.chave_valor.*  FROM comparativo.chave_valor  where  expiration > STR_TO_DATE( \'' +hour +'\'  , \'%Y-%m-%d %H:%i:%s\') ORDER BY expiration DESC LIMIT 1')
  actions.push('[MYSQL]: Get Token')
  console.log('veio do db')
  console.log(token)
  if (token?.[0]?.valor){
   
    actions.push('[MYSQL]: Has Token')
    actions.push('[AXIOS]: get extrato')
    data = await  getExtrato(token?.[0]?.valor ||  '')

   
  }else{
    actions.push('[MYSQL]: no Has Token')
    actions.push('[AXIOS]: get token api')
    await axios
      .get('http://'+ AppConfig.UNIPOT_HOST + ':8001/token',)
      .then(async function (response) {
        
        hour =  moment().add(55, 'seconds').format('YYYY-MM-DD HH:mm:ss') 
        await makeQuery( "INSERT INTO comparativo.chave_valor values ( '"+response.data.token+"','token-chave', STR_TO_DATE('"+hour+ "', '%Y-%m-%d %H:%i:%s'))")
        actions.push('[MYSQL]: insert into Token');
        actions.push('[AXIOS]: get extrato');
        data = await getExtrato(response.data.token);
      })
      .catch(function (error) {
        // handle error
        
        data = error;
      });
  }


  return res.json({
    actions, 
    performance:  (Date.now() - inicio )+ 'ms', 
    data,
  })




  
 
 
});

app.get('/redis/extrato',async  (req: Request, res: Response) => {
  const inicio = Date.now();
  let data;
  let actions:string[] = []
  const token = await client.get('token');
  actions.push('[REDIS]: Get Token')
  if (token){
   
    actions.push('[REDIS]: Has Token')
    actions.push('[AXIOS]: get extrato')
    data = await  getExtrato(token)

   
  }else{
    actions.push('[REDIS]: no Has Token')
    actions.push('[AXIOS]: get token api')
    await axios
      .get('http://'+ AppConfig.UNIPOT_HOST + ':8001/token',)
      .then(async function (response) {
        // handle success
        console.log(response);
        client.set('token',  response.data.token,{EX: 60} );
        actions.push('[REDIS]: set Token');
        actions.push('[AXIOS]: get extrato');
        data = await getExtrato(response.data.token);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        data = error;
      });
  }


  return res.json({
    actions, 
    performance:  (Date.now() - inicio )+ 'ms', 
    data,
  })
 
});

app.listen(port, () => {
  console.log(`⚡️⚡️   [server]: Server is running at http://localhost:${port}  ⚡️⚡️ `);
});

} 
main();