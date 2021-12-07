import KEYS from './src/config/keys.js';
import mongoose from 'mongoose';
import Users from './src/modules/users/models/UserModel.js';
import { Strategy, ExtractJwt } from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: KEYS.jwt
}

const passportFindUser = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await Users.findById(payload.userId).select('email id');
        if (user) {
          done(null, user);
        }
        else {
          done(null, false);
        }
      } catch(error) {
        console.log(error);
      }
    })
  )
}

export default passportFindUser;