// import express from 'express';
import { initMongoConnection } from './db.js';
import { setupServer } from './server.js';

// const app = express();

const bootstrap = async () => {
  try {
    await initMongoConnection();

    // const PORT = process.env.PORT || 3000;

    setupServer();

    // app.listen(PORT, () => {
    //   console.log('Server is running on port ${PORT}')
    // });
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
