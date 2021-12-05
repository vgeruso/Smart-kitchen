import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';

const UserRepository = {
  add: async ({ name, credential, password }) => {
    try {
      return {
        user: { name, credential, password },
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
      return {
        users: [],
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
      return {
        user: name,
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
  GetByCredential: async (credential) => {
    try {
      return {
        user: credential,
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
  update: async (params, credential) => {
    try {
      return {
        user: { params, credential },
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
  drop: async (credential) => {
    try {
      return {
        user: credential,
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

export default UserRepository;
