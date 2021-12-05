import express from 'express';

import DeviceController from '../controllers/DeviceController';

const routes = express.Router();

routes.get('/', (_, res) => {
  const object = {
    msg: 'Device home',
    status: 200,
  };
  return res.status(object.status).json(object);
});

routes.post('/add', DeviceController.store);
routes.get('/list', DeviceController.index);
routes.get('/:name', DeviceController.getByName);
routes.put('/:name', DeviceController.set);
routes.delete('/:name', DeviceController.destroy);

const device = express().use('/device', routes);

export default device;
