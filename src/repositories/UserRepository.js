import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import User from '../models/User';
import tokenOptions from '../utils/TokenOptions';

const UserRepository = {
  add: async ({ name, credential, password }) => {
    try {
      const userFound = await User.findOne({
        where: {
          credential,
        },
      });

      if (userFound) {
        return {
          msg: 'Credential already registered in the system',
          status: 406,
        };
      }

      const saltRound = 10;

      password = bcrypt.hashSync(password, saltRound);

      const info = {
        id: uuidv4(),
        name,
        credential,
        password,
      };

      const user = await User.create(info);

      user.password = undefined;

      return {
        user,
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
  login: async ({ credential, password }) => {
    try {
      const user = await User.findOne({
        where: {
          credential,
        },
      });

      if (!user) {
        return {
          msg: 'User not found',
          status: 404,
        };
      }

      const correctPass = bcrypt.compareSync(password, user.password);

      if (!correctPass) {
        return {
          msg: 'invalid password',
          status: 401,
        };
      }

      const token = tokenOptions.gererateToken(
        { email: user.email, name: user.name, credential: user.credential },
        '5h'
      );

      user.password = undefined;

      return {
        logged: true,
        user,
        jwt: token,
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
      const users = await User.findAll();

      if (users.length < 1) {
        return {
          msg: 'No user has been registered',
          status: 404,
        };
      }

      return {
        users,
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
      const user = await User.findOne({
        where: {
          name,
        },
      });

      if (!user) {
        return {
          msg: 'User not found',
          status: 404,
        };
      }

      user.password = undefined;

      return {
        user,
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
      const user = await User.findOne({
        where: {
          credential,
        },
      });

      if (!user) {
        return {
          msg: 'User not found',
          status: 404,
        };
      }

      user.password = undefined;

      return {
        user,
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
      const user = await User.findOne({
        where: {
          credential,
        },
      });

      if (!user) {
        return {
          msg: 'User not found',
          status: 404,
        };
      }

      const correctPass = bcrypt.compareSync(
        params.auth.password,
        user.password
      );

      if (!correctPass) {
        return {
          msg: 'invalid password',
          status: 401,
        };
      }

      const userUpdated = await User.update(
        {
          name: params.name,
          credential: params.credential,
          password: params.password,
        },
        {
          where: {
            credential,
          },
        }
      );

      if (userUpdated[0] === 0) {
        return {
          msg: 'User not found',
          status: 406,
        };
      }

      return {
        msg: 'User updated',
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
  drop: async ({ password }, credential) => {
    try {
      const user = await User.findOne({
        where: {
          credential,
        },
      });

      if (!user) {
        return {
          msg: 'User not found',
          status: 404,
        };
      }

      const correctPass = bcrypt.compareSync(password, user.password);

      if (!correctPass) {
        return {
          msg: 'invalid password',
          status: 401,
        };
      }

      const userDel = await User.destroy({
        where: {
          credential,
        },
      });

      if (userDel === 0) {
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

export default UserRepository;
