import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { Contact } from './models/contact.js';

export default function setupServer() {
  const app = express();

  app.use(pino());

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();

      res.send({
        status: 200,
        message: 'Successfully found contacts!',
        contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;

      const contact = await Contact.findById(contactId);

      if (contact === null) {
        return res
          .status(404)
          .send({ status: 404, message: 'Contact not found' });
      }

      res.send({
        status: 200,
        message: 'Successfully found contact with id {**contactId**}!',
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
