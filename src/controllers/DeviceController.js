import DeviceRepository from '../repositories/DeviceRepository';

const DeviceController = {
  store: async (req, res) => {
    const resp = await DeviceRepository.add(req.body);

    return res.status(resp.status).json(resp);
  },
  index: async (_, res) => {
    const list = await DeviceRepository.ListAll();

    return res.status(list.status).json(list);
  },
  getByName: async (req, res) => {
    const { name } = req.params;

    const resp = await DeviceRepository.GetByName(name);

    return res.status(resp.status).json(resp);
  },
  set: async (req, res) => {
    const { name } = req.params;

    const resp = await DeviceRepository.update(req.body, name);

    return res.status(resp.status).json(resp);
  },
  destroy: async (req, res) => {
    const { name } = req.params;

    const resp = await DeviceRepository.drop(name);

    return res.status(resp.status).json(resp);
  },
};

export default DeviceController;
