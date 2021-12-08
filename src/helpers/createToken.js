import jsonwebtoken from 'jsonwebtoken';

const createToken = (user) => jsonwebtoken.sign({
  userId: user._id,
}, process.env.JWT_SECRET, {expiresIn: '3h'});

const createRefreshToken = (user) => jsonwebtoken.sign({
  userId: user._id,
}, process.env.REFRESH_SECRET, {expiresIn: '1d'});

const create = {
  token: createToken,
  refreshToken: createRefreshToken
}

export default create;