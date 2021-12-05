import express from 'express';
import dotenv from 'dotenv';

import routes from './routes';
import connect from './database/connection';

dotenv.config();

const app = express().use(express.json());
app.use('/api', routes);

connect();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server on in http://localhost:${PORT}/api/`); // eslint-disable-line
});
