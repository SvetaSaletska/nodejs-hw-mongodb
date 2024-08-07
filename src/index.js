import express from 'express';
import { initMongoConnection } from './db.js';

const app = express();

async function bootstrap() {
  try {
    await initMongoConnection();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log('Server is running on port ${PORT}');
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
