import UserRepository from '../repositories/UserRepository';

const UserController = {
  store: async (req, res) => {
    const resp = await UserRepository.add(req.body);

    return res.status(resp.status).json(resp);
  },
  auth: async (req, res) => {
    const auth = await UserRepository.login(req.body);

    return res.status(auth.status).json(auth);
  },
  index: async (_, res) => {
    const list = await UserRepository.ListAll();

    return res.status(list.status).json(list);
  },
  getByName: async (req, res) => {
    const { name } = req.params;

    const resp = await UserRepository.GetByName(name);

    return res.status(resp.status).json(resp);
  },
  getByCredential: async (req, res) => {
    const { credential } = req.params;

    const resp = await UserRepository.GetByCredential(credential);

    return res.status(resp.status).json(resp);
  },
  set: async (req, res) => {
    const { credential } = req.params;

    const resp = await UserRepository.update(req.body, credential);

    return res.status(resp.status).json(resp);
  },
  destroy: async (req, res) => {
    const { credential } = req.params;

    const resp = await UserRepository.drop(req.body, credential);

    return res.status(resp.status).json(resp);
  },
};

export default UserController;
