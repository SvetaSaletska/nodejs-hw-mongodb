import express from 'express';
import { initMongoConnection } from './db.js';

const app = express();

async function bootstrap() {
  try {
    await initMongoConnection();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
