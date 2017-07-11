"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var User_1 = require("../models/User");
exports.Passport = function (app) {
    var opts = {};
    opts.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeader();
    opts.secretOrKey = app.get('crypt_key');
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
        User_1.UserSchema.findOne({ id: jwt_payload.id }, function (err, user) {
            done(null, err ? false : user);
        });
    }));
};
