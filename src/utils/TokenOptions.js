import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenOptions = {
  gererateToken: (payload, expiresIn) =>
    jwt.sign(payload, process.env.JWT_KEY, { expiresIn }),
  verifyToken: (token) => jwt.verify(token, process.env.JWT_KEY),
};

export default tokenOptions;
