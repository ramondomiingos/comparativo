import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { generateToken, validateToken } from './src/auth';
import { faker } from '@faker-js/faker';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8001;
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bem vindo ao Banco UniPOT'} );
});

app.get('/token', async  (req: Request, res: Response) => {
  const token = await generateToken()

  res.json({ token } );
});

app.get('/extrato',async  (req: Request, res: Response) => {
 
  const statement = {
    transactions: [
    { 
      datetime:  faker.datatype.datetime(),
      place: faker.company.name(),
      price : faker.commerce.price(100, 200)
    },
    { 
      datetime:  faker.datatype.datetime(),
      place: faker.company.name(),
      price : faker.commerce.price(100, 200)
    },
    { 
      datetime:  faker.datatype.datetime(),
      place: faker.company.name(),
      price : faker.commerce.price(100, 200)
    },

  ],
  bank_balance: faker.commerce.price(100, 200, 0, '$') 
}
 const token:any = req.query['token'] || ''  ;
  try{
     await validateToken(token)
     res.json({statement} );
     return
  }catch(e){
    res.status(403).json({ message: 'token invalido '})
    return 
  }
 
});

app.listen(port, () => {
  console.log(`⚡️⚡️   [server]: Server is running at http://localhost:${port}  ⚡️ ⚡️ `);
});