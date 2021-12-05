import { Sequelize } from 'sequelize';

import config from './config';

const connect = async () => {
  const sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
    console.log('The connection to the database was successfully established.'); // eslint-disable-line
  } catch (err) {
    console.log(`Error connecting to database: ${err}`); // eslint-disable-line
  }
};

export default connect;
