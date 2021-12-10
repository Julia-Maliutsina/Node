import jsonwebtoken from 'jsonwebtoken';
import { ERROR_MESSAGES, ERROR_STATUSES } from '../constants.js';

const verifyRefreshToken = (refreshToken) => {
  return new Promise ((resolve, reject) => {
    jsonwebtoken.verify(
      refreshToken,
      process.env.JWT_SECRET,
      (error, payload) => {
        if (error) {
          const err = new Error(ERROR_MESSAGES.noToken);
          err.status = ERROR_STATUSES.unauthorized;
          return reject(err);
        }
        const userId = payload.userId;
        resolve(userId);
      }
    )
  })
}

export default verifyRefreshToken