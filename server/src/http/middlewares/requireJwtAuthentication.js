import passport from "passport";
import config from "../../../config/index.js";

import { JwtStrategy, ExtractJwt } from "passport-jwt";

export default ({ users }) => {
  const findUser = async (username) => {
    const foundUser = await users.getUser(username);
    if (foundUser) return foundUser;
    return null;
  };

  const jwtStrategyOptions = {
    // JWT can be passed as header
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.user.jwtSecret,
  };

  passport.use(
    new JwtStrategy(jwtStrategyOptions, async (jwt_payload, done) => {
      try {
        const foundUser = await findUser(jwt_payload.sub);
        if (!foundUser) {
          return done(null, false);
        }
        return done(null, foundUser);
      } catch (err) {
        return done(err, false);
      }
    })
  );

  return passport.authenticate("jwt", { session: false });
};
