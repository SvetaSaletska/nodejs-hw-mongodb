import express from 'express';
import pino from 'pino-http';
// import router from './routers/index.js';
import cors from 'cors';
import 'dotenv/config';

// export const setupServer = () => {
const app = express();

app.use(pino());

app.use(cors());

// app.use(router);

app.get('/', (req, res) => {
  console.log(undefined.unknown());
  res.send('Hello, World!');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// };
