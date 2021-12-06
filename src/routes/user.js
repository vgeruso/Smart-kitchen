import express from 'express';

import UserController from '../controllers/UserController';

const routes = express.Router();

routes.get('/', (_, res) => {
  const object = {
    msg: 'User home',
    status: 200,
  };

  return res.status(object.status).json(object);
});

routes.post('/add', UserController.store);
routes.post('/auth', UserController.auth);
routes.get('/list', UserController.index);
routes.get('/:name', UserController.getByName);
routes.get('/credential/:credential', UserController.getByCredential);
routes.put('/:credential', UserController.set);
routes.delete('/:credential', UserController.destroy);

const user = express().use('/user', routes);

export default user;
