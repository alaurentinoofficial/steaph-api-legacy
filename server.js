"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var compression = require("compression");
var Routes_1 = require("./app/config/Routes");
var Database_1 = require("./app/config/Database");
var Passport_1 = require("./app/config/Passport");
var app = express();
app.set('crypt_key', 'fjhshj45rujkf3284ksjsfj23hlsd54');
app.set('port', process.env.PORT || 8080);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
Database_1.DbConfig({
    type: Database_1.Database.Mongo,
    ip: "127.0.0.1",
    port: "27017",
    database: "SE"
});
Passport_1.Passport(app);
Routes_1.Router(app);
// var solution = new SolutionSchema({name: "CESAR"});
// let user = new UserSchema({solution: solution, email: "cesar@exemple.com", password: "1234567890n"});
// user.save();
// let env1 = new EnvironmentSchema({solution: solution, name: "Labs"});
// env1.status = new EnvironmentStatusSchema({environment: env1,
//     status: true,
//     motion: true,
//     temperarue: 18,
//     noisy: 106,
//     gas: 0});
// env1.save();
// solution.environments.push(env1);
// solution.save();
exports.Server = app;
