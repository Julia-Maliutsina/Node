import jsonwebtoken from 'jsonwebtoken';
import KEYS from "../config/keys.js";

const createToken = (user) => jsonwebtoken.sign({
  userId: user._id,
}, KEYS.jwt, {expiresIn: '3h'});

const createRefreshToken = (user) => jsonwebtoken.sign({
  userId: user._id,
}, KEYS.refresh, {expiresIn: '1d'});

const create = {
  token: createToken,
  refreshToken: createRefreshToken
}

export default create;