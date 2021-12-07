import jsonwebtoken from 'jsonwebtoken';
import KEYS from '../config/keys.js';

const verifyRefreshToken = (refreshToken) => {
  return new Promise ((resolve, reject) => {
    jsonwebtoken.verify(
      refreshToken,
      KEYS.refresh,
      (error, payload) => {
        if (error) {
          const err = new Error("Unauthorized");
          err.status = 403;
          return reject(err);
        }
        const userId = payload.userId;
        resolve(userId);
      }
    )
  })
}

export default verifyRefreshToken