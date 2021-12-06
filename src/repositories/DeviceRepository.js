import { v4 as uuidv4 } from 'uuid';

import Device from '../models/Device';

const DeviceRepository = {
  add: async ({ name, data }) => {
    try {
      const deviceFound = await Device.findOne({
        where: {
          name,
        },
      });

      if (deviceFound) {
        return {
          msg: 'There is already a device with this name',
          status: 406,
        };
      }

      const info = {
        id: uuidv4(),
        name,
        data,
      };

      const device = await Device.create(info);

      return {
        device,
        status: 200,
      };
    } catch (err) {
      console.log(err);

      return {
        msg: 'An unexpected error has occurred',
        status: 500,
      };
    }
  },
  ListAll: async () => {
    try {
      const devices = await Device.findAll();

      if (devices.length < 1) {
        return {
          msg: 'No device has been registered',
          status: 404,
        };
      }

      return {
        devices,
        status: 200,
      };
    } catch (err) {
      console.log(err);

      return {
        msg: 'An unexpected error has occurred',
        status: 500,
      };
    }
  },
  GetByName: async (name) => {
    try {
      const device = await Device.findOne({
        where: {
          name,
        },
      });

      if (!device) {
        return {
          msg: 'device not found',
          status: 406,
        };
      }

      return {
        device,
        status: 200,
      };
    } catch (err) {
      console.log(err);

      return {
        msg: 'An unexpected error has occurred',
        status: 500,
      };
    }
  },
  update: async (params, name) => {
    try {
      const device = await Device.update(
        {
          name: params.name,
          data: params.data,
        },
        {
          where: {
            name,
          },
        }
      );

      if (device[0] === 1) {
        return {
          msg: 'Device updated',
          status: 200,
        };
      }

      return {
        msg: 'device not found',
        status: 406,
      };
    } catch (err) {
      console.log(err);

      return {
        msg: 'An unexpected error has occurred',
        status: 500,
      };
    }
  },
  drop: async (name) => {
    try {
      const device = await Device.destroy({
        where: {
          name,
        },
      });

      if (device === 0) {
        return {
          msg: 'device not found',
          status: 406,
        };
      }

      return {
        msg: 'Device destroyed',
        status: 200,
      };
    } catch (err) {
      console.log(err);

      return {
        msg: 'An unexpected error has occurred',
        status: 500,
      };
    }
  },
};

export default DeviceRepository;
