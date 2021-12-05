import express from 'express';

import home from './home';
import device from './device';
import user from './user';

const routes = express().use('/', [home, device, user]);

export default routes;
