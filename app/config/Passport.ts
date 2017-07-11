import * as express from 'express';
import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { UserSchema, User } from "../models/User";

export const Passport = (app: express.Application) => {
    var opts: any = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = app.get('crypt_key');
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.use(new Strategy(opts, function(jwt_payload, done)
    {
        UserSchema.findOne({id: jwt_payload.id}, function(err, user) {
            done(null, err ? false : user);
        });
    }));
};