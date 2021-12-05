import { Sequelize, DataTypes } from 'sequelize';

import config from '../database/config';

const sequelize = new Sequelize(config);

const Device = sequelize.define(
  'Device',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'device' }
);

export default Device;
