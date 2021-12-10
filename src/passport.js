import mongoose from 'mongoose';
import Users from './modules/users/models/UserModel.js';
import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
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